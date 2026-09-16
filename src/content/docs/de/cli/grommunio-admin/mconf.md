---
title: "grommunio-admin mconf"
description: "grommunio-admin mconf — Verwaltete Konfigurationsbearbeitung"
sidebar:
  label: "mconf"
  order: 10
---

### Name

grommunio-admin mconf — Verwaltete Konfigurationsbearbeitung

### Zusammenfassung

<strong>grommunio-admin mconf</strong> <strong>dump</strong> \[<em>-c</em>\] <em>CONFIG</em>  
<strong>grommunio-admin mconf</strong> <strong>modify</strong> <em>CONFIG</em> <em>unset</em> <em>KEY</em>  
<strong>grommunio-admin mconf</strong> <strong>modify</strong> <em>CONFIG</em> <em>ACTION</em> \[<em>-i</em> \| <em>-b</em>\] <em>SCHLÜSSEL</em> <em>WERT</em>  
<strong>grommunio-admin mconf</strong> <strong>print</strong> <em>CONFIG</em>  
<strong>grommunio-admin mconf</strong> <strong>reload</strong> <em>CONFIG</em>  
<strong>grommunio-admin mconf</strong> <strong>speichern</strong> <em>CONFIG</em>

### Beschreibung

Die verwaltete Konfiguration (mconf) von grommunio bietet die Möglichkeit, die von gromox verwendeten Konfigurationsdateien zu bearbeiten.

### Befehle

`dump`  
Druckkonfigurationsdatei, die aus dem internen Zustand generiert würde

`modify`  
Internen Konfigurationsstatus ändern

`print`  
Internen Konfigurationsstatus ausdrucken

`reload`  
Konfiguration von der Festplatte neu laden

`save`  
Konfigurationsdatei auf Festplatte speichern

### Optionen

`ACTION`  
Änderungsmaßnahme:

<em>add</em> – Eintrag zur Liste hinzufügen  
<em>remove</em> – Eintrag aus der Liste entfernen  
<em>set</em> – Schlüssel hinzufügen  
<em>unset</em> – Schlüssel entfernen

`CONFIG`  
Konfigurationsdatei, entweder <em>authmgr</em> oder <em>ldap</em>

`KEY`  
Konfigurationsschlüssel

`VALUE`  
Als Konfigurationswerte für numerische oder boolesche Werte verwenden Sie bitte <em>-b</em> bzw. <em>-i</em>

`-b`, `--bool`  
Wert in einen booleschen Wert umwandeln; gültige Werte sind <em>y</em>, <em>n</em>, <em>yes</em>, <em>no</em>, <em>true</em>, <em>false</em>, <em>1</em>, <em>0</em>

`-c`, `--censor`  
Vertrauliche Informationen ausblenden

`-i`, `--int`  
Wert in eine Ganzzahl umwandeln; dabei werden Oktal- (<em>0o</em>) und Hexadezimal- (<em>0x</em>) Präfixe unterstützt

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-config</strong>(1), grommunio-admin-dbconf\*\*(1),\*\*grommunio-admin-ldap\*\*(1)
