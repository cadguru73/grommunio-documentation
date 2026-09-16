---
title: "Fehlerbehebung bei Messaging-Diensten"
description: "Ab Version Gromox gromox-1.33-72-ge09fed809 ist allen Meldungen eine Schweregradstufe zugeordnet, und für die Gromox-Daemons gibt es eine Einstellung für die Protokollierungsstufe. Die De…"
sidebar:
  order: 70
---

## Protokollierungsstufe

Ab Version Gromox gromox-1.33-72-ge09fed809 ist allen Meldungen eine Schweregradstufe zugeordnet, und für die Gromox-Daemons gibt es eine Einstellung für die Protokollstufe. Die Standardstufe ist 4 (NOTICE).

## Ausführliche Debug-Optionen

Der Daemon „gromox-http“ kann so konfiguriert werden, dass er für eine detaillierte Fehlersuche mehr Meldungen ausgibt. Weitere Informationen finden Sie in den entsprechenden Manpages.

Um diese Debug-Meldungen anzuzeigen, muss die Protokollierungsstufe in verschiedenen Daemons ebenfalls auf 6 (DEBUG) gesetzt werden, z. B. `http.cfg:http_log_level`.

- `/etc/gromox/http.cfg`: `http_debug=1`, um HTTP-Anfragen/Antworten in Echtzeit auszugeben. Dabei können Anmeldedaten sichtbar werden, seien Sie also vorsichtig!
- `/etc/gromox/http.cfg`: `msrpc_debug=1`, um kurze Statusberichte von DCE-Remote-Procedure-Calls auszugeben.
- `/etc/gromox/exchange_nsp.cfg`: `nsp_trace=1`, um den Einstieg in und den Ausstieg aus NSP-Prozeduren (Adressbuch) sowie einige Daten auszugeben.
- `/etc/gromox/exchange_emsmdb.cfg`: `rop_debug=2` zum Ausgeben von EMSMDB-ROPs, die von Clients ausgegeben wurden. (Ein DCE-Aufruf kann mehrere ROP-Befehle enthalten.)
- `/etc/gromox/exmdb_provider.cfg`: `exrpc_debug=2` zum Ausgeben aller ausgegebenen EXMDB-RPCs (nur Netzwerk, keine von emsmdb durchgeführten Shmem-Aufrufe)
- `/etc/gromox/exmdb_provider.cfg`: `sqlite_debug=1` zum Ausgeben aller SQLite-SQL-Anweisungen, sobald sie ausgegeben werden. Fehlgeschlagene Anweisungen werden in jedem Fall protokolliert.
- (Für mysql_adaptor-SQL-Anweisungen gibt es keine Einstellmöglichkeit. Fehlgeschlagene Anweisungen werden jedoch in jedem Fall protokolliert.)
- Das Senden von SIGUSR1 an gromox-http führt zur Ausgabe der derzeit aktiven HTTP-Verbindungen und EMSMDB-Sitzungen.

Ähnliche Anweisungen gibt es auch für andere Daemons:

- `/etc/gromox/zcore.cfg`: `zrpc_debug=2`, um alle von php-fpm ausgegebenen Zcore-RPCs auszugeben.
- `/etc/gromox/midb.cfg`: `midb_cmd_debug=2`, um alle MIDB-Befehle auszugeben.
- `/etc/gromox/midb.cfg`: `sqlite_debug=1` zum Ausgeben aller SQLite-SQL-Anweisungen, sobald sie gesendet werden.
- `/etc/gromox/imap.cfg`: `imap_cmd_debug=2` zum Ausgeben aller IMAP-Befehle (ohne Antworten). Anmeldedaten können sichtbar werden.
- `/etc/gromox/pop3.cfg`: `pop3_cmd_debug=2`, um alle POP3-Befehle (ohne Antworten) auszugeben. Anmeldedaten können sichtbar werden.
