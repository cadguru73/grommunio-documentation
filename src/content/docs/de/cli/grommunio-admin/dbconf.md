---
title: "grommunio-admin dbconf"
description: "grommunio-admin dbconf — Verwaltung datenbankgestützter Konfigurationen."
sidebar:
  label: "dbconf"
  order: 10
---

### Name

grommunio-admin dbconf — Verwaltung datenbankgestützter Konfigurationen.

### Zusammenfassung

<strong>grommunio-admin dbconf</strong> (<em>commit</em> \| <em>delete</em>) <em>SERVICE</em> \[<em>FILE</em> \[<em>KEY</em>\]\]  
<strong>grommunio-admin dbconf</strong> <em>get</em> <em>SERVICE</em> <em>FILE</em> \[<em>KEY</em>\]  
<strong>grommunio-admin dbconf</strong> <em>list</em> \[<em>SERVICE</em> \[<em>FILE</em> \[<em>KEY</em>\]\]\]  
<strong>grommunio-admin dbconf</strong> <em>set</em> \[<em>-b</em>\] \[<em>-i</em>\] \[--\] <em>SERVICE</em> <em>FILE</em> <em>KEY</em> <em>VALUE</em>

### Beschreibung

<em>grommunio dbconf</em> bietet die Möglichkeit, Konfigurationen an einem einzigen Ort zu speichern und zu verwalten und sie gleichzeitig in verteilten Systemen verfügbar zu machen. Die Konfigurationen werden in der zentralen MySQL-Datenbank gespeichert und können über <em>grommunio-dbconf(1)</em> und <em>grommunio-admin-dbconf(1)</em> abgerufen werden.  
Obwohl beide Tools im Wesentlichen die gleiche Funktionalität bieten, weist <em>grommunio-dbconf(1)</em> eine deutlich bessere Leistung auf und ist für den schnellen Zugriff auf die Konfiguration vorgesehen.

Konfigurationen bestehen aus Schlüssel-Wert-Paaren, die in Dateien organisiert und nach Diensten gruppiert sind. Jeder Dienst kann eine beliebige Anzahl von Konfigurationsdateien haben, die wiederum eine beliebige Anzahl eindeutiger Schlüssel enthalten können.

### Befehle

`commit`  
Commit-Hook für einen Dienst, eine Datei oder einen Schlüssel auslösen

`delete`  
Dienst, Datei oder Schlüssel löschen

`get`  
Datei oder einzelnen Schlüssel abrufen

`list`  
Verfügbare Dienste, Dateien oder Schlüssel auflisten

`set`  
Konfigurationsschlüssel festlegen

### Optionen

`SERVICE`  
Name des zu konfigurierenden Dienstes

`FILE`  
Name der Konfigurationsdatei

`KEY`  
Name des Konfigurationsschlüssels

`VALUE`  
Im Schlüssel zu speichernder Wert

`--`  
Gibt an, dass alle Optionen angegeben wurden und nun nur noch Namen folgen

`-b`, `--batch`  
Nicht automatisch festschreiben

`-i`, `--init`  
Nur setzen, wenn der Konfigurationsschlüssel noch nicht vorhanden ist

### grommunio-admin

Auch die Modelle grommunio-admin, API und CLI sind dbconf-Nutzer. Dadurch können Systemadministratoren bestimmte Konfigurationen ändern, ohne auf das Dateisystem zugreifen zu müssen und ohne dass ein Neustart des API erforderlich ist.

Die folgenden Dateien und Schlüssel sind aussagekräftig, wenn sie unter dem Dienst <em>grommunio-admin</em> abgelegt werden:

#### Mehrserver-Konfiguration

`policy`  
Richtlinie zur Serverauswahl für neu erstellte Benutzer und Domänen in Umgebungen mit mehreren Servern. Mögliche Werte sind <em>balanced</em>, <em>first</em>, <em>last</em>, <em>random</em> und <em>round-robin</em>. Die Standardeinstellung ist <em>round-robin</em>.

### Commit-Hooks

Beim Ändern von Werten können potenzielle Nutzer über Commit-Hooks über diese Änderung informiert werden, beispielsweise durch einen Neustart des Dienstes unter Verwendung der Konfiguration. Aus Sicherheitsgründen stehen nur wenige Befehle auf der Whitelist zur Verfügung (siehe Abschnitt <em>VERFÜGBARE COMMIT-BEFEHLE</em>).

Commit-Hooks können auf den Ebenen `key`, `file` oder `service` definiert werden. <em>set</em>-Operationen lösen immer Commits auf Schlüsselebene aus, während der Befehl <em>commit</em> je nachdem, ob eine Datei oder ein Schlüssel angegeben ist, direkt Hooks auf Schlüssel- oder Dienstebene auslösen kann.

Wenn für eine bestimmte Auslösestufe kein Hook definiert ist, wird automatisch die nächstniedrigere Stufe in der Reihenfolge <em>key</em> \> <em>file</em> \> <em>service</em>.

Commit-Hooks für einen Dienst können durch die Einstellung der Schlüssel `commit_key`, `commit_file` und `commit_service` unter <em>grommunio-dbconf/\<service\></em> auf einen gültigen Befehl gesetzt werden (siehe unten).

### Verfügbare Commit-Befehle

Die folgenden Befehle stehen zur Verfügung:

#### Schlüssel

`postconf -e $ENTRY`

#### Datei

`postconf -e $FILE_S && systemctl reload postfix`

#### Service

`systemctl reload $SERVICE`  
`systemctl restart $SERVICE`

### Makros

Da es schwierig sein kann, sich die Befehle auf der Whitelist zu merken, und diese sich in Zukunft ändern können, stehen Makros zur Verfügung, die zu Befehlen auf der Whitelist erweitert werden.

Die folgenden Makros sind definiert:

#### Schlüssel

`#POSTCONF` -\> `postconf -e $ENTRY`

#### Datei

`#POSTCONF` -\> `sudo postconf -e $FILE_S && systemctl reload postfix`

#### Service

`#RELOAD` -\> `systemctl reload $SERVICE`  
`#RESTART` -\> `systemctl restart $SERVICE`

### Erweiterung von Befehlsvariablen

Befehle können Variablen enthalten, denen ein Präfix in der Form <em>\$</em> vorangestellt ist und die vor der Ausführung ersetzt werden. Das Literal <em>\$\$</em> kann verwendet werden, um ein einzelnes <em>\$</em> zu erzeugen.

Die folgenden Variablen sind zulässig:

`ENTRY`  
Wird zu `$KEY=$VALUE` erweitert (nur auf Schlüsselebene)

`FILE`  
Der gesamte Inhalt der geänderten Datei als durch Zeilenumbrüche getrennte Schlüssel-Wert-Einträge (nur auf Dateiebene)

`FILE_S`  
Der gesamte Inhalt der geänderten Datei als durch Leerzeichen getrennte Schlüssel-Wert-Einträge (nur auf Dateiebene)

`FILENAME`  
Name der geänderten Datei (Schlüssel- und Dateiebene)

`KEY`  
Der geänderte Schlüssel (nur auf Schlüsselebene)

`SERVICE`  
Name des geänderten Dienstes

`VALUE`  
Neuer Wert des geänderten Schlüssels (nur auf Schlüsselebene)

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-config</strong>(1), <strong>grommunio-admin-mconf</strong>(1). <strong>grommunio-dbconf</strong>(1)
