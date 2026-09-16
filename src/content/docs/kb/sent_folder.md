---
title: "Sent Folder"
description: "As per MSDN docs, mail clients can set the MAPI property PRSENTMAILENTRYID and point to a folder where a message should be moved once it has been sent.…"
sidebar:
  order: 150
---

As per [MSDN docs](https://learn.microsoft.com/en-us/office/client-developer/outlook/mapi/processing-a-sent-message), mail clients can set the MAPI property `PR_SENTMAIL_ENTRYID` and point to a folder where a message should be moved once it has been sent. Note that this is mutually exclusive with `PR_DELETE_AFTER_SUBMIT` (only one action can be performed).
