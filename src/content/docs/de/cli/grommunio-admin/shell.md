---
title: "grommunio-admin-Gehäuse"
description: "grommunio-admin-Shell – Interaktive Shell starten"
sidebar:
  label: "shell"
  order: 10
---

### Name

grommunio-admin-Shell – Interaktive Shell starten

### Zusammenfassung

<strong>grommunio-admin shell</strong> \[<em>-d</em>\] \[<em>-n</em>\] \[<em>-x</em>\]

### Beschreibung

Der interaktive Shell-Modus ermöglicht die Ausführung mehrerer (durch Zeilenumbrüche getrennter) Befehle in einer einzigen Sitzung. Die Befehlssyntax entspricht der der CLI-Argumente, ergänzt um den Befehl <em>exit</em>, der die interaktive Shell beendet.

Wenn möglich, wird der eingegebene Verlauf unter <em>~/.grommunio-admin.history</em> gespeichert.

### Optionen

`-d`, `--debug`  
Ausführlichere Debug-Ausgabe aktivieren

`-n`, `--no-history`  
Laden/Speichern des Eingabeverlaufs deaktivieren

`-x`, `--exit`  
Sofort beenden, wenn ein Befehl einen Exit-Code ungleich Null zurückgibt

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-connect</strong>(1)
