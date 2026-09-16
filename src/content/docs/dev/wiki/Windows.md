---
title: "Available providers"
description: "MAPI profiles are stored in HKEYCURRENTUSER\\Software\\Microsoft\\Office\\16.0\\Outlook\\Profiles."
sidebar:
  order: 120
---

| On-disk | PR_PROVIDER_DLL_NAME | PR_SERVICE_NAME |
|----|----|----|
| `emsmdb32.dll` | `EMSMDB.DLL` | `MSEMS` (AB), `MSEMS` (MS), `MSEMS` (XP) |
| `mspst32.dll` | `MSPST.DLL` | `MSPST MS`, `MSUPST MS` |
| `contab32.dll` | `CONTAB.DLL` | `CONTAB` |
| `pstprx32.dll` | `PSTPRX.DLL` | `EAS` |
| `pstprx32.dll` | `PSTPRX.DLL` | `INTERSTOR` |

<https://docs.microsoft.com/en-us/office/client-developer/outlook/mapi/mapi-architecture-overview>

## Programs

- Outlook
- Windows Mail
- MFCMAPI
- MAPI Profile Manager

## Profiles

MAPI profiles are stored in `HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\Profiles`.

Regedit keys in a profile section carry the MAPI proptag as name, but the wrong way around (`001f3001` instead of `3001001f` aka `PR_DISPLAY_NAME`), because converting from in-memory representation to proper hexencoded text was too hard for people. Meh, better use MFCMAPi to read profile sections.

The autodiscover URL is retained in `PR_HAS_NAMED_PROPERTIES`. Using the AB requires a successful login to the AB Provider, which seems to rely on the Autodiscover host being available (changing the host via `c:\windows\system32\drivers\etc\hosts` can lead to the password box showing).

Your Gromox account's department may show up in `PR_SYNCHRONIZE_FLAGS`.
