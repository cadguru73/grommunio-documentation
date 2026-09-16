---
title: "grommunio-admin exmdb"
description: "grommunio-admin exmdb – Verwaltung von Benutzer- oder Domänen-Speichern"
sidebar:
  label: "exmdb"
  order: 10
---

### Name

grommunio-admin exmdb – Verwaltung von Benutzer- oder Domänen-Speichern

### Zusammenfassung

<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>TARGET</em> <em>folder</em> <em>create</em> \[<em>--comment COMMENT</em>\] \[<em>-t TYPE</em>\] NAME \[<em>PARENTID</em>\]  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>TARGET</em> <em>Ordner</em> <em>löschen</em> \[<em>-a</em>\] \[--clear\] <em>FOLDERSPEC</em>  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>TARGET</em> <em>Ordner</em> <em>suchen</em> \[<em>-x</em>\] <em>NAME</em> \[<em>ID</em>\]  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>ZIEL</em> <em>Ordner</em> <em>Berechtigung</em> \[<em>-f</em>\] \[<em>-r</em>\] <em>ID</em> <em>BENUTZERNAME</em> <em>BERECHTIGUNG</em> \[<em>BERECHTIGUNG</em> …\]  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>ZIEL</em> <em>Ordner</em> <em>Liste</em> \[<em>-r</em>\] \[<em>--format FORMAT</em>\] \[<em>ID</em>\]  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>TARGET</em> <em>Ordner</em> <em>widerrufen</em> \[<em>-r</em>\] <em>ID</em> <em>BENUTZERNAME</em> \[<em>BERECHTIGUNG</em> …\]  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>ZIEL</em> <em>speichern</em> <em>löschen</em> <em>PROPSPEC</em> \[<em>PROPSPEC</em> ...\]  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>TARGET</em> <em>store</em> <em>get</em> \[<em>--format FORMAT</em>\] \[<em>--separator SEPARATOR</em>\] \[<em>PROPSPEC</em> ...\]  
<strong>grommunio-admin</strong> <strong>exmdb</strong> <em>TARGET</em> <em>store</em> <em>set</em> \[<em>PROPSPEC=VALUE</em> ...\]

### Beschreibung

Unterbefehl zum Zugriff auf und zur Bearbeitung des Speichers einer Domäne oder eines Benutzers über das exmdb-Protokoll.

### Befehle

#### Unterbefehl „Ordner“

`create`  
Neuen Ordner erstellen

`delete`  
Ordner anhand der ID oder des Namens löschen.

`find`  
Ordner mit einem bestimmten Namen suchen

`grant`  
Einem Benutzer Berechtigungen für diesen Ordner erteilen

`list`  
Zeigt die Unterordner eines Ordners an. Wenn keine Ordner-ID angegeben wird, werden die Unterordner des Stammordners angezeigt.

`revoke`  
Entziehen Sie einem Benutzer die Berechtigungen für diesen Ordner. Wenn keine Berechtigung angegeben wird, werden alle Berechtigungen entzogen.

#### Unterbefehl „Speichern“

`delete`  
Eigenschaften löschen

`get`  
Laden-Eigenschaften abrufen

`set`  
Speichereigenschaften festlegen

### Optionen

`ID`  
ID des Ordners

`FOLDERSPEC`  
ID oder Name des Ordners

`NAME`  
Name des Ordners

`PARENTID`  
ID des übergeordneten Ordners

`PERMISSION`  
Name oder numerischer Wert der Berechtigung

`PROPSPEC`  
Name oder numerischer Wert der Eigenschaft

`TARGET`  
Name der Domain oder E-Mail-Adresse des Benutzers

`USERNAME`  
E-Mail-Adresse eines Benutzers

`-a`, `--all`  
Nicht anhalten, wenn das Ziel unklar ist, sondern auf alle anwenden.

`--clear`  
Ordnerinhalt löschen. Erforderlich bei nicht leeren Ordnern.

`--comment COMMENT`  
Kommentar zum Ordner

`-f`, `--force`  
Berechtigungen für einen nicht vorhandenen Benutzer erteilen

`--format FORMAT`  
Ausgabeformat. Kann einer der folgenden Werte sein: <em>csv</em>, <em>json-flat</em>, <em>json-kv</em>, <em>json-object</em>, <em>json-structured</em> und <em>pretty</em>. Die Standardeinstellung ist <em>pretty</em>.

`-r`, `--recursive`  
Rekursiv auf Unterordner anwenden

`--separator SEPARATOR`  
Zeichenfolge zur Spaltentrennung (nur bei <em>csv</em> und <em>pretty</em>). Muss die Länge 1 haben, wenn das Format <em>csv</em> ist. Der Standardwert ist „,“ für <em>csv</em> und „ “ für „pretty“.

`-t TYPE`, `--type TYPE`  
<em>CONTAINERCLASS</em>-Eigenschaft, Standardwert ist <em>„IPF.Note“</em>

`-x`, `--exact`  
Es werden nur exakte Übereinstimmungen mit Ordnernamen berücksichtigt, nicht jedoch Teilzeichenfolgen, bei denen Groß- und Kleinschreibung nicht berücksichtigt wird.

### Anmerkungen

- Ordner-IDs und Berechtigungen können in dezimaler, hexadezimaler (<em>0x</em>-Präfix), oktaler (<em>0</em>-Präfix) oder binär (<em>0b</em>-Präfix) angegeben werden.
- Derzeit entspricht der von den Befehlen <em>grant</em> und <em>revoke</em> ausgegebene Berechtigungswert dem an den Server gesendeten Wert und kann daher von dem tatsächlich zugewiesenen Wert abweichen.
- Die Befehle <em>create</em>, <em>find</em> und <em>list</em>-Befehle wirken auf die <em>IPMSUBTREE</em>-Ordner (<em>0x9</em> für Benutzer, <em>0x2</em> für Domänen) und können über den Parameter <em>ID</em> überschrieben werden.

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-domain</strong>(1), <strong>grommunio-admin-Dienst</strong>(1), <strong>grommunio-admin-Benutzer</strong>(1)
