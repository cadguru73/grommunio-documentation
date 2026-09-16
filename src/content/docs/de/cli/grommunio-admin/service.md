---
title: "grommunio-admin-Service"
description: "grommunio-admin-Dienst – Steuerung der externen Dienstschnittstelle des grommunio-admin"
sidebar:
  label: "service"
  order: 10
---

### Name

grommunio-admin-Dienst – Steuerung der externen Dienstschnittstelle des grommunio-admin

### Zusammenfassung

<strong>grommunio-admin-Dienst</strong> \[<em>-r</em>\] <em>load</em> <em>SERVICE</em> \[<em>ARGS</em> …\]  
<strong>grommunio-admin-Dienst</strong> \[<em>-v</em>\] <em>status</em> \[<em>SERVICE</em> \[<em>SERVICE</em> \[…\]\]\]

### Beschreibung

grommunio-admin stellt eine Verbindung zu verschiedenen externen Diensten her, um entweder Konfigurationsmöglichkeiten über API bereitzustellen (z. B. grommunio-Chat) oder zusätzliche Informationen abzurufen (z. B. LDAP).  
<em>Der grommunio-admin-Dienst</em> kann verwendet werden, um den Verbindungsstatus dieser Dienste zu überprüfen.  
Beachten Sie, dass der CLI unabhängig vom API-Backend läuft. Wenn eine Überprüfung der laufenden Serverinstanz erforderlich ist, verwenden Sie den Befehl <em>connect</em>, um auf die Serverinstanz zuzugreifen.  
Ab Version 1.9 fungiert jeder Dienst als Blaupause für parametrisierte Instanzen. Derzeit unterstützt nur der Dienst LDAP Parameter, was organisationsspezifische LDAP-Verbindungen ermöglicht.  
Jede Instanz verfügt über einen Status, der den Verbindungsstatus widerspiegelt. Es werden die folgenden Status verwendet:

`UNLOADED`  
Der Dienst wurde noch nicht geladen. Er wird bei Bedarf automatisch geladen.

`LOADED`  
Der Dienst wurde erfolgreich initialisiert.

`UNAVAILABLE`  
Es ist ein Fehler aufgetreten, der darauf hinweist, dass der Dienst derzeit nicht verfügbar ist, aber möglicherweise in Zukunft wieder verfügbar sein wird. Für die Wiederherstellung der Verbindung ist kein Neuladen erforderlich.

`SUSPENDED`  
Es ist ein Fehler aufgetreten, der darauf hinweist, dass der Dienst derzeit nicht verfügbar ist, aber möglicherweise in Zukunft wieder verfügbar sein wird. Der Dienst wird bei der nächsten Nutzung automatisch neu geladen.

`ERROR`  
Der Dienst ist entweder aufgrund einer fehlgeschlagenen Initialisierung oder aufgrund von zwei Fehlern nicht verfügbar. Er bleibt so lange nicht verfügbar, bis er manuell neu geladen wird.

`DISABLED`  
Der Dienst wurde manuell deaktiviert (entweder über die Konfiguration oder per Befehl).

### Befehle

#### laden

Dienste laden oder neu laden.  
Es sind nur Dienste im Status „UNLOADED“ oder „SUSPENDED“ betroffen, es sei denn, die Option <em>--reload</em> wird angegeben.

#### Status

Status aller Dienste anzeigen.

### Optionen

`SERVICE`  
Name des Dienstes.

`-r`, `--reload`  
Neuladen des Dienstes erzwingen.

`-v`, `--verbose`  
Weitere Informationen anzeigen.

### Dienstleistungen

Die folgenden Dienste sind derzeit über die Dienstschnittstelle verbunden:

`chat`  
grommunio-Chat. Verbunden über die REST-Schnittstelle.

`exmdb`  
gromox exmdb-Anbieter (gromox-http). Verbunden über ein benutzerdefiniertes TCP-Protokoll.

`ldap`  
Externer LDAP-Dienst. Verbunden über LDAP(e).

`redis`  
Redis-Instanz (wird von der grommunio-Synchronisation verwendet). Verbunden über den Redis-Treiber (TCP).

`systemd`  
Ausführung einer Shell unter systemd.

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-config</strong>(1), <strong>grommunio-admin-connect</strong>(1), <strong>grommunio-admin-ldap</strong>(1) <strong>grommunio-admin-mconf</strong>(1)
