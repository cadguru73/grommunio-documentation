---
title: "Verfügbare Anbieter"
description: "Die MAPI-Profile werden unter HKEYCURRENTUSER\\Software\\Microsoft\\Office\\16.0\\Outlook\\Profiles gespeichert."
sidebar:
  order: 120
---

| Auf Festplatte | PR_PROVIDER_DLL_NAME | PR_SERVICE_NAME |
|----|----|----|
| `emsmdb32.dll` | `EMSMDB.DLL` | `MSEMS` (AB), `MSEMS` (MS), `MSEMS` (XP) |
| `mspst32.dll` | `MSPST.DLL` | `MSPST MS`, `MSUPST MS` |
| `contab32.dll` | `CONTAB.DLL` | `CONTAB` |
| `pstprx32.dll` | `PSTPRX.DLL` | `EAS` |
| `pstprx32.dll` | `PSTPRX.DLL` | `INTERSTOR` |

<https://docs.microsoft.com/en-us/office/client-developer/outlook/mapi/mapi-architecture-overview>

## Programme

- Outlook
- Windows Mail
- MFCMAPI
- MAPI Profil-Manager

## Profile

Die Profile „MAPI“ sind unter `HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\Profiles` gespeichert.

Regedit-Schlüssel in einem Profilabschnitt tragen das Proptag „MAPI“ als Namen, allerdings in der falschen Reihenfolge (`001f3001` statt `3001001f`, auch bekannt als `PR_DISPLAY_NAME`), da die Konvertierung von der Darstellung im Arbeitsspeicher in korrekten hexadezimal kodierten Text für die Entwickler zu schwierig war. Na ja, besser MFCMAPi zum Lesen von Profilabschnitten verwenden.

Die Autodiscover-URL wird in `PR_HAS_NAMED_PROPERTIES` beibehalten. Für die Nutzung des AB ist eine erfolgreiche Anmeldung beim AB-Anbieter erforderlich, was offenbar davon abhängt, dass der Autodiscover-Host verfügbar ist (eine Änderung des Hosts über `c:\windows\system32\drivers\etc\hosts` kann dazu führen, dass das Passwortfeld angezeigt wird).

Die Abteilung Ihres Gromox-Kontos wird möglicherweise als `PR_SYNCHRONIZE_FLAGS` angezeigt.
