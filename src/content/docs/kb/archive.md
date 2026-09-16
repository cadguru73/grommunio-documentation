---
title: "Archive"
description: "Because grommunio-archive makes use of the IMAP service (as login backend and for means of recovery from archive), you have to keep in mind that every u…"
sidebar:
  order: 20
---

## Login not possible

Because **grommunio-archive** makes use of the IMAP service (as login backend and for means of recovery from archive), you have to keep in mind that every user who is allowed to login to the archive also needs the permission to use IMAP/POP3. Enable it per user in the Admin UI (see [Users](/admin/administration/#users)) or with `grommunio-admin user modify <user> --pop3-imap true --privArchive true` (the second flag grants the archive privilege itself). The archive web interface reaches the IMAP service on port 993 under the name on the TLS certificate; that connection must work for logins and restores.

For the full set-up — installation, mail flow, search and restore — see the [Archive setup guide](/guides/archive/).
