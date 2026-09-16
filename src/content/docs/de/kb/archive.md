---
title: "Archiv"
description: "Da grommunio-archive den Dienst IMAP nutzt (als Anmelde-Backend und zur Wiederherstellung aus dem Archiv), müssen Sie beachten, dass jede u…"
sidebar:
  order: 20
---

## Anmeldung nicht möglich

Da **grommunio-archive** den Dienst IMAP nutzt (als Anmelde-Backend und zur Wiederherstellung aus dem Archiv), müssen Sie beachten, dass jeder Benutzer, der sich am Archiv anmelden darf, auch die Berechtigung zur Nutzung von IMAP/POP3 benötigt. Aktivieren Sie sie pro Benutzer in der Admin-Oberfläche (siehe [Benutzer](/de/admin/administration/#benutzer)) oder mit `grommunio-admin user modify <user> --pop3-imap true --privArchive true` (das zweite Flag vergibt die Archivberechtigung selbst). Die Archiv-Weboberfläche erreicht den IMAP-Dienst auf Port 993 unter dem Namen des TLS-Zertifikats; diese Verbindung muss für Anmeldung und Wiederherstellung funktionieren.

Die vollständige Einrichtung – Installation, Mailfluss, Suche und Wiederherstellung – beschreibt der [Archive-Leitfaden](/guides/archive/).
