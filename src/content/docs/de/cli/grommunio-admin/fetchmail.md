---
title: "grommunio-admin fetchmail"
description: "grommunio-admin fetchmail — fetchmail-Einstellungen verwalten und rc-Datei erstellen"
sidebar:
  label: "fetchmail"
  order: 10
---

### Name

grommunio-admin fetchmail — fetchmail-Einstellungen verwalten und rc-Datei erstellen

### Zusammenfassung

<strong>grommunio-admin fetchmail</strong> <strong>create</strong> \[<em>\<FIELDS\></em>\] <em>--srcPassword PASSWORD</em> <em>--srcServer SERVER</em> <em>--srcUser USER</em> <em>USERSPEC</em> \[<em>MAILBOX</em>\]  
<strong>grommunio-admin fetchmail</strong> <strong>delete</strong> \[<em>-y</em>\] <em>MBSPEC</em>  
<strong>grommunio-admin fetchmail</strong> <strong>list</strong> \[<em>-f FILTER</em>\] \[<em>-s SORT</em>\] \[<em>MBSPEC</em>\]  
<strong>grommunio-admin fetchmail</strong> <strong>modify</strong> \[<em>\<FIELDS\></em>\] <em>MBSPEC</em>  
<strong>grommunio-admin fetchmail</strong> <strong>print</strong> \[<em>-q</em>\] <em>MBSPEC</em>  
<strong>grommunio-admin fetchmail</strong> <strong>show</strong> \[<em>--password</em>\] <em>MBSPEC</em>  
<strong>grommunio-admin fetchmail</strong> <strong>write-rc</strong> \[<em>--force</em>\] \[<em>-o DATEI</em>\] \[<em>-p</em>\] \[<em>-t MINUTES</em>\] \[<em>-v</em>\]

### Beschreibung

Unterbefehl zum Anzeigen und Bearbeiten von Fetchmail-Einträgen sowie zum Erstellen der Datei „fetchmailrc“.

### Befehle

`create`  
Einen neuen fetchmail-Eintrag erstellen

`delete`  
Fetchmail-Eintrag löschen

`list`  
fetchmail-Einträge auflisten

`modify`  
Fetchmail-Eintrag bearbeiten

`print`  
Die durch den Eintrag generierte Konfigurationszeile für fetchmail ausgeben

`show`  
Detaillierte Informationen zum fetchmail-Eintrag anzeigen

`write-rc`  
Konfigurationsdatei für fetchmail (fetchmailrc) erstellen

### Optionen

`MAILBOX`  
E-Mail-Adresse des lokalen Postfachs, an das die E-Mails zugestellt werden sollen. Standardmäßig ist dies die E-Mail-Adresse des angegebenen Benutzers.

`MBSPEC`  
Präfix oder ID des Postfachs im Fetchmail-Eintrag

`USERSPEC`  
Benutzernamenpräfix oder ID des Benutzers, dem der Eintrag zugeordnet werden soll

`-f FIELD=<value>`, `--filter FIELD=<value>`  
Filterausdruck in der Form „Feld=Wert“. Kann mehrfach angegeben werden, um den Filter zu verfeinern

`--force`  
Die rc-Datei schreiben, auch wenn seit dem letzten Schreibvorgang keine Einträge geändert wurden

`-o`, `--out-file`  
Pfad, in den die Konfiguration geschrieben werden soll. Der Standardwert lautet <em>/etc/fetchmailrc</em>

`--password`  
Das Quellpasswort ausdrucken

`-p`, `--print`  
Zusätzlich die RC-Datei auf die Standardausgabe ausgeben

`-q`, `--quiet`  
Keine zusätzlichen Informationen drucken

`-s FIELD`, `--sort FIELD`  
Nach Feld sortieren. Kann mehrfach angegeben werden.

`-t`, `--time`  
Zeit in Minuten seit dem letzten Schreibvorgang. Standardmäßig erfolgt die automatische Erkennung anhand des mtime-Zeitstempels der Datei.

`-v`, `--verbose`  
Ausführlicher sein

`-y`, `--yes`  
Mehrere Einträge ohne Bestätigungsabfrage löschen

### Felder

`--active STATE`  
Gibt an, ob der Eintrag aktiv ist. STATE kann einen der Werte <em>0</em>, <em>1</em>, <em>yes</em> oder <em>no</em> annehmen. Der Standardwert ist 1

`--extraOptions EXTRAOPTIONS`  
Durch Leerzeichen getrennte Liste von Optionen, die in die fetchmailrc-Datei geschrieben werden sollen

`--fetchall STATE`  
Ob E-Mails, die auf dem Quellserver als gelesen markiert sind, abgerufen werden sollen. STATE kann einen der Werte <em>0</em>, <em>1</em>, <em>ja</em> oder <em>nein</em> annehmen. Der Standardwert ist 0

`--keep STATE`  
Ob abgerufene E-Mails auf dem Quellserver verbleiben sollen. STATE kann einer der folgenden Werte sein: <em>0</em>, <em>1</em>, <em>yes</em> oder <em>no</em>. Standardwert ist 1

`--protocol PROTOCOL`  
Für den Abruf zu verwendendes Protokoll. Kann einer der folgenden Werte sein: <em>POP3</em>, <em>IMAP</em>, <em>POP2</em>, <em>ETRN</em> oder <em>AUTO</em>. Der Standardwert ist IMAP

`--srcAuth AUTH`  
Zu verwendende Authentifizierungsmethode. Kann einer der folgenden Werte sein: <em>password</em>, <em>kerberos_v5</em>, <em>kerberos</em>, <em>kerberos_v4</em>, <em>gssapi</em>, <em>cram-md5</em>, <em>otp</em>, <em>ntlm</em>, <em>msn</em>, <em>ssh</em>, <em>any</em>. Der Standardwert ist „password“

`--srcFolder FOLDER`  
Quellordner, aus dem die Daten abgerufen werden sollen

`--srcPassword PASSWORD`  
Passwort des Quellbenutzers. Einfache (<em>'</em>) und doppelte (<em>"</em>) Anführungszeichen werden automatisch entfernt.

`--srcServer SERVER`  
Quellserver, von dem die Daten abgerufen werden sollen

`--srcUser USER`  
Quellbenutzer, von dem E-Mails abgerufen werden sollen

`--sslCertCheck STATE`  
Ob die Überprüfung des SSL-Zertifikats erzwungen werden soll. STATE kann einen der Werte <em>0</em>, <em>1</em>, <em>yes</em> oder <em>no</em> annehmen. Standardwert ist 0

`--sslCertPath SSLCERTPATH`  
Pfad zu einem Verzeichnis, das vertrauenswürdige Zertifikate enthält, oder leer lassen, um die Systemstandardwerte zu verwenden

`--useSSL STATE`  
SSL aktivieren

### Siehe auch

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-user</strong>(1)
