---
title: "grommunio-admin-Server"
description: "grommunio-admin-Server – Verwaltung mehrerer Server"
sidebar:
  label: "server"
  order: 10
---

### Name

grommunio-admin-Server – Verwaltung mehrerer Server

### Zusammenfassung

<strong>grommunio-admin-Server</strong> <strong>erstellen</strong> <em>-H HOSTNAME</em> <em>-e EXTNAME</em>\]  
<strong>grommunio-admin-Server</strong> <strong>löschen</strong> <em>SERVERSPEC</em>  
<strong>grommunio-admin-Server</strong> <strong>Liste</strong> \[<em>-f FIELD=\<value\></em>\] \[<em>-s FIELD</em>\] \[<em>SERVERSPEC</em>\]  
<strong>grommunio-admin-Server</strong> <strong>ändern</strong> \[<em>\<FIELDS\></em>\] <em>SERVERSPEC</em>  
<strong>grommunio-admin-Server</strong> <strong>Anzeigen</strong> \[<em>-f FIELD=\<value\></em>\] \[<em>-s FIELD</em>\] <em>SERVERSPEC</em>

### Beschreibung

Unterbefehl zum Anzeigen und Bearbeiten von Server-Einträgen.

Wenn mindestens ein Server angegeben wird, werden neu angelegte Benutzer und Domänen einem der Server zugeordnet. Der Zielserver kann explizit angegeben werden oder wird automatisch gemäß <em>options.serverPolicy</em> ausgewählt.

### Befehle

`create`  
Neuen Server registrieren

`delete`  
Einen Server vorläufig löschen

`list`  
Domains auflisten

`modify`  
Server bearbeiten

`show`  
Detaillierte Informationen zu einem Server anzeigen

### Optionen

`SERVERSPEC`  
Hostname oder ID des Servers

`-f FIELD=<value>`, `--filter FIELD=<value>`  
Filterausdruck in der Form „Feld=Wert“. Kann mehrfach angegeben werden, um den Filter zu verfeinern

`-s FIELD`, `--sort FIELD`  
Nach Feld sortieren. Kann mehrfach angegeben werden.

### Felder

`-H HOSTNAME`, `--hostname HOSTNAME`  
Interner Hostname des Servers

`` `-e EXTNAME ``, `--extname EXTNAME`  
Externer Hostname (z. B. FQDN) des Servers.

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-Domäne</strong>(1), <strong>grommunio-admin-Benutzer</strong>(1)
