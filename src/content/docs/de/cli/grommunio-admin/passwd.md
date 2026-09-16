---
title: "grommunio-admin passwd"
description: "grommunio-admin passwd — Benutzerkennwort festlegen"
sidebar:
  label: "passwd"
  order: 10
---

### Name

grommunio-admin passwd — Benutzerkennwort festlegen

### Zusammenfassung

<strong>grommunio-admin passwd</strong> \[<em>-a</em>\] \[<em>-l LÄNGE</em>\] \[<em>-p PASSWORT</em>\] \[<em>BENUTZER</em>\]

### Beschreibung

Benutzerkennwort festlegen.  
Wenn kein Benutzer angegeben wird, wird das Kennwort für den Benutzer <em>admin</em> festgelegt, der bei Bedarf automatisch angelegt wird.  
Wenn weder <em>-a</em> noch <em>-p</em> angegeben wird, wird der Benutzer zur Eingabe eines Passworts aufgefordert.

### Optionen

`USER`  
Benutzer muss Passwort festlegen (Standard: <em>admin</em>)

`-a`, `--auto`  
Passwort automatisch generieren

`-l LENGTH`, `--length LENGTH`  
Länge des automatisch generierten Passworts (Standard: 16)

`-p PASSWORD`, `--password PASSWORD`  
Einzurichtendes Passwort (keine Abfrage)

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-user</strong>(1)
