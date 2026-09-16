---
title: Common administration tasks
description: Practical, copy-and-paste command-line recipes for everyday grommunio administration — onboarding users, LDAP/AD synchronization, mailbox maintenance, fetchmail, backups and diagnostics.
sidebar:
  label: Common tasks
  order: 5
---

A practical cookbook for the jobs administrators run most often. Every command
is run on the grommunio server as `root` (or with `sudo`). Identify a user by
e-mail address (`jdoe@example.com`); append `--help` to any `grommunio-admin`
command to see all its options.

:::note
These recipes pair the high-level [`grommunio-admin`](/cli/grommunio-admin/)
management CLI with the low-level [`gromox-*`](/cli/gromox-tools/) mailbox tools.
For the full option set of any command, follow the links to its reference page.
:::

## Users & passwords

### Create a user and set a password

```bash
# Create the mailbox (a maildir/store is provisioned automatically)
grommunio-admin user create jdoe@example.com

# Set an initial password (you'll be prompted), or generate a strong one:
grommunio-admin passwd jdoe@example.com
grommunio-admin passwd -a -l 16 jdoe@example.com     # auto-generate, 16 chars
```

The domain (`example.com`) must already exist — see
[Create a domain](#create-a-domain) below.

### Inspect, list and search users

```bash
grommunio-admin user show jdoe@example.com           # full detail for one user
grommunio-admin user list                            # all users
grommunio-admin user list -f status=0 jdoe@*         # filter + wildcard
```

### Modify a user

```bash
# Add an alias address
grommunio-admin user modify jdoe@example.com --alias john.doe@example.com

# Change the interface language
grommunio-admin user modify jdoe@example.com --lang en_US

# Toggle a feature (e.g. disable ActiveSync for this user)
grommunio-admin user modify jdoe@example.com --privEas 0
```

`grommunio-admin user modify --help` lists every field, including the per-user
feature switches (`--privChat`, `--privVideo`, `--privFiles`, `--privDav`,
`--privEas`, …), aliases and stored properties.

### Grant archive access

Access to grommunio Archive requires the archive privilege *and* the POP3/IMAP
privilege, because the archive authenticates and restores over IMAP:

```bash
grommunio-admin user modify jdoe@example.com --pop3-imap true --privArchive true
```

See the [Archive guide](/guides/archive/) for the server-side setup.

### Manage mobile devices

```bash
grommunio-admin user devices jdoe@example.com list           # paired EAS devices
grommunio-admin user devices jdoe@example.com resync DEVICE  # force a resync
grommunio-admin user devices jdoe@example.com wipe --mode account DEVICE  # remove the account's data from the device
grommunio-admin user devices jdoe@example.com wipe --mode normal DEVICE   # full device wipe (factory reset)
grommunio-admin user devices jdoe@example.com wipe --mode cancel DEVICE   # withdraw a pending wipe
```

:::caution
`wipe` without `--mode` performs a **full device wipe** as soon as the device next connects. Prefer `--mode account` unless the device is lost or stolen. The complete procedure, including sync policies, is in the [Mobile devices guide](/guides/mobile-devices/).
:::

### Delegation and send-as

```bash
grommunio-admin user delegate jdoe@example.com add assistant@example.com
grommunio-admin user sendas   jdoe@example.com add shared@example.com
grommunio-admin user delegate jdoe@example.com list
```

### Delete a user

:::caution[Destructive]
Deleting a user removes the mailbox. Add `-k` to keep the underlying files on
disk if you may need to recover them.
:::

```bash
grommunio-admin user delete -y jdoe@example.com      # -y skips the confirmation
```

## Domains & organizations

### Create a domain

```bash
# -u sets the maximum number of users for the domain
grommunio-admin domain create -u 100 example.com
```

### List, modify and remove domains

```bash
grommunio-admin domain list
grommunio-admin domain modify example.com            # see --help for fields
grommunio-admin domain delete example.com            # soft-delete (recoverable)
grommunio-admin domain purge --files example.com     # permanent + remove files
```

:::caution[Destructive]
`domain purge --files` permanently deletes the domain **and** all of its
mailboxes' data. There is no undo.
:::

## LDAP / Active Directory

Connect grommunio to an external directory, then import and keep users in sync.

```bash
grommunio-admin ldap configure        # interactive: server, bind, search base
grommunio-admin ldap check            # verify connectivity and the configuration
grommunio-admin ldap search jdoe      # find matching directory objects
grommunio-admin ldap dump jdoe@example.com   # show the raw LDAP object
```

Import users (a "down-sync" from the directory into grommunio):

```bash
grommunio-admin ldap downsync jdoe@example.com   # one user
grommunio-admin ldap downsync -c                 # complete sync of all mapped users
```

:::tip[Automate it]
Run a periodic `grommunio-admin ldap downsync -c` from a systemd timer or cron
job to keep grommunio aligned with the directory. `grommunio-admin ldap check -r`
reports (and, with `-y`, removes) users whose directory object has disappeared.
:::

## Fetchmail — pull mail from a remote mailbox

Useful during migrations to collect mail from a user's old provider:

```bash
grommunio-admin fetchmail create \
  --srcServer mail.old-provider.example \
  --srcUser   old-account \
  --srcPassword 'secret' \
  jdoe@example.com

grommunio-admin fetchmail list jdoe@example.com
```

## Mailbox maintenance

These tasks use [`gromox-mbop`](/cli/gromox-tools/#gromox-mbop) ("mailbox
operations"), which always targets a mailbox with `-u`. Folders can be given by
**symbolic name** (`INBOX`, `SENT`, `DRAFT`, `JUNK`, `DELETED`, …) or by path
(`/Top of Information Store/…`).

### Empty a folder

```bash
# Empty the Junk folder (soft-delete, like a client would)
gromox-mbop -u jdoe@example.com emptyfld --soft JUNK

# Empty Deleted Items recursively, including subfolders (-R), hard delete
gromox-mbop -u jdoe@example.com emptyfld -R DELETED
```

### Delete specific messages

```bash
gromox-mbop -u jdoe@example.com delmsg -f INBOX 0x1234 0x1235
```

### Reclaim disk space

Soft-deleted ("recoverable") items still occupy space until purged. A typical
clean-up, then a compaction, frees the most:

```bash
# Hard-delete items soft-deleted more than 30 days ago, across the whole store
gromox-mbop -u jdoe@example.com purge-softdelete -r -t 30d /

# Drop attachment/content files no longer referenced by any message
gromox-mbop -u jdoe@example.com purge-datafiles

# Compact the SQLite store
gromox-mbop -u jdoe@example.com vacuum
```

### Recompute the reported store size

```bash
gromox-mbop -u jdoe@example.com recalc-sizes
```

### Run an action across every mailbox

The `foreach.*` pseudo-command applies an action to many mailboxes at once —
ideal for fleet-wide maintenance:

```bash
# Purge old soft-deleted items in every mailbox hosted on this server
gromox-mbop foreach.mb.here purge-softdelete -r -t 30d /
```

## Backups & snapshots

grommunio appliances take periodic, space-efficient snapshots of the mailbox
storage (on a copy-on-write filesystem such as Btrfs):

```bash
/usr/libexec/gromox/gromox-snapshot       # create a snapshot now
```

The shipped `gromox-snapshot.timer` runs it hourly once enabled
(`systemctl enable --now gromox-snapshot.timer`); see
[`gromox-snapshot`](/man/gromox-snapshot-8/) for retention details.

Export a single mailbox in the Gromox mailbox transfer format and import it
into another (or an emptied) mailbox:

```bash
gromox-exm2mt -u alice@example.com -ars / > alice.mt   # -s: splice into the target's own folders
gromox-mt2exm -u restore-alice@example.com < alice.mt
systemctl restart gromox-http gromox-midb gromox-zcore
```

Full procedures — checksummed backup sets, disaster recovery onto a fresh
appliance, single-mailbox restores — are in the
[Backup and restore guide](/guides/backup-restore/).

## Diagnostics & troubleshooting

```bash
# Open (touch) a mailbox to confirm the store responds
gromox-mbop -u jdoe@example.com ping

# Check a mailbox for inconsistencies (and repair with care)
gromox-mbck jdoe@example.com

# Report a mailbox's size breakdown
gromox-mbsize jdoe@example.com

# Inspect the local delivery queue
gromox-mailq

# Drop into an interactive admin shell (REST API context)
grommunio-admin shell
```

:::tip[Keep going]
This is a starting set — see the full [`grommunio-admin`](/cli/grommunio-admin/)
reference for every management area, and [Gromox CLI utilities](/cli/gromox-tools/)
for the complete list of low-level tools.
:::
