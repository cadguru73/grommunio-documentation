---
title: "grommunio-admin"
description: "grommunio-admin — grommunio (Admin) CLI"
sidebar:
  label: "Übersicht"
  order: 0
---

### Name

grommunio-admin — grommunio (Admin) CLI

### Zusammenfassung

<strong>grommunio-admin</strong> <em>-h</em>  
<strong>grommunio-admin</strong> <em>COMMAND</em> \[<em>-h</em> \| <em>ARGS…</em>\]

### Beschreibung

Befehlszeilenschnittstelle des grommunio Admin und des API.

Das CLI ist nicht dafür vorgesehen, den vollen Funktionsumfang der REST-Schnittstelle bereitzustellen, sondern dient vielmehr als Low-Level-Verwaltungstool.  
Da sich das CLI noch in der Entwicklung befindet, wird von der Verwendung in automatisierten Skripten generell abgeraten.

Die Option <em>-h</em>/\*--help\* wird nicht für jeden Unterbefehl separat dokumentiert, ist jedoch jederzeit gültig und gibt Informationen zur Verwendung des aktuellen Unterbefehls aus.

Der CLI unterstützt die Farbausgabe, sofern das Modul „<em>termcolor</em>“ installiert ist.

### Befehle

#### Konfiguration

Konfigurationsanalyse. Siehe <em>grommunio-admin-config(1)</em>.

#### Verbinden

Verbindung zum entfernten CLI herstellen. Siehe <em>grommunio-admin-connect(1)</em>

#### dbconf

In einer Datenbank gespeicherte Konfigurationsverwaltung. Siehe <em>grommunio-admin-dbconf(1)</em>.

#### Domäne

Domänenverwaltung. Siehe <em>grommunio-admin-domain(1)</em>.

#### exmdb

Auf Domänen- und Benutzerspeicher zugreifen und diese bearbeiten. Siehe <em>grommunio-admin-exmdb(1)</em>.

#### fetchmail

Verwaltung von Fetchmail. Siehe <em>grommunio-admin-fetchmail(1)</em>.

#### fs

Filesystem-Funktionen. Siehe <em>grommunio-admin-fs(1)</em>.

#### ldap

Konfiguration, Diagnose und Synchronisierung von LDAP. Siehe <em>grommunio-admin-ldap(1)</em>.

#### mconf

Bearbeitung verwalteter Konfigurationen. Siehe <em>grommunio-admin-mconf(1)</em>.

#### mlist

Verwaltung von Mailinglisten und Verteilerlisten. Siehe <em>grommunio-admin-mlist(1)</em>.

#### passwd

Verwaltung von Benutzerkennwörtern. Siehe <em>grommunio-admin-passwd(1)</em>.

#### Ausführen

Führen Sie das Programm REST API aus. Siehe <em>grommunio-admin-run(1)</em>.

#### Server

Konfiguration mit mehreren Servern. Siehe <em>grommunio-admin-server(1)</em>

#### Dienstleistung

Schnittstelle zur Steuerung externer Dienste. Siehe <em>grommunio-admin-service(1)</em>

#### shell

Interaktive Shell starten. Siehe <em>grommunio-admin-shell(1)</em>.

#### taginfo

Informationen zu Proptags ausgeben. Siehe <em>grommunio-admin-taginfo(1)</em>.

#### Benutzer

Benutzerverwaltung. Siehe <em>grommunio-admin-user(1)</em>.

#### Version

Versionsinformationen anzeigen. Siehe <em>grommunio-admin-version(1)</em>.

### Siehe auch

<strong>grommunio-dbconf</strong>(1)
