---
title: "Outlook Fehler"
description: "Eine ungeordnete Liste aller Mängel bei OL."
sidebar:
  order: 80
---

Eine ungeordnete Liste aller Mängel bei OL.

- Wenn eine Nachricht mit der Klasse <span class="title-ref">REPORT.IPM.Note.IPNRN</span> geöffnet wird, wird zwar PR_BODY angezeigt, dieser wird jedoch fälschlicherweise unverändert an eine HTML-Rendering-Engine übergeben, sodass alle Zeilenumbrüche zerstört werden usw. Wenn kein PR_BODY vorhanden ist, generiert OL spontan einen fehlerhaften Bericht in der Landessprache und ignoriert dabei PR_HTML. Das ist seltsam, da in Exchange Server NRN ebenfalls keinen PR_BODY hat, PR_HTML jedoch einigermaßen korrekt angezeigt wird.
- Outlook 365 versucht, lokale E-Mail-Adressen in Cloud-Diensten zu finden. Sie können dies mit einem Registrierungsschlüssel unterbinden: Fügen Sie in `HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\AutoDiscover` den Schlüssel `ExcludeExplicitO365Endpoint` vom Typ `REG_DWORD` mit dem Wert `1` hinzu.
