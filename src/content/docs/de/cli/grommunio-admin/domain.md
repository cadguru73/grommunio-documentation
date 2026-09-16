---
title: "grommunio-admin-Domäne"
description: "grommunio-admin-Domain – Domainverwaltung"
sidebar:
  label: "domain"
  order: 10
---

### Name

grommunio-admin-Domain – Domainverwaltung

### Zusammenfassung

<strong>grommunio-admin-Domäne</strong> <strong>erstellen</strong> \[<em>--create-role</em>\] \[<em>--homeserver HOMESERVER</em>\] \[<em>--no-defaults</em>\] \[<em>--skip-adaptor-reload</em>\] \[<em>\<FIELDS\></em>\] <em>-u MAXUSER</em> <em>DOMAINNAME</em>  
<strong>grommunio-admin-Domäne</strong> <strong>löschen</strong> <em>DOMAINSPEC</em>  
<strong>grommunio-admin Domäne</strong> <strong>Liste</strong> \[<em>-f FIELD=\<value\></em>\] \[<em>-s FIELD</em>\] \[<em>DOMAINSPEC</em>\]  
<strong>grommunio-admin-Domäne</strong> <strong>ändern</strong> \[<em>\<FIELDS\></em>\] <em>DOMAINSPEC</em>  
<strong>grommunio-admin-Domäne</strong> <strong>bereinigen</strong> \[<em>--Dateien</em>\] \[<em>-y</em>\] <em>DOMAINSPEC</em>  
<strong>grommunio-admin-Domäne</strong> <strong>Abfrage</strong> \[<em>-f ATTRIBUTE=\<value\></em>\] \[<em>--format FORMAT</em>\] \[<em>--separator SEPARATOR</em>\] \[<em>-s FIELD</em>\] \[<em>ATTRIBUTE</em> …\]  
<strong>grommunio-admin-Domäne</strong> <strong>wiederherstellen</strong> <em>DOMAINSPEC</em>  
<strong>grommunio-admin-Domäne</strong> <strong>anzeigen</strong> \[<em>-f FIELD=\<value\></em>\] \[<em>-s FIELD</em>\] <em>DOMAINSPEC</em>

### Beschreibung

Unterbefehl zum Anzeigen und Bearbeiten von Domänen.

### Befehle

`create`  
Neue Domain erstellen

`delete`  
Eine Domain vorläufig löschen

`list`  
Domains auflisten

`modify`  
Domäne bearbeiten

`purge`  
Domain endgültig löschen

`query`  
Domänenattribute abfragen

`recover`  
Eine vorläufig gelöschte Domain wiederherstellen

`show`  
Detaillierte Informationen zu einer Domain anzeigen

### Optionen

`ATTRIBUTE`  
Abzufragende Attribute. Verfügbare Attribute sind <em>ID</em>, <em>activeUsers</em>, <em>address</em>, <em>adminName</em>, <em>chat</em>, <em>chatID</em>, <em>Anzeigename</em>, <em>Domainstatus</em>, <em>domainname</em>, <em>endDay</em>, <em>homedir</em>, <em>homeserverID</em>, <em>inactiveUsers</em>, <em>maxUser</em>, <em>orgID</em>, <em>tel</em> und <em>title</em>

Wenn keine Attribute angegeben werden, werden <em>ID</em>, <em>domainname</em> und <em>domainStatus</em> angezeigt.

`DOMAINNAME`  
Vollständiger Name der Domain

`DOMAINSPEC`  
Domainnamen-Präfix oder Domain-ID

`--create-role`  
Erstellen Sie automatisch eine Domänenadministratorrolle für die neue Domäne

`--files`  
Lösche auch Dateien von der Festplatte

`-f FIELD=<value>`, `--filter FIELD=<value>`  
Filterausdruck in der Form „Feld=Wert“. Kann mehrfach angegeben werden, um den Filter zu verfeinern

`--format FORMAT`  
Ausgabeformat. Kann einer der folgenden Werte sein: <em>csv</em>, <em>json-flat</em>, <em>json-kv</em>, <em>json-object</em>, <em>json-structured</em> und <em>pretty</em>. Die Standardeinstellung ist <em>pretty</em>.

`--homeserver HOMESERVER`  
ID des Homeservers, auf dem die Domain eingerichtet werden soll

`--no-defaults`  
Konfigurierte Standardwerte nicht übernehmen

`--separator SEPARATOR`  
Zeichenfolge zur Spaltentrennung (nur bei <em>csv</em> und <em>pretty</em>). Muss die Länge 1 haben, wenn das Format <em>csv</em> ist. Der Standardwert ist „,“ für <em>csv</em> und „ “ für „pretty“.

`-s FIELD`, `--sort FIELD`  
Nach Feld sortieren. Kann mehrfach angegeben werden.

`-y`, `--yes`  
Anstatt nachzufragen, wird „Ja“ angenommen

### Felder

`--address ADDRESS`  
Inhalt des Adressfelds

`--adminName ADMINNAME`  
Name des Domain-Administrators oder des Hauptansprechpartners

`--endDay ENDDAY`  
Ablaufdatum der Domain im Format JJJJ-MM-TT

`--orgID ID`  
ID der Organisation, der die Domain zugewiesen werden soll

`--tel TEL`  
Telefonnummer des Domain-Administrators oder des Hauptansprechpartners

`-u MAXUSER`, `--maxUser MAXUSER`  
Maximale Anzahl von Benutzern in der Domäne

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-exmdb</strong>(1), <strong>grommunio-admin-fs</strong>(1), <strong>grommunio-admin-server</strong>(1), <strong>grommunio-admin-user</strong>(1)
