---
title: "Benutzer grommunio-admin"
description: "grommunio-admin-Benutzer — Benutzerverwaltung"
sidebar:
  label: "user"
  order: 10
---

### Name

grommunio-admin-Benutzer — Benutzerverwaltung

### Zusammenfassung

<strong>grommunio-admin Benutzer</strong> <strong>erstellen</strong> \[<em>--no-defaults</em>\] \[<em>--no-maildir</em>\] \[<em>\<FIELDS\></em>\] <em>BENUTZERNAME</em>  
<strong>grommunio-admin user</strong> <strong>delegate</strong> <em>USERSPEC</em> (<em>clear</em> \| <em>list</em>)  
<strong>grommunio-admin Benutzer</strong> <strong>Beauftragter</strong> <em>USERSPEC</em> (<em>add</em> \| <em>remove</em>) <em>USERNAME</em> …  
<strong>grommunio-admin Benutzer</strong> <strong>löschen</strong> \[<em>-c</em>\] \[<em>-k</em>\] \[<em>-y</em>\] <em>USERSPEC</em>  
<strong>grommunio-admin user</strong> <strong>devices</strong> <em>USERSPEC</em> (<em>list</em> \| <em>resync</em> \| <em>remove</em> \| <em>show</em>) \[<em>DEVICE</em> …\]  
<strong>grommunio-admin user</strong> <strong>devices</strong> <em>USERSPEC</em> wipe \[<em>--mode MODE</em>\] <em>DEVICE</em>  
<strong>grommunio-admin Benutzer</strong> <strong>Liste</strong> \[<em>-f ATTRIBUTE=\<value\></em>\] \[<em>-s FIELD</em>\] \[<em>USERSPEC</em>\]  
<strong>grommunio-admin user</strong> <strong>login</strong> \[<em>--nopass</em>\] \[<em>--password PASSWORD</em>\] \[<em>--token</em>\] <em>USERNAME</em>  
<strong>grommunio-admin user</strong> <strong>modify</strong> \[<em>\<FIELDS\></em>\] \[<em>--delete-chat-user</em>\] \[<em>--no-ldap</em>\] \[<em>--remove-alias ALIAS</em>\] \[<em>--remove-altname ALTNAME</em>\] \[<em>--remove-property PROPSPEC</em>\] \[<em>--remove-storeprop PROPSPEC</em>\] <em>USERSPEC</em>  
<strong>grommunio-admin user</strong> <strong>query</strong> \[<em>-f ATTRIBUTE=\<value\></em>\] \[<em>--format FORMAT</em>\] \[<em>--separator SEPARATOR</em>\] \[-s FIELD-129\] \[ATTRIBUTE-131 …\]  
<strong>grommunio-admin user</strong> <strong>sendas</strong> <em>USERSPEC</em> (<em>clear</em> \| <em>list</em>)  
<strong>grommunio-admin-Benutzer</strong> <strong>sendas</strong> <em>USERSPEC</em> (<em>hinzufügen</em> \| <em>entfernen</em>) <em>USERNAME</em> …  
<strong>grommunio-admin Benutzer</strong> <strong>anzeigen</strong> \[<em>-f ATTRIBUTE=\<value\></em>\] \[<em>-s FIELD</em>\] <em>USERSPEC</em>

### Beschreibung

Unterbefehl für die Benutzerverwaltung.

### Befehle

`create`  
Neuen Benutzer anlegen

`delegate`  
Berechtigungen für Stellvertreter verwalten

`delete`  
Benutzer löschen

`devices`  
Verwaltung der mobilen Endgeräte der Benutzer

`list`  
Benutzer auflisten <strong> Veraltet. </strong> Verwenden Sie stattdessen die Abfrage.

`login`  
Anmeldung als Testbenutzer

`modify`  
Benutzer bearbeiten

`query`  
Benutzerattribute abfragen

`sendas`  
Berechtigung zum Versenden im Namen anderer verwalten

`show`  
Detaillierte Informationen zu einem Benutzer anzeigen

### Optionen

`ATTRIBUTE`  
Zu abfragende Attribute. Verfügbare Attribute sind <em>ID</em>, <em>aliases</em>, <em>changePassword</em>, <em>chat</em>, <em>chatAdmin</em>, <em>domainID</em>, <em>forward</em>, <em>homeserverID</em>, <em>lang</em>, <em>ldapID</em>, <em>maildir</em>, <em>pop3_imap</em>, <em>privArchive</em>, <em>privChat</em>, <em>privFiles</em>, <em>privVideo</em>, <em>privWeb</em>, <em>privDav</em>, <em>privEas</em>, <em>publicAddress</em>, <em>smtp</em>, <em>status</em> und <em>username</em>.

Wenn keine Attribute angegeben werden, werden <em>ID</em>, <em>Benutzername</em> und <em>Status</em> angezeigt.

`DEVICE`  
Befehl auf bestimmte Geräte-IDs beschränken

`USERNAME`  
E-Mail-Adresse des Benutzers

`USERSPEC`  
Benutzernamenpräfix oder Benutzer-ID

`-c`, `--keep-chat`  
Chat-Nutzer deaktivieren, aber nicht dauerhaft löschen

