---
title: "Folder Permissions"
description: "Permissions within mailboxes work quite unlike the Discretionary Access Controls in a Unix filesystem. Objects in a mailbox do not store ownership infor…"
sidebar:
  order: 60
---

Permissions within mailboxes work quite unlike the Discretionary Access Controls in a Unix filesystem. Objects in a mailbox do not store ownership information. Permission to certain actions is entirely dependent upon the access permissions set up for that mailbox and/or subsections thereof. A user who has created an object may be unable to modify or delete it again. Private mailboxes have their natural owner being implicitly given the “OWNER” right on all objects in the private mailbox. For public mailboxes, there is a setting in the sqlite3 file in the `configurations` table, key `CONFIG_ID_DEFAULT_PERMISSION` valued `frightsReadAny | frightsCreate | frightsVisible | frightsEditOwned | frightsDeleteOwned` (0x41b) and key `CONFIG_ID_ANONYMOUS_PERMISSION` valued `frightsNone` (0) which will take effect if no other entry from the `permissions` table matched.
