---
title: "grommunio-admin org"
description: "grommunio-admin org – Organisationsmanagement"
sidebar:
  label: "org"
  order: 10
---

### Name

grommunio-admin org – Organisationsmanagement

### Zusammenfassung

<strong>grommunio-admin org</strong> <strong>create</strong> \[<em>--description DESCRIPTION</em>\] \[<em>--domain DOMAIN</em> …\] <em>ORGNAME</em>  
<strong>grommunio-admin org</strong> <strong>delete</strong> <em>ORGSPEC</em>  
<strong>grommunio-admin org</strong> <strong>modify</strong> \[<em>\<FIELDS\></em>\] <em>ORGSPEC</em>  
<strong>grommunio-admin org</strong> <strong>query</strong> \[<em>-f ATTRIBUTE=\<value\></em>\] \[<em>--format FORMAT</em>\] \[<em>--separator SEPARATOR</em>\] \[<em>-s FIELD</em>\] \[<em>ATTRIBUTE</em> …\]  
<strong>grommunio-admin org</strong> <strong>show</strong> \[<em>-f FIELD=\<value\></em>\] \[<em>-s FIELD</em>\] <em>ORGSPEC</em>

### Beschreibung

Unterbefehl zum Anzeigen und Bearbeiten von Organisationen.

### Befehle

`create`  
Neue Organisation anlegen

`delete`  
Eine Organisation löschen

`modify`  
Organisation bearbeiten

`query`  
Attribute der Organisation abfragen

`show`  
Detaillierte Informationen zu einer Organisation anzeigen

### Optionen

`ATTRIBUTE`  
Zu abfragende Attribute. Verfügbare Attribute sind <em>ID</em>, <em>name</em>, <em>description</em> und <em>domainCount</em>

Wenn keine Attribute angegeben werden, werden <em>ID</em>, <em>name</em> und <em>domainCount</em> angezeigt.

`ORGNAME`  
Vollständiger Name der Organisation

`ORGSPEC`  
Präfix des Organisationsnamens oder Organisations-ID

`-f FIELD=<value>`, `--filter FIELD=<value>`  
Filterausdruck in der Form „Feld=Wert“. Kann mehrfach angegeben werden, um den Filter zu verfeinern

`--format FORMAT`  
Ausgabeformat. Kann einer der folgenden Werte sein: <em>csv</em>, <em>json-flat</em>, <em>json-kv</em>, <em>json-object</em>, <em>json-structured</em> und <em>pretty</em>. Die Standardeinstellung ist <em>pretty</em>.

`--separator SEPARATOR`  
Zeichenfolge zur Spaltentrennung (nur bei <em>csv</em> und <em>pretty</em>). Muss die Länge 1 haben, wenn das Format <em>csv</em> ist. Der Standardwert ist „,“ für <em>csv</em> und „ “ für „pretty“.

`-s FIELD`, `--sort FIELD`  
Nach Feld sortieren. Kann mehrfach angegeben werden.

`-y`, `--yes`  
Anstatt nachzufragen, wird „Ja“ angenommen

### Felder

`--description DESCRIPTION`  
Beschreibung der Organisation

`--domain DOMAINSPEC`  
Namenspräfix oder ID der zu übernehmenden Domain. Kann mehrfach angegeben werden.

`--name ORGNAME`  
Name der Organisation

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-Domäne</strong>(1), <strong>grommunio-admin-ldap</strong>(1)
