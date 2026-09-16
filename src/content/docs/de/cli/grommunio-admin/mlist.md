---
title: "grommunio-admin mlist"
description: "grommunio-admin mlist – Verwaltung von Mailinglisten und Verteilerlisten"
sidebar:
  label: "mlist"
  order: 10
---

### Name

grommunio-admin mlist – Verwaltung von Mailing- und Verteilerlisten

### Zusammenfassung

<strong>grommunio-admin mlist</strong> <strong>add</strong> <em>MLISTSPEC</em> (<em>Absender</em>\|<em>Empfänger</em>) <em>ENTRY</em> <strong>grommunio-admin mlist</strong> <strong>create</strong> \[<em>-p BEFUGNIS</em>\] \[<em>-r EMPFÄNGER</em>\] \[<em>-s SENDER</em>\] \[<em>-t TYPE</em>\] NAME  
<strong>grommunio-admin mlist</strong> <strong>delete</strong> \[<em>-y</em>\] <em>MLISTSPEC</em>  
<strong>grommunio-admin mlist</strong> <strong>list</strong> \[<em>-f FIELD=\<value\></em>\] \[<em>-s FIELD</em>\] \[<em>MLISTSPEC</em>\]  
<strong>grommunio-admin mlist</strong> <strong>modify</strong> \[<em>-p PRIVILEGE</em>\] \[<em>-r RECIPIENT</em>\] <em>MLISTSPEC</em> <strong>grommunio-admin mlist</strong> <strong>remove</strong> <em>MLISTSPEC\ (\59\sender\60\|\61\empfänger\62) <em>ENTRY</em> <strong>grommunio-admin mlist</strong> <strong>show</strong>

### Beschreibung

Mailinglisten erstellen, bearbeiten oder löschen.

### Befehle

`add`  
Absender oder Empfänger zur Liste hinzufügen

`create`  
Eine neue Mailingliste erstellen

`delete`  
Mailingliste löschen

`list`  
Mailinglisten auflisten

`modify`  
Mailingliste bearbeiten

`remove`  
Absender oder Empfänger aus der Liste entfernen

`show`  
Detaillierte Informationen zur Mailingliste anzeigen

### Optionen

`-p PRIVILEGE`, `--privilege PRIVILEGE`  
Legen Sie fest, wer E-Mails an die Liste senden darf: eine der folgenden Optionen: <em>alle</em>, <em>Domäne</em>, <em>intern</em>, <em>ausgehend</em> oder <em>bestimmt</em>

`-f FIELD=<value>`, `--filter FIELD=<value>`  
Filterausdruck in der Form „Feld=Wert“. Kann mehrfach angegeben werden, um den Filter zu verfeinern

`-s FIELD`, `--sort FIELD`  
Nach Feld sortieren. Kann mehrfach angegeben werden.

`-t TYPE`, `--type TYPE`  
Listentyp (Empfängerauswahl), entweder <em>normal</em> oder <em>domain</em>

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-Domäne</strong>(1), <strong>grommunio-admin-Benutzer</strong>(1)
