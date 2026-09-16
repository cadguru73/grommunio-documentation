---
title: "Version grommunio-admin"
description: "Version grommunio-admin – Backend und/oder Version API anzeigen"
sidebar:
  label: "version"
  order: 10
---

### Name

Version grommunio-admin – Backend und/oder Version API anzeigen

### Zusammenfassung

<strong>grommunio-admin Version</strong> \[<em>-a</em>\] \[<em>-b</em>\] \[<em>-c</em>\]

### Beschreibung

Zeige die aktuelle Version des API (Spezifikation) oder des Backends (Code) an.  
Im kombinierten Modus (Standard) wird die Differenz zwischen der Backend- und der API-Version an das Ende der API-Version angehängt.

Wenn mehrere Optionen angegeben werden, wird jede angeforderte Version in einer eigenen Zeile ausgegeben. Die Reihenfolge lautet stets API – Backend – kombiniert.

### Optionen

`-a`, `--api`  
API-Version drucken

`-b`, `--backend`  
Version des Druck-Backends

`-c`, `--combined`  
Kombinierte Version drucken

### Siehe auch

<strong>grommunio-admin</strong>(1)
