---
title: "Outlook Bugs"
description: "Unsorted list of everything wrong with OL."
sidebar:
  order: 80
---

Unsorted list of everything wrong with OL.

- When a message with class <span class="title-ref">REPORT.IPM.Note.IPNRN</span> is opened, it shows PR_BODY but erroneously fed into a HTML display engine as-is, so all newlines are broken etc. When no PR_BODY is present, OL generates a broken report on the fly in native language, ignoring PR_HTML. Which is odd, because in Exchange Server, NRN has no PR_BODY either but PR_HTML displays ok-ish.
- Outlook 365 attempts to locate on-premises email addresses in cloud services. You can stop this with a regkey: In `HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\AutoDiscover`, add the key `ExcludeExplicitO365Endpoint` of type `REG_DWORD`, with value `1`.
