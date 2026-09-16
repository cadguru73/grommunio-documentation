---
title: "AutoDiscover"
description: "Mit Stand vom 16.11.2024 wurden die Inhalte dieser Seite in die Gromox-Manpage „autodiscover(7)“ und unsere KB-Seite zu Outlook verschoben."
sidebar:
  order: 40
---

Mit Stand vom 16.11.2024 wurde der Inhalt dieser Seite in die Gromox-Manpage [autodiscover(7)](/man/autodiscover-7/) und auf unsere [KB-Seite zu Outlook](/kb/outlook/) verschoben.

## M365-Authentifizierungsdialog

Wenn eine DNS-Zone für M365 aktiviert ist (DNS-TXT-Eintrag auf der Domain mit dem Inhalt `MS=ms12345678`), zeigt Outlook ein kleines Browserfenster für die M365-Authentifizierung an. Dies kann durch die Einstellung `ExcludeExplicitO365Endpoint` dauerhaft deaktiviert werden:

``` text
[HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\AutoDiscover]
"EnableOffice365ConfigService"=dword:00000000
"ExcludeExplicitO365Endpoint"=dword:00000001

[HKEY_CURRENT_USER\Software\Policies\Microsoft\Office\16.0\Outlook\AutoDiscover]
"EnableOffice365ConfigService"=dword:00000000
"ExcludeExplicitO365Endpoint"=dword:00000001
```

- `EnableOffice365ConfigService`

  In Outlook-Versionen vor 16.0.9327.1000 wurde diese URL zur automatischen Bereitstellung von O365-Endpunkten verwendet, wodurch bestimmte Verhaltensweisen von AutoDiscover außer Kraft gesetzt wurden.

- `ExcludeExplicitO365Endpoint`

  In Outlook 2016+ (Versionen ab 16.0.6741.2017) wird dieser Konfigurationsparameter verwendet, um AutoDiscover-Anfragen über Microsoft-Server weiterzuleiten. Die Nutzung dieses Dienstes ist möglich

  \# mit grommunio, wenn die Einträge für AutoDiscover konfiguriert wurden, und/oder \# wenn global auflösbare Einträge auf grommunio als Endpunkt verweisen.

Für die Konfiguration über Gruppenrichtlinien stehen ADMX-Vorlagen unter <https://www.microsoft.com/en-us/download/details.aspx?id=49030> zur Verfügung.
