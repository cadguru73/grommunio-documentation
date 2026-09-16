---
title: "grommunio-admin-Lauf"
description: "grommunio-admin ausführen – Einen eigenständigen HTTP-Server starten"
sidebar:
  label: "run"
  order: 10
---

### Name

grommunio-admin ausführen – Einen eigenständigen HTTP-Server starten

### Zusammenfassung

<strong>grommunio-admin run</strong> \[<em>-d</em>\] \[<em>-i IP</em>\] \[<em>--no-config-check</em>\] \[<em>-p PORT</em>\]

### Beschreibung

Führen Sie REST API auf einem eigenständigen HTTP-Server aus.

<dfn class="gx-param">—–NICHT IN DER PRODUKTION VERWENDEN!—–</dfn>  
Dieser Befehl ist für Entwicklungs- und Testzwecke vorgesehen. In einer Produktionsumgebung sollte ein externer WSGI-Server wie <em>uwsgi</em> verwendet werden.

### Optionen

`-d`, `--debug`  
Debug-Modus aktivieren

`-i IP`, `--ip IP`  
Host-Adresse, an die gebunden werden soll (Standard: ::)

`--no-config-check`  
Konfigurationsprüfung überspringen

`-p PORT`, `--port PORT`  
Host-Port, an den eine Verbindung hergestellt werden soll (Standard: 5001)

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-config</strong>(1)