`--delete-chat-user`  
Chat-Nutzer dauerhaft löschen

`-f FIELD=<value>`, `--filter FIELD=<value>`  
Filterausdruck in der Form „Feld=Wert“. Kann mehrfach angegeben werden, um den Filter zu verfeinern

`--format FORMAT`  
Ausgabeformat. Kann einer der folgenden Werte sein: <em>csv</em>, <em>json-flat</em>, <em>json-kv</em>, <em>json-object</em>, <em>json-structured</em> und <em>pretty</em>. Die Standardeinstellung ist <em>pretty</em>.

`-k`, `--keep-files`  
Benutzerdateien dürfen nicht von der Festplatte gelöscht werden

`--mode MODE`  
Geben Sie den einzustellenden Löschstatus an. Mögliche Werte sind <em>account</em> und <em>normal</em> oder <em>cancel</em>, um einen anstehenden Löschvorgang abzubrechen.

`--no-defaults`  
Konfigurierte Standardwerte nicht übernehmen

`--no-ldap`  
Benutzer vom Objekt LDAP trennen

`--no-maildir`  
Erstellen Sie für diesen Benutzer kein Postfach.

`--nopass`  
Passwortprüfung überspringen

`--password`  
Benutzerkennwort. Wird es weggelassen, wird das Kennwort über die Eingabeaufforderung abgefragt.

`--remove-alias ALIAS`  
ALIAS vom Benutzer entfernen (kann mehrfach angegeben werden)

`--remove-altname ALTNAME`  
ALTNAME vom Benutzer entfernen (kann mehrfach angegeben werden)

`--remove-property PROPSPEC`  
Eigenschaft vom Benutzer entfernen (kann mehrfach angegeben werden)

`--remove-storeprop PROPSPEC`  
Eigenschaft aus dem Speicher des Benutzers entfernen (kann mehrfach angegeben werden)

`--separator SEPARATOR`  
Zeichenfolge zur Spaltentrennung (nur bei <em>csv</em> und <em>pretty</em>). Muss die Länge 1 haben, wenn das Format <em>csv</em> ist. Der Standardwert ist „,“ für <em>csv</em> und „ “ für „pretty“.

`-s FIELD`, `--sort FIELD`  
Nach Feld sortieren. Kann mehrfach angegeben werden.

`--token`  
Bei erfolgreicher Anmeldung Zugangs- und CSRF-Token generieren

`-y`, `--yes`  
Anstatt nachzufragen, wird „Ja“ angenommen

### Felder

`--changePassword <bool>`  
Ob der Benutzer das Passwort ändern kann

`--chat <bool>`  
Soll ein Chat-Benutzer angelegt werden?

`--chatAdmin <bool>`  
Ob der Benutzer über Chat-Administratorrechte verfügt

`--homeserver ID`  
ID des Heim-Servers oder 0 für lokale Benutzer

`--lang LANG`  
Sprache des Benutzerspeichers

`--ldapID LDAPID`  
Kennung des mit dem Benutzer verknüpften Objekts LDAP

`--pop3-imap <bool>`  
Ob der Benutzer über die Berechtigung „POP3/IMAP“ verfügt

`--privArchive <bool>`  
Ob der Benutzer über die Archivierungsberechtigung verfügt

`--privChat <bool>`  
Ob der Benutzer über die Chat-Berechtigung verfügt

`--privFiles <bool>`  
Ob der Benutzer über die Berechtigung zum Zugriff auf die Dateien verfügt

`--privVideo <bool>`  
Ob der Benutzer über die Videoberechtigung verfügt

`--privWeb <bool>`  
Ob der Benutzer über die Web-Berechtigung verfügt

`--privDav <bool>`  
Ob der Benutzer über die Berechtigung „DAV“ verfügt

`--privEas <bool>`  
Ob der Benutzer über die Berechtigung „EAS“ verfügt

`--public-address <bool>`  
Ob der Benutzer die Berechtigung zur öffentlichen Adressierung besitzt

`--smtp <bool>`  
Ob der Benutzer über die Berechtigung „SMTP“ verfügt

`--status STATUS`  
Status der Benutzeradresse. Entweder ein numerischer Wert oder einer der folgenden Einträge: <em>normal</em>, <em>gesperrt</em>, <em>gelöscht</em> oder <em>geteilt</em>.

`--alias ALIAS`  
Alias hinzufügen

`--altname ALTNAME`  
ALTNAME zur Liste der alternativen Anmeldenamen des Benutzers hinzufügen (kann mehrfach angegeben werden)

`--property propspec=value`  
Die durch propspec definierte Eigenschaft auf den Wert setzen

`--storeprop propspec=value`  
Die durch propspec definierte Store-Eigenschaft auf den Wert setzen

`--username`  
Benutzer umbenennen

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-Domäne</strong>(1), <strong>grommunio-admin-exmdb</strong>(1), <strong>grommunio-admin-fs</strong>(1), <strong>grommunio-admin-ldap</strong>(1), <strong>grommunio-admin-passwd</strong>(1), <strong>grommunio-admin-server</strong>(1)
