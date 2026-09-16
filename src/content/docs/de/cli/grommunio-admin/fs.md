---
title: "grommunio-admin fs"
description: "grommunio-admin fs — Files-Systemoperationen"
sidebar:
  label: "fs"
  order: 10
---

### Name

grommunio-admin fs — Files-Systemoperationen

### Zusammenfassung

<strong>grommunio-admin fs</strong> <strong>clean</strong> \[<em>-d</em>\] \[<em>-s</em>\] \[<em>PARTITION</em>\]  
<strong>grommunio-admin fs</strong> <strong>du</strong> \[<em>PARTITION</em>\]

### Beschreibung

Den von Benutzer- und Domänen-Home-Verzeichnissen belegten Speicherplatz anzeigen oder nicht verwendete Dateien entfernen.

Wenn Benutzer oder Domänen gelöscht werden, ohne dass ihre Dateien entfernt werden, können ungenutzte Dateien zurückbleiben.

### Befehle

`clean`  
Verzeichnisse und Dateien entfernen, die von keiner Domain und keinem Benutzer verwendet werden.

`du`  
Statistik zur Datennutzung anzeigen

### Optionen

`PARTITION`  
Nur auf die ausgewählte Partition anwenden. Kann entweder <em>domain</em> oder <em>user</em> sein.

`-d`, `--dryrun`  
Nichts löschen, sondern nur das ausdrucken, was gelöscht würde

`-s`, `--nostat`  
Keine Statistiken zur Festplattennutzung gelöschter Dateien erfassen

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-Domäne</strong>(1), <strong>grommunio-admin-Benutzer</strong>(1)
