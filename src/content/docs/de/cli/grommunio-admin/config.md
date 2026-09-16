---
title: "grommunio-admin-Konfiguration"
description: "grommunio-admin-Konfiguration — grommunio-admin-Konfigurationsauswertung"
sidebar:
  label: "config"
  order: 10
---

### Name

grommunio-admin-Konfiguration — grommunio-admin-Konfigurationsanalyse

### Zusammenfassung

<strong>grommunio-admin Konfiguration</strong> <em>Prüfung</em>  
<strong>grommunio-admin Konfiguration</strong> (<em>Dump</em>\|\*Get\*) \[<em>KEY</em>\]  
<strong>grommunio-admin Konfiguration</strong> <em>Trace</em> <em>\[-s\]</em> (<em>files</em>\|\*values\*) \[<em>KEY</em>\]

### Befehle

#### check

Überprüfen Sie die strukturelle Gültigkeit der Konfiguration.  
Die semantische Integrität, d. h. das Vorhandensein referenzierter Dateien, LDAP oder Datenbankverbindungen usw., wird derzeit nicht überprüft, obwohl diese Funktionalität möglicherweise in Zukunft hinzugefügt wird.

#### dump, get

Die vollständige Konfiguration ausgeben.  
Da die Konfiguration des grommunio-admin auf mehrere Dateien verteilt sein kann (und wahrscheinlich auch sein wird), bietet der Befehl „get“ eine einfache Möglichkeit, die aktuell gültige Konfiguration anzuzeigen.  
Die Ausgabe kann auf ein einzelnes <em>KEY</em> reduziert werden, sofern dies angegeben wird. Unterebenen können in Punktnotation angegeben werden (z. B. `sync.defaultPolicy`).  
Der Befehl <em>dump</em> ist ein Alias für <em>get</em> und wird aus Gründen der Abwärtskompatibilität beibehalten.

#### Trace

Quelle der effektiven Konfiguration ermitteln.  
Die Ergebnisse können entweder nach Datei (`files`) dargestellt werden, wobei angezeigt wird, welche Teile einer Datei tatsächlich verwendet werden, oder nach Wert (`values`), wobei angezeigt wird, aus welcher Datei der jeweilige Wert stammt.  
Für eine besser lesbare Ausgabe wird die Installation des Python-Pakets `termcolor` empfohlen. Weitere Informationen finden Sie im Abschnitt <em>Tracing</em>.

### Optionen

`KEY`  
Nur den angegebenen Schlüssel anzeigen.

`-s`, `--show-history`  
Weitere Werte aus dem Verlauf anzeigen (weitere Informationen finden Sie im Abschnitt <em>Verfolgung</em>)

### Nachverfolgung

#### Nach Datei

Den kommentierten Inhalt jeder Datei ausdrucken.  
Jede Zeile ist gekennzeichnet und farblich markiert, um ihren Status anzuzeigen. Dabei werden folgende Anmerkungen verwendet:

- <em>+</em>, grün: Der Wert ist Teil der endgültigen Konfiguration
- <em>x</em>, rot: Der Wert wird durch eine spätere Datei überschrieben
- <em>\*</em>, gelb: Das Objekt oder die Liste wird durch eine spätere Datei erweitert
- <em>~</em>, grau: Der Wert wird durch denselben Wert überschrieben

Zudem werden Zeilen, die frühere Einträge überschreiben oder ergänzen, fett gedruckt.  
Bei Angabe von <em>--show-history</em> wird jeder Wert, der überschrieben oder ergänzt wird, mit den entsprechenden Dateien gekennzeichnet (wobei jede Datei farblich entsprechend ihrer Auswirkung auf den Wert gekennzeichnet ist).

#### Wertübertragung

Kommentierte effektive Konfiguration ausgeben.  
Jede Zeile ist mit dem Namen der Datei versehen, aus der sie stammt. Bei Objekten und Listen werden alle beteiligten Dateien aufgelistet.  
Bei Angabe von <em>--show-history</em> werden auch überschriebene Dateien, die diesen Wert enthalten, aufgelistet. Die effektive Quelldatei ist unterstrichen.  
Zur besseren Übersicht erfolgt eine farbliche Kennzeichnung auf Dateiebene: Jeder Datei wird ein individueller Stil zugewiesen, der für ihre Beiträge verwendet wird. Objekte und Listen, die aus mehreren Dateien stammen, werden stets fett und in Weiß dargestellt.

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-dbconf</strong>(1), <strong>grommunio-admin-mconf</strong>(1)
