---
title: "IMAP migration with imapsync"
description: "Move mailboxes from any IMAP server into grommunio with imapsync: plan, prepare users, run initial and delta syncs, validate, and cut over."
sidebar:
  order: 35
---

Any mail system that exposes IMAP can be migrated to grommunio with *imapsync*, an open-source IMAP-to-IMAP synchronisation tool. imapsync reads a mailbox from the source server and appends every message to the same user's mailbox on the Gromox IMAP server ([imap(8gx)](/man/imap-8gx/)), preserving the folder hierarchy, message flags and internal dates. Because it recognises messages it has already copied, runs are repeatable: a full first pass can happen days before the cutover, followed by short delta passes.

This page describes the generic procedure: planning, preparing the grommunio target, a pilot sync, delta sync, bulk runs and the cutover. At the end you have a repeatable command set, a per-mailbox log trail and a checklist for acceptance. Provider-specific details about the *source* (folder prefixes, admin authentication, rate limits) are covered by the upstream documentation at <https://imapsync.lamiral.info/>.

## What IMAP migration moves, and what it does not

IMAP only carries mail. Everything else in a groupware mailbox needs another path.

| Data | imapsync | Where to look instead |
| --- | --- | --- |
| Messages, including attachments, HTML and plain-text bodies, UTF-8 subjects | Yes | |
| Folder hierarchy, including nested and custom folders | Yes | |
| Standard IMAP flags (`\Seen`, `\Answered`, `\Flagged`, `\Draft`, `\Deleted`) | Yes | Custom keywords depend on both servers |
| Internal date (arrival date) of each message | Yes (`--syncinternaldates`, on by default) | |
| Folder subscriptions | Yes (`--subscribe`, on by default) | |
| Calendars, contacts, tasks, notes | No | PST export and import, see [Microsoft Exchange](/migration/ms_exchange/); `gromox-ical2mt` and `gromox-vcf2mt` with [gromox-mt2exm](/man/gromox-mt2exm-8/), see [Generic Migration](/migration/generic/) |
| Server-side rules (Sieve), out-of-office, signatures and identities | No | Users recreate them in grommunio Web, see [Message rules](/kb/message_rules/) |
| Delegations, shared-mailbox permissions, folder ACLs | No | Admin UI *Users → Permission*, or `grommunio-admin user delegate` and `sendas`, see [grommunio-admin user](/cli/grommunio-admin/user/) |
| Public folders, address lists, distribution lists | No | [Administration](/admin/administration/) |
| Passwords | No | Set new passwords, or attach users to LDAP so directory passwords keep working |
| Mobile device partnerships | No | Devices re-enrol after the cutover, see [Mobile devices](/web/mdm/) |
| Mail routing (MX, SPF, autodiscover) | No | Handled separately in the [cutover](#9-cut-over) |

## How it fits together

imapsync runs on the grommunio Appliance itself (recommended, the package is in the grommunio repository) or on a separate migration host. It opens one IMAP session to the source (*host1*) and one to grommunio (*host2*), lists the source folders, creates the missing folders on the target and appends the messages one by one. On the grommunio side, `gromox-imap` accepts the `APPEND` commands, [midb(8gx)](/man/midb-8gx/) assigns IMAP UIDs and keeps the folder summaries, and the messages land in the user's regular store. They are immediately visible in grommunio Web, Outlook, ActiveSync clients and any other IMAP client, because all protocols share the same store.

| Component | Role in the migration | Notes |
| --- | --- | --- |
| Source IMAP server (host1) | Delivers the messages | Implicit TLS on 993 (`--ssl1`) or STARTTLS on 143 (`--tls1`); may offer master-user or admin authentication |
| `imapsync` | Copies folders, messages and flags; skips what is already present | Package `imapsync` from the grommunio repository; logs to `LOG_imapsync/` by default |
| `gromox-imap.service` ([imap(8gx)](/man/imap-8gx/)) | Target IMAP server (host2) | Listens on `[::]:143` (`imap_listen`) and `[::]:993` (`imap_listen_tls`); enforces the per-user POP3/IMAP privilege and login blocking |
| `gromox-midb.service` ([midb(8gx)](/man/midb-8gx/)) | Maintains IMAP UIDs, UIDNEXT and folder summaries | Must be running; IMAP `APPEND` fails without it |
| [authmgr(4gx)](/man/authmgr-4gx/) | Selects the password backend for IMAP logins | MySQL for local users, LDAP for directory users; `allow_all` exists for mass imports |
| `grommunio-admin` | Creates domains and mailboxes, sets privileges and passwords | [domain](/cli/grommunio-admin/domain/), [user](/cli/grommunio-admin/user/), [passwd](/cli/grommunio-admin/passwd/) |

### Folder names on the grommunio side

A new grommunio mailbox already contains the standard MAPI folders. Their IMAP names follow the user's store language; with an English store they are:

| Typical source folder | grommunio folder (English store) |
| --- | --- |
| `INBOX` | `INBOX` |
| `Sent`, `Sent Messages` | `Sent Items` |
| `Drafts` | `Drafts` |
| `Trash`, `Deleted Messages` | `Deleted Items` |
| `Junk`, `Spam` | `Junk Email` |
| `Archive` | `Archive` |
| Any other folder, including nested ones | Created with the same name and hierarchy |

imapsync's `--automap` option performs this mapping for the well-known folders. If the store language is not English, the target names are localised (see `--lang` in [grommunio-admin user](/cli/grommunio-admin/user/)); always confirm the mapping with a dry run before the first real sync.

## Prerequisites

- A running grommunio installation with TLS on the IMAP service (the Appliance opens 143 and 993 by default, see the [firewall list](/admin/quickstart/#firewall)).
- Network reachability from the host running imapsync to the source server on 993 (or 143), and to grommunio on 993.
- A complete inventory of the mailboxes to migrate, with the target address for each.
- A decision on how imapsync authenticates against both sides (see [Plan the migration](#1-plan-the-migration)).
- Root shell access on the grommunio server.
- A current backup of the grommunio system before you start bulk imports, see [Backup and disaster recovery](/admin/operations/#backup--disaster-recovery).

## 1. Plan the migration

### Inventory

Export the list of source mailboxes with the current message counts and sizes from the source system's administration tooling. Keep it as a semicolon-separated file, one mailbox per line, in the form `source_user;target_user`. Sizes drive the schedule: a first full pass moves everything, so it can take hours per large mailbox, while delta passes take minutes.

### Credentials

imapsync needs a login on both sides for every mailbox. Choose one of these strategies and stick to it for the whole project:

- **Per-user passwords.** You know (or reset) each user's password on the source and set a new password on grommunio. Simple and works with any server; requires handling many secrets. Store them in password files (`--passfile1`, `--passfile2`), never on the command line.
- **Admin or master user on the source.** Many IMAP servers allow an administrative account to log in as any user, so you do not need the users' passwords. Dovecot uses the form `alice@example.com*master` as `--user1` together with the master password; Exchange, Cyrus, Zimbra and others use `--authuser1` and possibly `--authmech1 PLAIN`. See the upstream FAQ *Admin authentication* and the server-specific FAQ files at <https://imapsync.lamiral.info/>.
- **Directory-backed grommunio users.** If grommunio users are imported from LDAP or Active Directory, their directory passwords already work for IMAP logins and nothing needs to be reset on the target.
- **`allow_all` on the target.** Gromox can accept any password for existing users during the import; this is documented in [authmgr(4gx)](/man/authmgr-4gx/) specifically for imapsync mass imports and is described in [step 2](#24-optional-accept-any-password-on-imap-during-the-migration-window). It must never stay enabled.

### Transport security

Use implicit TLS wherever possible: `--ssl1 --port1 993` for the source and `--ssl2 --port2 993` for grommunio. If a side only offers STARTTLS, use `--tls1` or `--tls2` on port 143. To have imapsync verify the source certificate, pass `--sslargs1 SSL_verify_mode=1`. Gromox offers TLS 1.2 or newer by default (`tls_min_proto` in [imap(8gx)](/man/imap-8gx/)).

### Throttling and limits

- Source providers often rate-limit IMAP. `--maxbytespersecond` and `--maxmessagespersecond` cap the transfer rate; run mailboxes sequentially or only a few in parallel.
- imapsync stops a mailbox after 50 errors by default (`--errorsmax`); connection timeouts default to 120 seconds (`--timeout1`, `--timeout2`).
- grommunio recommends keeping single objects below 150 MB (see [Size limits](/admin/operations/#size-limits)). Use `--maxsize` to skip larger messages and handle them separately.
- Set the target users' storage quota above the source mailbox size before syncing; otherwise `APPEND` fails once the quota is reached.

## 2. Prepare the grommunio target

imapsync creates folders and messages, nothing else. Domain, users, privileges, passwords and quotas must exist before the first run.

### 2.1 Create the domain

```bash
grommunio-admin domain create -u 100 example.com
```

`-u` sets the maximum number of users in the domain. Repeat for every domain in the inventory.

### 2.2 Create the mailboxes with the IMAP privilege

Every target user needs the POP3/IMAP privilege, otherwise the login is rejected regardless of the password. Create users with the flag set:

```bash
grommunio-admin user create --pop3-imap 1 --lang en_US alice@example.com
grommunio-admin passwd alice@example.com
```

`--lang` selects the store language and therefore the localised names of the standard folders. `grommunio-admin passwd` prompts for the new password; for scripted runs, generate the password yourself, write it to the password file imapsync will use, and pass it with `-p`:

```bash
umask 077
mkdir -p /root/imapsync/secrets /root/imapsync/logs
openssl rand -base64 18 > /root/imapsync/secrets/alice@example.com.target.pass
grommunio-admin passwd -p "$(cat /root/imapsync/secrets/alice@example.com.target.pass)" alice@example.com
```

For users that already exist, enable the privilege afterwards and verify it:

```bash
grommunio-admin user modify --pop3-imap 1 bob@example.com
grommunio-admin user query username pop3_imap
```

In the Admin UI the same switch is *Users → (user) → Account → Allow POP3/IMAP logins*. Users imported from LDAP are created through the LDAP import instead (see [Administration](/admin/administration/)); the IMAP privilege still has to be granted.

### 2.3 Set the quota

Set *Storage quota limit* (and, if used, the receive and send quotas) for each user in the Admin UI under *Users → (user) → Account*, or through user templates before mass creation. The storage quota must be larger than the source mailbox plus expected growth, and always larger than the receive and send quotas (see [Administration](/admin/administration/)).

### 2.4 Optional: accept any password on IMAP during the migration window

:::danger[Disables password checks for IMAP]
With `allow_all`, `gromox-imap` accepts any password for every existing user. Only use it when ports 143 and 993 are firewalled so that only the migration host can reach them, only for the duration of the import, and remove the setting immediately afterwards. Do not combine it with a publicly reachable IMAP service.
:::

If you cannot obtain the users' source passwords and still want to avoid resetting them on grommunio, [authmgr(4gx)](/man/authmgr-4gx/) offers `auth_backend_selection=allow_all`. Because `imap(8gx)` searches `/etc/gromox/imap` before `/etc/gromox` for component configuration (`config_file_path`), you can scope the override to the IMAP daemon only:

```ini title="/etc/gromox/imap/authmgr.cfg"
auth_backend_selection=allow_all
```

```bash
mkdir -p /etc/gromox/imap
systemctl restart gromox-imap
```

The directory does not exist by default. The override is only honoured if `/etc/gromox/gromox.cfg` does not itself set `auth_backend_selection`; check that first. Users still need the POP3/IMAP privilege, and imapsync still needs a non-empty `--passfile2`. After the migration, delete the file and restart `gromox-imap` again.

## 3. Install and check imapsync

On the grommunio Appliance, imapsync is packaged in the grommunio repository:

```bash
zypper install imapsync
rpm -q imapsync grommunio-imapsync
imapsync --version
```

The `imapsync` package contains the tool itself; `grommunio-imapsync` is a small compatibility package that only provides symlinks and pulls in `imapsync`. Either query result showing `imapsync` installed is sufficient. On a migration host without access to the grommunio repository, install imapsync according to the upstream instructions at <https://imapsync.lamiral.info/>.

imapsync contacts the upstream site on every run to check for new releases. Add `--noreleasecheck` on systems without internet access or to keep runs deterministic.

Prepare a working directory with restricted permissions for password files and logs, one password file per account and side, each containing the password on its first line:

```bash
umask 077
mkdir -p /root/imapsync/secrets /root/imapsync/logs
printf '%s\n' '<source-password>' > /root/imapsync/secrets/alice@example.com.source.pass
chmod 600 /root/imapsync/secrets/*.pass
```

## 4. Take a source baseline

Before moving anything, confirm connectivity and record what the source contains. All three commands are read-only.

Check that both servers answer and print their capabilities:

```bash
imapsync --host1 imap.source.example.com --port1 993 --ssl1 \
  --host2 mail.example.com --port2 993 --ssl2 \
  --justconnect
```

Check both logins:

```bash
imapsync --host1 imap.source.example.com --port1 993 --ssl1 \
  --user1 alice@example.com --passfile1 /root/imapsync/secrets/alice@example.com.source.pass \
  --host2 mail.example.com --port2 993 --ssl2 \
  --user2 alice@example.com --passfile2 /root/imapsync/secrets/alice@example.com.target.pass \
  --justlogin
```

List the source folders with their message counts and the target folder each of them would be mapped to, without transferring anything:

```bash
imapsync --host1 imap.source.example.com --port1 993 --ssl1 \
  --user1 alice@example.com --passfile1 /root/imapsync/secrets/alice@example.com.source.pass \
  --host2 mail.example.com --port2 993 --ssl2 \
  --user2 alice@example.com --passfile2 /root/imapsync/secrets/alice@example.com.target.pass \
  --automap --justfolders --dry
```

Expected result: the host1 folder list with message counts and sizes per folder, the host2 folder list (for a new English-language mailbox: `INBOX`, `Drafts`, `Sent Items`, `Deleted Items`, `Junk Email`, all with 0 messages), and the planned mapping, for example `Sent -> Sent Items`, `Trash -> Deleted Items`, `Junk -> Junk Email`. Record the per-folder counts and the total; this is the acceptance baseline for the pilot mailbox. If the source uses a namespace prefix such as `INBOX.` or `INBOX/` in front of every folder, plan to strip it with `--prefix1`.

## 5. Run the initial sync for a pilot mailbox

Pick one representative mailbox (nested folders, unread and flagged messages, drafts, attachments, non-ASCII subjects) and run the full sync with the recommended option set:

```bash
imapsync \
  --host1 imap.source.example.com --port1 993 --ssl1 \
  --user1 alice@example.com --passfile1 /root/imapsync/secrets/alice@example.com.source.pass \
  --host2 mail.example.com --port2 993 --ssl2 \
  --user2 alice@example.com --passfile2 /root/imapsync/secrets/alice@example.com.target.pass \
  --automap --subscribe \
  --skipcrossduplicates \
  --useheader Message-Id --addheader \
  --logdir /root/imapsync/logs \
  --noreleasecheck
```

| Option | What it does | Why it is in the set |
| --- | --- | --- |
| `--ssl1`, `--ssl2` | Implicit TLS (IMAPS) on both sides, default port 993 | Encrypts credentials and mail in transit |
| `--passfile1`, `--passfile2` | Reads the password from the first line of a file | Keeps passwords out of the process list and shell history |
| `--automap` | Guesses the mapping of well-known folders (Sent, Junk, Drafts, Trash, Archive, All, Flagged) onto the target's equivalents | Puts sent mail into `Sent Items` instead of creating a second `Sent` folder |
| `--subscribe` | Subscribes on host2 the folders that are subscribed on host1 (on by default) | Folders appear immediately in IMAP clients |
| `--skipcrossduplicates` | Does not copy a message again if it was already copied into another folder | Avoids duplicates from label-style sources such as Gmail (`All Mail`) |
| `--useheader Message-Id` | Uses only the `Message-Id` header to decide whether a message already exists on host2 (default: `Message-Id` and `Received`) | Re-runs stay idempotent even if `Received` lines differ between the sides |
| `--addheader` | Adds a synthetic `Message-Id` to messages that lack one | Otherwise such messages (typically drafts) would be copied again on every run |
| `--syncinternaldates` | Keeps the original internal date on host2 (on by default, no need to pass it) | Messages sort by their real date; `--idatefromheader` uses the `Date:` header instead if the source dates are wrong |
| `--logdir` | Directory for the per-run log file (default `LOG_imapsync/` in the current directory) | Keeps evidence per mailbox and run |
| `--noreleasecheck` | Skips the version check against the upstream site | Works offline |

Optional additions, depending on the source:

| Option | Use when |
| --- | --- |
| `--exclude REGEX` | You want to leave folders behind, for example spam and trash: `--exclude '^Junk$\|^Trash$'` (a Perl regular expression on the host1 folder names) |
| `--f1f2 'Sent=Sent Items'` | `--automap` guesses a mapping wrong; `--f1f2` forces one folder mapping and overrides `--automap` and `--regextrans2` |
| `--prefix1 'INBOX.'` | The source prefixes every folder with `INBOX.` or `INBOX/` and you do not want that level on grommunio |
| `--nofoldersizes` | Large mailboxes: skips the size calculation at the start; omit it for the pilot so the summary shows the counts |
| `--maxbytespersecond`, `--maxmessagespersecond` | The source throttles or you need to limit load |
| `--maxsize BYTES` | Skip oversized messages (see [Size limits](/admin/operations/#size-limits)) |
| `--dry` | Preview any of the above without changing anything |

Expected result: imapsync ends with a summary block. For a first run, `Messages transferred` equals the baseline total, `Messages skipped` is 0, `Detected errors` is 0 and the last line reports `Exiting with return value 0 (EX_OK)`. The log shows the folder mapping lines, for example `Sent -> Sent Items`.

:::tip
Test folder mapping changes (`--f1f2`, `--regextrans2`, `--prefix1`, `--exclude`) with `--dry --justfolders` first. The combination lists what would happen to every folder without touching messages.
:::

## 6. Delta sync and idempotency

imapsync is designed to be re-run. Each run compares both sides message by message using the identification headers and transfers only what is missing on host2; already transferred messages are counted as skipped. Flags of already transferred messages are re-synchronised on every run (`--resyncflags`, on by default), so a message read or flagged on the source after the first pass is updated on grommunio as well. New folders are created, and folders deleted on the source are left untouched on grommunio unless you ask for it.

Run exactly the same command as in step 5 again after new mail has arrived on the source. Expected result: `Messages transferred` equals the number of new messages, `Messages skipped` equals the previous total, `Detected errors` is 0, and new folders (for example `Projects/2025`) appear on grommunio with the same hierarchy.

### Mirror semantics: `--delete2` and friends

By default imapsync only adds. Three options make host2 mirror host1 and are destructive on the grommunio side:

- `--delete2` deletes messages on host2 that do not exist on host1 (and expunges them).
- `--delete2folders` deletes folders on host2 that do not exist on host1.
- `--delete2duplicates` deletes messages on host2 that are duplicates on host2.

:::caution
Never use `--delete2` or `--delete2folders` once mail is delivered to grommunio directly or users have started to work in grommunio Web or Outlook. Everything that only exists on grommunio, including newly received mail, would be deleted. If you need mirror semantics to clean up a failed pilot, run with `--dry` first and only before the cutover.
:::

### Delta runs after users have moved

For the final delta after the DNS switch (see [step 9](#9-cut-over)), add `--noresyncflags`. Users are by then reading mail in grommunio, and a flag resync from the frozen source would revert their read state.

## 7. Validate in grommunio Web

Log in to grommunio Web as the pilot user and compare with the baseline from step 4:

- The folder tree matches: standard folders are filled (not duplicated as `Sent` next to `Sent Items`), custom and nested folders exist at the right level.
- Message counts per folder match the baseline, and after a delta run they match the source again.
- Unread and flagged states are preserved; drafts are in `Drafts` and editable.
- Dates shown are the original dates, not the time of the migration.
- A message with attachments opens and the attachments download; HTML mail renders; non-ASCII subjects are intact.

Because all clients share the store, a check in Outlook or on a mobile device shows the same result. On the command line, `gromox-mbsize alice@example.com` reports the size breakdown of the store for a plausibility check against the source size (see [Diagnostics](/cli/cookbook/#diagnostics--troubleshooting)).

## 8. Resume, bulk runs and a negative test

### Resume after an interruption

imapsync can be stopped at any time (Ctrl+C, a lost connection, a reboot). Restart the same command; the run continues where the previous one stopped, because everything already on host2 is recognised and skipped. Expected result after a deliberate interruption and rerun: the second run reports the remaining messages as transferred, the earlier ones as skipped, no errors, and the final target count equals the source count. Add `--pidfile /run/imapsync-alice.pid --pidfilelocking` if there is any chance that two runs for the same mailbox overlap; the second run then aborts instead of racing the first.

### Bulk runs from a CSV file

Once the pilot passes, drive all mailboxes from the inventory file. The loop below expects `/root/imapsync/mailboxes.csv` with `source_user;target_user` per line (lines starting with `#` are skipped) and one password file per account and side under `/root/imapsync/secrets/`. Failed mailboxes are collected with their exit code so that only those need a rerun.

```bash title="/root/imapsync/sync-all.sh"
#!/bin/bash
SRC_HOST=imap.source.example.com
DST_HOST=mail.example.com
BASE=/root/imapsync
FAILED="$BASE/failed.csv"
: > "$FAILED"

grep -Ev '^#|^ *$' "$BASE/mailboxes.csv" | while IFS=';' read -r src dst; do
  echo "=== $src -> $dst ==="
  imapsync \
    --host1 "$SRC_HOST" --port1 993 --ssl1 \
    --user1 "$src" --passfile1 "$BASE/secrets/$src.source.pass" \
    --host2 "$DST_HOST" --port2 993 --ssl2 \
    --user2 "$dst" --passfile2 "$BASE/secrets/$dst.target.pass" \
    --automap --subscribe --skipcrossduplicates \
    --useheader Message-Id --addheader \
    --nofoldersizes --noreleasecheck \
    --logdir "$BASE/logs" \
    --pidfile "/run/imapsync-$dst.pid" --pidfilelocking \
    < /dev/null
  rc=$?
  if [ "$rc" -ne 0 ]; then
    echo "$src;$dst;$rc" >> "$FAILED"
  fi
done
```

```bash
chmod 700 /root/imapsync/sync-all.sh
/root/imapsync/sync-all.sh
cat /root/imapsync/failed.csv
```

The same script performs the delta passes: rerunning it transfers only new messages. To retry failures only, copy `failed.csv` (without the third column) over `mailboxes.csv`. If you use a master user on the source, replace `--user1 "$src"` with the form your server expects (for Dovecot: `--user1 "$src*master"` with the master password in a single shared `--passfile1`). If you run several instances in parallel, keep the count low; the source is usually the bottleneck, and gromox-imap allows 200 concurrent sessions by default (`context_num` in [imap(8gx)](/man/imap-8gx/)).

imapsync ships its own reference loop, `examples/sync_loop_unix.sh`, which reads `host1;user1;password1;host2;user2;password2;extra;;` from `file.txt`. It works, but places passwords in a plain-text CSV and on the command line; the variant above keeps them in password files.

### Negative test: a wrong password must fail cleanly

Before the bulk run, put a wrong password into one source password file and start the sync for that mailbox. Expected result: the source rejects the login (for Dovecot, `NO [AUTHENTICATIONFAILED] Authentication failed`), imapsync transfers nothing and exits with code 161. A wrong grommunio password exits with 162. The loop above records both in `failed.csv`, so a credential problem never silently produces an empty mailbox.

| Exit code | Name | Meaning |
| --- | --- | --- |
| 0 | `EX_OK` | Run completed without errors |
| 64 | `EX_USAGE` | Command-line usage error |
| 10, 101, 102 | `EXIT_CONNECTION_FAILURE`, `_HOST1`, `_HOST2` | Could not connect to the respective server |
| 12 | `EXIT_TLS_FAILURE` | TLS negotiation failed |
| 16, 161, 162 | `EXIT_AUTHENTICATION_FAILURE`, `_USER1`, `_USER2` | Login rejected on the respective side |
| 111 | `EXIT_WITH_ERRORS` | Run finished, but some messages failed; check the log |
| 112 | `EXIT_WITH_ERRORS_MAX` | Aborted after `--errorsmax` errors (default 50) |
| 113 | `EXIT_OVERQUOTA` | Target mailbox over quota |
| 114 | `EXIT_ERR_APPEND` | The target refused an `APPEND` |
| 118 | `EXIT_TRANSFER_EXCEEDED` | Stopped by `--exitwhenover` |

Repeated failed logins against grommunio block the user for a while (`imap_auth_times`, default 10, and `block_interval_auths`, default 1 minute, in [imap(8gx)](/man/imap-8gx/); see also [user_filter(4gx)](/man/user_filter-4gx/)). Fix the password file before retrying.

## 9. Cut over

imapsync moves mailbox content; it does not move mail flow. Plan the switch of MX and client configuration as separate steps around the final sync.

1. **Days before:** lower the TTL of the MX record (and of the hostnames clients use) so that the later change propagates quickly. Complete the initial sync for all mailboxes with the bulk script and validate several pilots in grommunio Web. Fix mapping or quota problems now.
2. **Announce the freeze.** From the agreed time, users stop working on the source: disable their logins or make the source read-only, keeping only the account imapsync uses. Confirm that grommunio is ready to receive mail (inbound SMTP, spam filtering, autodiscover, see [Autodiscover](/kb/autodiscover/)).
3. **Run the delta pass** for all mailboxes. It should take minutes and transfer only what arrived since the last run.
4. **Switch the MX** (and SPF, DKIM and other DNS records) to grommunio. New mail now arrives in grommunio.
5. **Reconfigure the clients.** Outlook profiles pick up grommunio through autodiscover (see [Outlook](/kb/outlook/)), mobile devices re-enrol through ActiveSync (see [Mobile devices](/web/mdm/)), IMAP clients get the new server and password.
6. **Final delta after propagation.** While old MX records are still cached, some mail keeps arriving at the source. Keep the source running for at least the old TTL, then run the bulk script once more with `--noresyncflags` added, so that late arrivals are picked up without touching the read state users have meanwhile changed in grommunio. Never add `--delete2` at this stage.
7. **Decommission.** Keep the source read-only for the agreed retention period, then shut it down. Remove the `allow_all` override if you used it, delete the password files, archive the imapsync logs, and take a backup of grommunio (see [Backup and disaster recovery](/admin/operations/#backup--disaster-recovery)).

## Verification checklist

| Check | How | Expected result |
| --- | --- | --- |
| Tooling | `imapsync --version` on the appliance | Prints a version; `rpm -q imapsync` reports the package |
| Target users | `grommunio-admin user query username pop3_imap`; `grommunio-admin user login alice@example.com` | Every target user exists with the POP3/IMAP privilege and the password is accepted |
| Connectivity | `--justconnect`, `--justlogin` | Both servers answer over TLS; both logins succeed with exit code 0 |
| Baseline | `--automap --justfolders --dry` | Folder list with counts recorded; mapping of Sent, Trash and Junk onto `Sent Items`, `Deleted Items`, `Junk Email` (or their localised names) |
| Initial sync (pilot) | Full run from step 5 | Transferred equals baseline total, skipped 0, errors 0, exit 0 |
| Delta sync | Rerun after new mail and a flag change on the source | Only the new messages are transferred, the rest skipped; the flag change is visible on grommunio; no duplicates |
| Resume | Interrupt a run, rerun | Second run completes the mailbox; final count equals the source; no duplicates |
| Bulk | `sync-all.sh` | All mailboxes finish with exit 0; `failed.csv` is empty or lists only known problems |
| Negative test | Wrong source password | Exit 161, nothing transferred, entry in `failed.csv` |
| grommunio Web | Log in as a pilot user | Folders, counts, flags, dates, attachments and non-ASCII subjects match the source |
| Cutover | Send a test message to a migrated address after the MX switch | It arrives in grommunio; the final delta run transfers only late arrivals |

## Troubleshooting

| Symptom | Likely cause | What to check / fix |
| --- | --- | --- |
| Exit 162, grommunio rejects the login although the password is right | User lacks the POP3/IMAP privilege; or the user was blocked after too many failed attempts | `grommunio-admin user query username pop3_imap`; `grommunio-admin user modify --pop3-imap 1 USER`; wait for `block_interval_auths` to pass; `journalctl -u gromox-imap` |
| Exit 161, source rejects the login | Wrong password file content (must be on the first line, no extra characters), wrong user form for master-user login, or the source blocks the migration host | Re-create the password file with `printf '%s\n'`; test with `--justlogin`; check the source's auth log |
| Exit 10, 101 or 102 | Port closed, wrong `--ssl`/`--tls` choice, name resolution | `--justconnect`; try `--tls1 --port1 143` if the source has no IMAPS; check the firewall between the hosts |
| Exit 12, TLS failure | Certificate or protocol mismatch | `--debugssl 4`; check `tls_min_proto`, `imap_certificate_path` and `imap_private_key_path` on grommunio ([imap(8gx)](/man/imap-8gx/)); for the source, `--sslargs1` |
| A second `Sent`, `Trash` or `Junk` folder appears next to `Sent Items`, `Deleted Items`, `Junk Email` | `--automap` could not match the source folder name, or the store language is not English | Run `--justfolders --dry`; force the mapping with `--f1f2 'Sent=Sent Items'` (use the localised name if applicable); delete the empty extra folder in grommunio Web |
| Messages are duplicated after a rerun | Messages without `Message-Id`, or `Received` headers rewritten on one side | Use `--useheader Message-Id --addheader` on all runs; as a last resort `--useuid`; clean up with `--delete2duplicates --dry` first |
| Every folder lands under an extra `INBOX` level | Source namespace prefix | `--prefix1 'INBOX.'` (or `INBOX/`), verify with `--justfolders --dry` |
| `APPEND` fails with `NO server internal error`, the gromox-imap log mentions midb | `gromox-midb` not running or not reachable | `systemctl status gromox-midb`; `journalctl -u gromox-midb -u gromox-imap`; restart `gromox-midb` and `gromox-imap` |
| Exit 113, or `APPEND` fails once a mailbox is partly filled | Target storage quota too small | Raise *Storage quota limit* in the Admin UI; `gromox-mbop -u USER recalc-sizes` if the reported size looks wrong; rerun |
| Exit 114 on a few very large messages | Message exceeds what the target accepts | Check the message size in the log; skip with `--maxsize` and handle manually; see [Size limits](/admin/operations/#size-limits) |
| Exit 112 after many errors | A systematic problem (one folder, one header, throttling) | Read the log in `--logdir`; fix the cause rather than raising `--errorsmax` |
| Transfer is very slow or the source disconnects | Source rate limiting, or too many parallel runs | `--maxbytespersecond`, `--maxmessagespersecond`; fewer parallel mailboxes; `--nofoldersizes` to avoid the initial size scan |
| Migrated messages all show the migration date | Internal date sync switched off, or the source internal dates are broken | Keep `--syncinternaldates` (the default) enabled; use `--idatefromheader` to take the date from the `Date:` header instead |
| Users see their read state reset after the final delta | Flag resync from the frozen source | Run post-cutover deltas with `--noresyncflags` |

## Operating notes

- **Logs.** Each run writes one log file to `--logdir` (default `LOG_imapsync/` in the current directory) named `YYYY_MM_DD_HH_MM_SS_mmm_user1_user2.txt`. Passwords are masked. Keep the logs of the final runs as acceptance evidence; they contain the per-folder counts and the summary lines.
- **Secrets.** Delete the password files and the `sync-all.sh` copy when the migration is complete. If you used the `allow_all` override, remove `/etc/gromox/imap/authmgr.cfg` and restart `gromox-imap`; confirm with a wrong password that logins are rejected again.
- **Store housekeeping.** Migrated mail is stored like any other mail; no rebuild is needed. If the size shown in the Admin UI does not match after a large import, run `gromox-mbop -u USER recalc-sizes` (see [Mailbox maintenance](/cli/cookbook/#mailbox-maintenance)). Migrated `Deleted Items` and `Junk Email` content is subject to the same clean-up as any other, see [Periodic clearing of the Trash folder](/kb/mailbox_maint/).
- **Backups.** Take a backup after the final delta and before decommissioning the source, see [Operations](/admin/operations/#backup--disaster-recovery).
- **Updates.** `imapsync` is updated together with the rest of the appliance through `zypper`, see [Updating grommunio](/admin/operations/#updating-grommunio).

## Related pages

- [Migration overview](/migration/)
- [Generic Migration](/migration/generic/) (EML, iCalendar and vCard import with the gromox tools)
- [Microsoft Exchange](/migration/ms_exchange/) (PST import and bulk export)
- [Kopano](/migration/kopano/)
- [Common administration tasks](/cli/cookbook/)
- [grommunio-admin domain](/cli/grommunio-admin/domain/), [user](/cli/grommunio-admin/user/), [passwd](/cli/grommunio-admin/passwd/)
- [imap(8gx)](/man/imap-8gx/), [midb(8gx)](/man/midb-8gx/), [authmgr(4gx)](/man/authmgr-4gx/), [user_filter(4gx)](/man/user_filter-4gx/)
- [gromox-mbop(8)](/man/gromox-mbop-8/)
- [Administration](/admin/administration/), [Operations](/admin/operations/), [Quickstart](/admin/quickstart/)
- [Autodiscover](/kb/autodiscover/), [Outlook](/kb/outlook/), [Mobile devices](/web/mdm/)
- imapsync upstream documentation: <https://imapsync.lamiral.info/>
