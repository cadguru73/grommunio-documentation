---
title: "grommunio-admin verbinden"
description: "grommunio-admin connect – Verbindung zu einem entfernten CLI herstellen"
sidebar:
  label: "connect"
  order: 10
---

### Name

grommunio-admin connect – Verbindung zu einem entfernten CLI herstellen

### Zusammenfassung

<strong>grommunio-admin connect</strong> \[<em>-c COMMAND</em>\] \[<em>--no-verify</em>\] \[<em>--redirect-fs</em> \[<em>--auto-save (local\|remote\|discard\|print)</em>\]\] \[<em>-v</em>\] \[<em>HOST</em> \[<em>USER</em> \[<em>PASSWORD</em>\]\]\]

### Beschreibung

Stellen Sie eine Verbindung zu einem Remote-Server her, auf dem CLI-Befehle ausgeführt werden sollen.  
Voraussetzung ist ein laufender Admin-API mit aktivem Remote-CLI sowie ein Benutzer mit `SystemAdminPermission`.

Beachten Sie, dass das Remote-Gerät CLI derzeit eine REST-Schnittstelle verwendet, die keine Standardeingabe bietet, wodurch Befehle, die auf Benutzerinteraktion angewiesen sind, unbrauchbar werden.

### Optionen

`HOST`  
Host, mit dem eine Verbindung hergestellt werden soll, im Format <em>Protokoll</em>://\*Hostname\*:\*Port\*, wobei „Protokoll“ entweder „http“ oder „https“ ist. Wird das Protokoll weggelassen, wird es automatisch erkannt, wobei https Vorrang vor http hat. Wird kein Port angegeben, werden die Standardports 8080 (http) und 8443 (https) verwendet. <em>hostname</em> kann entweder ein auflösbarer Hostname, eine IPv4-Adresse oder eine IPv6-Adresse in Klammern sein. Der Standard-Hostname ist <em>localhost</em>.

`PASSWORD`  
Passwort für die Authentifizierung. Standardmäßig wird nach dem Passwort gefragt.

`USER`  
Benutzername für die Authentifizierung. Der Standardwert lautet <em>admin</em>.

`--auto-save ACTION`  
Wählen Sie eine automatische Aktion für empfangene Dateien aus, wenn die Dateisystemumleitung aktiviert ist. Mögliche Aktionen sind:

<em>verwerfen</em> – alle empfangenen Dateien verwerfen  
<em>lokal</em> – unter lokalem Pfad speichern  
<em>print</em> – Dateiinhalt auf stdout ausgeben und verwerfen  
<em>remote</em> – unter dem vom Remote-Server gemeldeten Pfad speichern

`-c`, `--command`  
Führt den Befehl auf dem Remote-Server aus und beendet die Sitzung, anstatt eine interaktive Shell zu starten.

`--no-verify`  
Auch dann mit https fortfahren, wenn das vom Server vorgelegte TLS-Zertifikat ungültig ist. Erforderlich, wenn der Server ein selbstsigniertes Zertifikat verwendet, das nicht auf dem System installiert ist. Mit Vorsicht verwenden.

`-p`, `--password`  
Auch bei einer Verbindung zu „localhost“ nach dem Passwort fragen.

`--redirect-fs`  
CLI hat Dateioperationen auf das lokale Dateisystem umgeleitet. Weitere Informationen finden Sie im Abschnitt <em>Filesystem-Emulation</em>.

`-v`, `--verbose`  
Detailliertere Informationen zum Verbindungsvorgang ausgeben.

### Filesystem-Emulation

Wenn die Option <em>--redirect-fs</em> angegeben wird, werden die von CLI initiierten Dateioperationen in einem emulierten Dateisystem ausgeführt und die geschriebenen Dateien an den Client zurückgesendet.

Beachten Sie, dass dies nur für Dateien gilt, die durch CLI-Operationen geöffnet werden, während Operationen auf Modulebene (z. B. das Laden von Konfigurationen) davon unberührt bleiben.

Die vom Remote-Server empfangene Datei „Files“ kann anschließend angezeigt oder lokal gespeichert werden.

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-shell</strong>(1)
