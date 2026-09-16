---
title: "Synchronisationsprobleme"
description: "Was tun, wenn ein Synchronisierungsproblem im Offline-Modus auftritt:"
sidebar:
  order: 110
---

Was tun, wenn ein Synchronisierungsproblem im Offline-Modus auftritt:

- Exportieren Sie in MFCMAPI die Nachricht in das .msg-Format. Wenn dies fehlschlägt, liegt darin der Grund für den Synchronisierungsfehler.
  <em> Unvollständige Empfänger-Unterobjekte sind eine häufige Ursache für Fehler</em>
- msmapi/emsmdb.dll ist ziemlich ungeschickt, und der Offline-Modus funktioniert nicht richtig, wenn der Server anbieterspezifische Eigenschaften (0x6600–0x67FF) mit einer Größe von ≥ 8 KB sendet.
