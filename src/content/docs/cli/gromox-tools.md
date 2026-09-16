---
title: Gromox CLI utilities
description: The low-level Gromox command-line tools that act directly on stores and mailboxes — gromox-mbop mailbox operations, store creation, check/repair, sizing, snapshots and import/export.
sidebar:
  label: Gromox CLI utilities
  order: 10
---

Where [`grommunio-admin`](/cli/grommunio-admin/) manages the *management* layer
(users, domains, configuration), the **`gromox-*`** utilities act directly on the
storage layer — the per-user **stores** (`exchange.sqlite3` plus the
attachment/content files). They live under `/usr/sbin` and
`/usr/libexec/gromox/` and are the right tools for maintenance, repair and
data-level migration.

:::caution
These tools operate on live mailbox data. Several are destructive. Take a
[snapshot](#gromox-snapshot) or backup before bulk or repair operations, and
prefer running them during quiet hours.
:::

## gromox-mbop

`gromox-mbop` ("mailbox operations") is the workhorse for per-mailbox actions.
It always selects a target mailbox first, then performs one or more actions:

```bash
gromox-mbop -u jdoe@example.com <action> [args...]
```

See the [`gromox-mbop(8)`](/man/gromox-mbop-8/) manual page for every action and
flag. The actions most relevant to administrators:

| Action | What it does |
| --- | --- |
| `emptyfld` | Empty one or more folders. `--soft` mimics a client delete; `-R` recurses into subfolders; `-t age` limits to items older than *age*. |
| `delmsg` | Delete specific messages from a folder (`-f folder`) by message ID. |
| `purge-softdelete` | Hard-delete soft-deleted ("recoverable") items. `-r` recurses; `-t timespec` limits by age. |
| `purge-datafiles` | Remove attachment/content files on disk no longer referenced by any message. |
| `vacuum` | Compact the store's SQLite database (`VACUUM`). |
| `recalc-sizes` | Recompute the store's reported size. |
| `ping` | Open the mailbox on the server — a quick "is the store healthy?" check. |
| `unload` | Drop the store from the server's in-memory cache. |
| `set-locale` | Set the mailbox locale (drives the translated names of built-in folders). |
| `get-photo` / `set-photo` / `clear-photo` | Read, set or remove the user's contact picture. |
| `get-websettings` / `set-websettings` | Read or write the per-user grommunio Web settings (JSON). |
| `sync-midb` | Rebuild the midb index used by the IMAP/POP front-ends. |
| `clear-rwz` | Remove the cached Outlook rules organizer (`IPM.RuleOrganizer`) messages. |
| `clear-profile` | Clear the cached PHP-MAPI profile for the store. |
| `cgkreset` | Reset change numbers/keys on all objects — a recovery step for sync corruption. |

### Folder specifications

Folders are addressed either by a **symbolic name** (resistant to language
settings) or by **path**:

```bash
gromox-mbop -u jdoe@example.com emptyfld --soft JUNK
gromox-mbop -u jdoe@example.com emptyfld "/Top of Information Store/Archive/2022"
```

Recognized symbolic names include `INBOX`, `SENT`, `DRAFT`, `OUTBOX`, `JUNK`,
`DELETED` (a.k.a. `TRASH`/`WASTEBASKET`), `CALENDAR`, `CONTACTS`, `TASKS`,
`NOTES`, `JOURNAL` and `IPM_SUBTREE`. The slash is always a hierarchy separator
(symbolic names work on private stores only).

### Command chaining

Multiple actions can be chained for one mailbox by wrapping each in parentheses:

```bash
gromox-mbop -u jdoe@example.com ( purge-softdelete -r / ) ( purge-datafiles )
```

### Run an action across every mailbox

The `foreach.*` pseudo-command repeats an action over many mailboxes — perfect
for fleet-wide maintenance:

```bash
# Every mailbox hosted on this server
gromox-mbop foreach.mb.here purge-softdelete -r -t 30d /
```

## Store creation

Stores are normally provisioned for you by `grommunio-admin user create`. The
underlying primitives are available directly when needed:

| Tool | Purpose |
| --- | --- |
| [`gromox-mkprivate(8)`](/man/gromox-mkprivate-8/) | Create a blank **private** (per-user) store. |
| [`gromox-mkpublic(8)`](/man/gromox-mkpublic-8/) | Create a blank **public** (per-domain) store. |

## Maintenance & inspection

### gromox-mbck

Check a mailbox for structural inconsistencies and, with care, repair them.

```bash
gromox-mbck jdoe@example.com
```

See [`gromox-mbck(8)`](/man/gromox-mbck-8/). Run on a quiesced mailbox and take a
snapshot first.

### gromox-mbsize

Report a mailbox's size and what is consuming it — handy for quota
investigations.

```bash
gromox-mbsize jdoe@example.com
```

See [`gromox-mbsize(8)`](/man/gromox-mbsize-8/).

### gromox-dbop

User-database maintenance for the management database (schema upgrades and
related operations). See [`gromox-dbop(8)`](/man/gromox-dbop-8/).

### gromox-mailq

List the local delivery agent's queue — useful when mail appears stuck.

```bash
gromox-mailq
```

See [`gromox-mailq(8)`](/man/gromox-mailq-8/).

## gromox-snapshot

Create a space-efficient, point-in-time snapshot of the mailbox storage on a
copy-on-write filesystem (e.g. Btrfs):

```bash
/usr/libexec/gromox/gromox-snapshot
```

Schedule it from a systemd timer for low-overhead, regular backups. See
[`gromox-snapshot(8)`](/man/gromox-snapshot-8/).

## Import & export

For migrations and data recovery, Gromox can move messages between mailboxes and
on-disk formats. The conversion tools form a small pipeline — for example
[`gromox-eml2mbox(8)`](/man/gromox-eml2mbox-8/) and
[`gromox-mbox2mt(8)`](/man/gromox-mbox2mt-8/) bridge RFC 5322 / mbox data and the
internal "mail transfer" format that loads into a store. The
[Mailbox transfer format](/dev/gromox/mtformat/) page describes the format in
detail; browse the full set on the [Man Pages](/man/) index.
