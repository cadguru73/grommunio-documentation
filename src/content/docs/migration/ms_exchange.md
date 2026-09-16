---
title: "Microsoft Exchange"
description: "PFF (cf. summary from the Forensics Wiki) is a format exportable from Outlook and Exchange. Outlook makes use of this format for different scenarios, an…"
sidebar:
  order: 20
---

PFF (cf. [summary from the Forensics Wiki](https://forensics.wiki/personal_folder_file_%28pab%2C_pst%2C_ost%29/)) is a format exportable from Outlook and Exchange. Outlook makes use of this format for different scenarios, and calls them different names (*.pst*, *.ost*), but it is just one file type.

- *.pst* files can be generated with Outlook interactively
- *.ost* files can be taken from *C:Users...*
- *.pst* files can be also generated from an Exchange Server's PowerShell in a mostly unattended fashion

## Outlook interactive export

Once the Outlook main window is open, go to “File”, “Open & Export”, “Import/Export”:

![](/img/olexport1.png)

![](/img/olexport2.png)

Then follow the usual dialog chain.

![](/img/olexport3.png)

![](/img/olexport4.png)

![](/img/olexport5.png)

![](/img/olexport6.png)

:::caution
Before attempting to copy PFF files, ensure the file(s) is/are not open anywhere anymore. Even after closing Outlook, Outlook may still execute in the background for some seconds, *in particular* when the MAPI profile used Exchange *Cached Mode*. Various failure modes trying to access active PFF files have been observed, such as:

1\. Under the `cmd.exe` shell, the command `type stillactive.pst >new.pst` produces new.pst with just 512 bytes before aborting with the message `The process cannot access the file because another process has locked a portion of the file`.

2\. Under the `cmd.exe` shell, the command `scp stillactive.pst a@b.com:` can produce the file on the target, but all bytes are ASCII NUL bytes. (So observed with Powershell-OpenSSH v8.x; fixed in 9.x). A log message `Domain error` is output by scp.

3\. PFF files contain a CRC-32 checksum, which can readily change while the file is in use. Attempts to read the file from underneath Windows (e.g. at the storage or hardware level), or attempting to use a PFF file that was not cleanly closed may result in gromox-pff2mt rejecting the input.
:::

## gromox-pff2mt import

On the grommunio system, PFF files can be imported on the command-line with [gromox-pff2mt](/man/gromox-pff2mt-8/) and [gromox-mt2exm](/man/gromox-mt2exm-8/). These are two commands meant to be chained together by way of a pipe; tend to the linked manual pages to read about the invocation syntax.

![](/img/gxpff2mt.png)

![](/img/gxdone.png)

## Automated bulk migration with `exchange2grommunio.ps1`

For migrating many mailboxes, grommunio ships a PowerShell script —
[`exchange2grommunio.ps1`](https://github.com/grommunio/gromox/blob/master/tools/exchange2grommunio.ps1) —
that automates the whole flow end to end. For each Exchange mailbox it exports a
`.pst`, makes it available to the grommunio server over a shared folder, and
imports it there via SSH — optionally creating the grommunio mailboxes as well.

### How it works

For every selected mailbox the script:

1. Exports the mailbox to a `.pst` with `New-MailboxExportRequest` onto a shared
   folder that the Exchange subsystem can write to.
2. Reaches the grommunio server over SSH (using `plink.exe`), where the same
   folder is mounted (`mount.cifs`), and imports the `.pst`.
3. Optionally deletes the `.pst` afterwards to save space, and records the
   result.

Successful imports are written to `exchange2grommunio.done` and failures to
`exchange2grommunio.failed`, so a run can be resumed or retried.

### Prerequisites

- grommunio is attached to the **same LDAP/AD** as Exchange, so users resolve on
  both sides (test LDAP before importing).
- The script is run from an **elevated Exchange Management Shell** (Windows
  Server 2012 R2 or newer, PowerShell 2.0+; 3.0+ is recommended so Linux command
  output is captured in the logs).
- **`plink.exe`** (from PuTTY) sits in the same directory as the script;
  optionally **`pageant.exe`** for SSH public-key authentication.
- A **shared folder** (UNC path) that the Exchange subsystem can write to and
  that the grommunio server can mount (`cifs-utils` installed), with enough space
  for the `.pst` files.
- SSH access to the grommunio server, with its host key already accepted by
  `plink.exe`.

### Key settings

All settings live at the top of the script (or a separate configuration file).
The most important ones:

| Variable | Purpose |
| --- | --- |
| `$GrommunioServer` | FQDN of the target grommunio server |
| `$WinSharedFolder` / `$LinuxSharedFolder` | The shared `.pst` folder, as seen from Windows (UNC) and from Linux (mount point) |
| `$LinuxUser` | Shell user on the grommunio side (e.g. `root`) |
| `$LinuxUserPWD` / `$LinuxUserSSHKey` / `$UsePageant` | SSH auth: password, private key (`.ppk`), or key via Pageant |
| `$WindowsUser` / `$WindowsPassword` | Windows account used to mount the share on Linux |
| `$AutoMount` | Mount the Windows share on the grommunio server automatically |
| `$DeletePST` | Delete each `.pst` after a successful import |
| `$MailboxLanguage` | Language for newly created mailboxes (see `/usr/share/grommunio-admin-api/res/storelangs.json`) |
| `$Organization` | `-o <id>` when created mailboxes have aliases across domains |
| `$MigrationPriority` | `New-MailboxExportRequest` priority (`Normal` is usually faster than `High`) |
| `$LogFile` | Summary log; per-mailbox export/import logs go to `<share>\logs\` |

### Selecting which mailboxes to migrate

- **Allow-list:** set `$ImportMboxes` (an array of addresses) or, if it is empty,
  the script reads addresses from the `exchange2grommunio.import` file on the
  share. Leaving both empty migrates **all** mailboxes.
- **Deny-list:** `$IgnoreMboxes` / the `exchange2grommunio.ignore` file exclude
  mailboxes (always honored).

:::tip[Generate the import list from grommunio]
You can produce the list of existing grommunio mailboxes directly:

```bash
gromox-mbop foreach.mb echo-username > /mnt/pst/exchange2grommunio.import
```

To re-run only the failures, copy the failed list over the import list
(`cp exchange2grommunio.failed exchange2grommunio.import`).
:::

### Creating mailboxes during migration

Two switches decide whether the script also provisions the grommunio mailboxes
(this requires a working LDAP configuration):

| `$CreateGrommunioMailbox` | `$OnlyCreateGrommunioMailbox` | Behaviour |
| --- | --- | --- |
| `$false` | `$false` | Migrate into **existing** mailboxes, one by one |
| `$true` | `$false` | **Create then migrate** each mailbox in turn |
| `$true` | `$true` | **Two-pass**: create all mailboxes first, then run again with both set to `$false` to migrate the data |

The two-pass mode is recommended for large migrations: users can start working in
grommunio immediately with empty mailboxes (new mail arrives normally) while the
historical data is imported in the background.

### Running it

Launch the script from the elevated Exchange Management Shell:

```powershell
.\exchange2grommunio.ps1
```

- For an **unattended** run, set `$WaitAfterImport = $false` and
  `$StopOnError = $false` so it does not block waiting for the administrator on
  an error.
- To **stop gracefully**, create the stop-marker file (`exchange2grommunio.STOP`)
  on the share — the script finishes the current mailbox and then exits.

The underlying import on the grommunio side uses the same tooling as the manual
path ([gromox-pff2mt](/man/gromox-pff2mt-8/) → [gromox-mt2exm](/man/gromox-mt2exm-8/)),
so the [import notes above](#gromox-pff2mt-import) apply equally.
