---
title: "Ordner „Gesendet“"
description: "Laut der MSDN-Dokumentation können E-Mail-Clients die MAPI-Eigenschaft „PRSENTMAILENTRYID“ festlegen und dabei auf einen Ordner verweisen, in den eine Nachricht nach dem Versenden verschoben werden soll.…"
sidebar:
  order: 150
---

Laut [MSDN-Dokumentation](https://learn.microsoft.com/en-us/office/client-developer/outlook/mapi/processing-a-sent-message) können E-Mail-Clients die Eigenschaft MAPI auf `PR_SENTMAIL_ENTRYID` setzen und einen Ordner angeben, in den eine Nachricht nach dem Versand verschoben werden soll. Beachten Sie, dass sich dies mit dem Wert `PR_DELETE_AFTER_SUBMIT` gegenseitig ausschließt (es kann nur eine Aktion ausgeführt werden).
