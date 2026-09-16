---
title: "Einstellungen"
description: "Konfigurieren Sie Ihr grommunio Web-Konto, einschließlich allgemeiner Einstellungen, E-Mail, S/MIME, Out of Office, Regeln, Kalender, Bevollmächtigte, mobile Geräte und mehr."
sidebar:
  order: 70
---

## Allgemeines

Folgende Optionen stehen zur Verfügung:

### 1. Kontoinformationen

![Account information panel showing profile picture, display name, email, language, startup folder, theme, and icons](/img/web/web-p070-1.png)

**Profilbild**
Hier können Sie Ihr Profilbild hochladen oder ändern.
Zu den unterstützten Formaten gehören gängige Bildformate (JPEG, GIF, PNG, BMP).

**Anzeigename**
Der Name, der anderen Benutzern angezeigt wird.

:::caution[Achtung]
Kann in grommunio Web nicht bearbeitet werden! Nur in der Admin-UI.
:::

**E-Mail**
Zeigt die primäre E-Mail-Adresse des Benutzers an.

![General settings continued: language, startup folder, theme, icons, and inbox navigation options](/img/web/web-p071-1.png)

Dieses Feld kann in grommunio Web nicht bearbeitet werden.

**Sprache**
Legt die Sprache der Benutzeroberfläche für grommunio Web fest.

Beispiel: `en_US – English`

Möglicherweise stehen weitere vom Server bereitgestellte Sprachen zur Verfügung.

**Startordner**
Legt fest, welches Modul nach der Anmeldung als Erstes geladen wird.

Zu den Optionen gehören:

- E-Mail
- Kalender
- Kontakte
- Aufgaben
- Notizen

**Design**
Legt das visuelle Design der Benutzeroberfläche fest.

Beispiel: `Basic`

**Symbole**
Wählt das von der Benutzeroberfläche verwendete Symbolpaket aus.

Optionen: `Breeze`, `Classic`

### 2. Navigation im Posteingang

Die Navigation im Posteingang legt fest, wie Elemente im Posteingang angezeigt und geladen werden.

Die Navigationsmethode kann aus den folgenden Optionen ausgewählt werden:

- **Infinite Scroll** (ausgewählt): Weitere Elemente werden automatisch geladen, wenn der Benutzer nach unten scrollt.
- **Paginierung**: Die Elemente werden auf separaten Seiten angezeigt, wobei Navigationselemente zum Wechseln zwischen den Seiten dienen.

Die Anzahl der Elemente, die gleichzeitig geladen oder pro Seite angezeigt werden, kann ebenfalls konfiguriert werden. Optionen: `50, 100, 150, 250, 1000`

### 3. Anzeige

![Display settings for date and time format, time format, favorite settings, and other display options](/img/web/web-p072-1.png)

Diese Einstellungen legen fest, wie Informationen in der Anwendung dargestellt werden und wie sie sich verhalten. Legen Sie fest, wie Datums- und Zeitangaben in der Benutzeroberfläche angezeigt werden sollen.

Legen Sie fest, wie die Uhrzeit selbst angezeigt wird.

### 4. Dateivorschau

![File previewing settings with attachment preview, document default zoom, and PDF zoom](/img/web/web-p072-2.png)

Legt fest, wie angehängte Dokumente angezeigt werden, wenn sie in der Weboberfläche geöffnet werden.

Wenn diese Option aktiviert ist, werden unterstützte Anhänge (wie PDF- und OpenDocument-Dateien) direkt im Browser geöffnet, anstatt zunächst heruntergeladen zu werden.

- **Standardzoom für Dokumente/PDFs**
  Legt den Zoomfaktor für Dokumente/PDFs in der Vorschau fest.
  Optionen: `Auto`, `Actual size`, `Page width`

### 5. Adressbuch

![Address Book setting with the Select Default Folder option](/img/web/web-p072-3.png)

Legt fest, welche Adressliste standardmäßig verwendet wird, wenn das Adressbuch geöffnet wird.

### 6. Nutzung des Postfachs

![Mailbox Usage panel displaying mailbox storage consumption](/img/web/web-p072-4.png)

Zeigt Informationen zum Speicherverbrauch der Postfächer an.

:::caution[Achtung]
Wenn in der Admin-UI kein Kontingent festgelegt ist, ist die Speichernutzung unbegrenzt.
:::

### 7. Einstellungen zurücksetzen

![Reset settings panel with a button to restore settings to their original defaults](/img/web/web-p073-1.png)

Ermöglicht die Wiederherstellung aller persönlichen Einstellungen auf ihre ursprünglichen Standardwerte, wie z. B. Favoriten, Layout, Plugins, Sprache usw.

### 8. Versionsangaben

![Version information panel showing grommunio Web and Gromox version numbers](/img/web/web-p073-2.png)

Enthält technische Versionsangaben zur Fehlerbehebung oder Administration.

## E-Mail

### 1. Allgemeine E-Mail-Einstellungen

![General mail settings: location of preview pane, where to open or compose a mail item, and close original message option](/img/web/web-p073-3.png)

Legt fest, wie E-Mails in der Weboberfläche angezeigt und geöffnet werden.

Die Position des Vorschaufensters bestimmt, ob und wo das Nachrichtenvorschaufenster angezeigt wird. Optionen: `No preview`, `Right`, `Bottom`

Wenn die Option *„Originalnachricht beim Antworten oder Weiterleiten schließen“* aktiviert ist, wird die ursprüngliche E-Mail nach dem Antworten oder Weiterleiten automatisch geschlossen.

### 2. Einstellungen für das Verfassen von E-Mails

![Compose mail settings including format, editor, default font, autosave, and Cc recipient management](/img/web/web-p073-4.png)

Legt die Standardwerte fest, die beim Erstellen neuer E-Mails verwendet werden.

- **E-Mail in diesem Format verfassen** – Legt das Standardformat für Nachrichten fest. *HTML* ermöglicht formatierten Text, Schriftarten und Farben. Optionen: `HTML`, `Plain Text`
- **Editor** – Wählt den Editor aus, der zum Verfassen von E-Mails verwendet wird. Der *TinyMCE-Editor* bietet eine Rich-Text-Bearbeitung (WYSIWYG).
- **Standardschriftart** – Legt die beim Verfassen von Nachrichten verwendete Schriftart fest.
- **Standardschriftgröße** – Legt die anfängliche Schriftgröße für neue E-Mails fest (zum Beispiel `11pt`).
- **Von Bevollmächtigten gesendete E-Mails speichern** – Legt fest, wo gesendete E-Mails gespeichert werden, wenn sie im Namen eines anderen Benutzers versendet werden. Optionen:
  - Sowohl im Ordner „Gesendete Objekte“ des Vertretenen als auch im Ordner „Gesendete Objekte“ des Bevollmächtigten
  - Nur im Ordner „Gesendete Objekte“ des Bevollmächtigten
  - Nur im Ordner „Gesendete Objekte“ des Vertretenen
- **Immer eine Lesebestätigung anfordern** – Wenn diese Option aktiviert ist, wird bei jeder ausgehenden Nachricht eine Lesebestätigung vom Empfänger angefordert.
- **Ungesendete E-Mails automatisch speichern alle** – Speichert Entwürfe automatisch in dem angegebenen Intervall (z. B. alle `1` Minuten), um Datenverlust zu verhindern.
- **Cc-Empfänger verwalten** – Ermöglicht die Konfiguration von Standard-Cc-Empfängern für:
  - Neue E-Mails
  - Antwort-E-Mails
  - Oder beides

  Um einen Empfänger hinzuzufügen, klicken Sie entweder auf **Adressbuch** oder auf die Schaltfläche **Hinzufügen…**.

  Standardmäßig wird der Empfänger für **Antwort-E-Mails** und **neue E-Mails** verwendet, was durch das grüne Häkchen-Symbol angezeigt wird. Dies kann durch Klicken auf das grüne Symbol geändert werden.

### 3. Eingehende E-Mails

Legt fest, wie eingehende Nachrichten verarbeitet und angezeigt werden.

- **So reagieren Sie auf Anfragen nach Lesebestätigungen** – Legt das Standardverhalten fest, wenn ein Absender eine Lesebestätigung anfordert.
  - Immer eine Antwort senden
  - Niemals eine Antwort senden
  - Vor dem Senden einer Antwort nachfragen
- **E-Mail automatisch als gelesen markieren, nachdem** – Markiert eine Nachricht als gelesen, nachdem sie für die angegebene Anzahl von Sekunden geöffnet war. `0` bedeutet sofort.
- **E-Mails in diesem Format anzeigen** – Legt fest, wie eingehende Nachrichten angezeigt werden. Optionen: `HTML`, `Plain Text`

### 4. Unterschriften

![Signatures panel for creating, editing, and assigning signatures to new messages and replies/forwards](/img/web/web-p074-1.png)

Mit grommunio Web können Benutzer mehrere E-Mail-Signaturen verwalten und dabei flexibel unterschiedliche Signaturen für neue Nachrichten sowie für Antworten und weitergeleitete E-Mails festlegen.

Um eine Signatur einzurichten und eine E-Mail-Signatur in grommunio Web zu erstellen oder zu ändern, gehen Sie wie folgt vor:

1. Scrollen Sie zu „Signaturen“ und klicken Sie auf **Neu**, um eine neue Signatur zu erstellen.
2. Geben Sie einen benutzerdefinierten Namen für die Signatur ein, um sie leichter identifizieren zu können.
3. Erstellen Sie eine Signatur mit einfachem Text, formatiertem Text oder HTML.
4. Klicken Sie anschließend auf die Schaltfläche **Signatur speichern**.
5. Wenn eine Signatur nicht mehr benötigt wird, wählen Sie die Signatur aus und klicken Sie auf **Löschen**.

#### Vorlagen für Signaturen

grommunio Web unterstützt dynamische Signaturattribute, die automatisch Informationen aus dem Benutzerprofil in die Signatur einfügen. Diese Attribute entsprechen den auf dem Server konfigurierten Kontodaten, wie beispielsweise Name, Telefonnummer, Firma und Berufsbezeichnung.

**Wichtig:** Die Verfügbarkeit der Attribute hängt von der Serverkonfiguration der Organisation ab. Wenn Sie weitere Attribute benötigen oder Änderungen an den verfügbaren Attributen vornehmen möchten, wenden Sie sich bitte an den Systemadministrator.

**So funktioniert es:** Attribute werden in geschweifte Klammern gesetzt und mit einem Prozentzeichen versehen, z. B. `{%attribute}`. Beim Verfassen einer E-Mail ersetzt grommunio Web diese Platzhalter durch die tatsächlichen Benutzerdaten. Wenn ein Attribut im Profil nicht konfiguriert ist, erscheint es nicht in der Signatur.

#### Platzhalter für Unterschriften

Die folgenden allgemeinen Attribute können in E-Mail-Signaturen verwendet werden:

- `{%firstname}` – Vorname
- `{%initials}` – Initialen
- `{%lastname}` – Nachname
- `{%displayname}` – Vollständiger Anzeigename
- `{%title}` – Berufsbezeichnung
- `{%company}` – Firmenname
- `{%department}` – Abteilung
- `{%office}` – Standort
- `{%assistant}` – Name des Assistenten
- `{%phone}` – Haupttelefonnummer
- `{%primary_email}` – Haupt-E-Mail-Adresse
- `{%address}` – Straße
- `{%city}` – Ort
- `{%state}` – Bundesland/Region
- `{%zipcode}` – Postleitzahl
- `{%country}` – Land
- `{%phone_business}` – Primäre geschäftliche Telefonnummer
- `{%phone_business2}` – Sekundäre geschäftliche Telefonnummer
- `{%phone_fax}` – Faxnummer
- `{%phone_assistant}` – Telefonnummer des Assistenten
- `{%phone_home}` – Primäre private Telefonnummer
- `{%phone_home2}` – Sekundäre private Telefonnummer
- `{%phone_mobile}` – Handynummer
- `{%phone_pager}` – Pager-Nummer

## S/MIME

![S/MIME settings showing personal certificate status, certificate upload, and public & private certificates list](/img/web/web-p075-1.png)

### 1. Persönliches Zertifikat

- **Zertifikatsstatus** – Gibt an, ob dem Konto ein gültiges persönliches Zertifikat zugeordnet ist. Ist kein Zertifikat vorhanden, können die Funktionen für sichere E-Mails (wie die Signatur oder Verschlüsselung mit S/MIME) nicht genutzt werden.
- **Passphrase für das letzte Zertifikat ändern** – Ermöglicht die Änderung der Passphrase des zuletzt hochgeladenen privaten Zertifikats. Diese Option ist nur verfügbar, wenn ein gültiges Zertifikat vorhanden ist.

### 2. Laden Sie Ihr Zertifikat hoch

- **Privates Zertifikat (PKCS#12-Format)** – Laden Sie Ihre persönliche Zertifikatsdatei hoch (in der Regel mit der Dateiendung `.p12` oder `.pfx`). grommunio Web akzeptiert nur gültige Zertifikate und speichert nur ein privates Zertifikat pro Benutzer.
- **Zertifikat-Passphrase** – Das Passwort, das die private Zertifikatsdatei schützt. Dies ist erforderlich, um das Zertifikat erfolgreich zu importieren.
- **Hochladen** – Importiert das ausgewählte Zertifikat nach dessen Überprüfung in grommunio Web.

### 3. Öffentliche und private Zertifikate

- **Zertifikatsliste** – Zeigt alle öffentlichen und privaten Zertifikate an, die auf dem Server für das Konto gespeichert sind.
  - **E-Mail** – Die mit dem Zertifikat verknüpfte E-Mail-Adresse.
  - **Gültig ab** – Startdatum des Gültigkeitszeitraums des Zertifikats.
  - **Läuft ab** – Ablaufdatum des Zertifikats.
  - **Typ** – Gibt an, ob es sich um ein öffentliches oder privates Zertifikat handelt.
- **Nach E-Mail filtern** – Filtert die Zertifikatsliste nach E-Mail-Adresse.
- **Entfernen** – Löscht das ausgewählte Zertifikat vom Server.
- **Details** – Zeigt detaillierte Informationen zum ausgewählten Zertifikat an.

## Out of Office

![Out of Office settings with status options and the automatic reply message editor](/img/web/web-p076-1.png)

### Einstellungen für Out of Office

- **Ich bin derzeit im Büro** – Deaktiviert die automatischen Antworten von Out of Office.
- **Ich bin ab dem** – Aktiviert die Antworten von Out of Office ab dem angegebenen Datum und der angegebenen Uhrzeit.
- **Ich bin wieder im Büro ab** – Legt optional das Datum und die Uhrzeit der Rückkehr fest, nach deren Ablauf die Out of Office-Antworten automatisch deaktiviert werden.

### Automatische Antwortnachricht

**Automatisch mit der folgenden Nachricht antworten** – Aktiviert automatische Antworten mit dem unten definierten Nachrichteninhalt. Die Häufigkeit der Antworten hängt von der Serverkonfiguration ab.

- **Innerhalb meiner Organisation** – Nachricht, die an Absender innerhalb Ihrer Organisation gesendet wird (interne Empfänger).
- **Außerhalb meiner Organisation** – Nachricht an externe Absender außerhalb Ihrer Organisation.
  - **Automatische Antwort an Personen außerhalb meiner Organisation** – Aktiviert automatische Antworten auf Nachrichten von Absendern außerhalb Ihrer Organisation.
  - **Nur meine Kontakte** – Sendet automatische Antworten nur an externe Absender, die in Ihren persönlichen Kontakten gespeichert sind.
  - **Alle Personen außerhalb meiner Organisation** – Sendet automatische Antworten an alle externen Absender, unabhängig davon, ob sie in Ihren Kontakten gespeichert sind.
- **Betreff** – Legt die Betreffzeile der automatischen Antwort fest (zum Beispiel *Out of Office*).
- **Nachrichtentext** – Der Inhalt der automatischen Antwortnachricht. Unterstützt formatierten Text (HTML), Schriftarten und grundlegende Formatierungen.

## Regeln

- **Regeln aktualisieren für** – Wählt das Postfach aus, für das E-Mail-Regeln verwaltet werden. *myself* wendet die Regeln auf das eigene Postfach an.
- **Neu** – Erstellt eine neue E-Mail-Regel.
- **Löschen** – Entfernt die ausgewählte E-Mail-Regel. Diese Option ist nur verfügbar, wenn eine Regel ausgewählt ist.
- **Bearbeiten** – Öffnet die ausgewählte E-Mail-Regel zur Bearbeitung. Diese Option ist nur verfügbar, wenn eine Regel ausgewählt ist.
- **Aktiv** – Zeigt an, ob eine Regel derzeit aktiviert ist. Über das Kontrollkästchen kann die Regel deaktiviert oder wieder aktiviert werden, ohne sie zu löschen.
- **Abwesenheit** – Zeigt an, ob die Regel mit der Out of Office-Funktionalität zusammenhängt.
- **Regel** – Zeigt den Namen oder die Beschreibung der E-Mail-Regel an.
- **Steuerelemente für die Reihenfolge der Regeln** – Ermöglicht die Änderung der Reihenfolge, in der die Regeln ausgewertet werden. Die Regeln werden von oben nach unten verarbeitet.

![Inbox Rule dialog showing fields for rule name, conditions, actions, exceptions, and the stop processing option](/img/web/web-p077-1.png)

Eine E-Mail-Regel besteht aus vier Hauptteilen:

1. Name der Regel – Nur eine Bezeichnung, damit Sie die Regel später wiedererkennen
2. Bedingungen – Wann die Regel ausgelöst werden soll
3. Aktionen – Was mit der Nachricht geschehen soll
4. Ausnahmen (optional) – Wann die Regel nicht gelten soll

### „Wenn die Nachricht…“ (Bedingungen)

Eine **Bedingung** legt fest, für welche E-Mails die Regel gilt. Eine Regel kann eine oder mehrere Bedingungen enthalten.

Mögliche Bedingungen:

- stammt von …
- enthält diese Wörter in der Absenderadresse …
- enthält diese Wörter in der Empfängeradresse …
- enthält diese Wörter im Betreff …
- enthält diese Wörter im Text …
- enthält diese Wörter in den Transport-Headern …
- hat den Wichtigkeitsgrad …
- enthält einen Anhang
- wird an … gesendet
- wird nur an mich gesendet
- enthält meinen Namen im Cc-Feld
- enthält meinen Namen nicht im „An“- oder Cc-Feld …
- enthält meinen Namen im „An“- oder „Cc“-Feld
- hat die Vertraulichkeitsstufe …
- wird nach … empfangen
- wird vor … empfangen
- hat eine Größe von mindestens …
- hat eine Größe von höchstens …
- enthält meinen Namen im „An“-Feld
- wird empfangen (alle Nachrichten)

### „Gehen Sie wie folgt vor…“ (Maßnahmen)

**Aktion** legt fest, was geschieht, wenn eine oder mehrere Bedingungen erfüllt sind. Eine Regel kann eine oder mehrere Aktionen enthalten.

Zu den verfügbaren Aktionen gehören:

- Nachricht in den Ordner „…“ verschieben
- Nachricht in den Ordner „…“ kopieren
- Nachricht löschen
- Nachricht umleiten an…
- Nachricht weiterleiten an…
- Nachricht als Anhang weiterleiten an…
- Nachricht als gelesen markieren…

### Ausnahmen

**Ausnahmen** verhindern, dass die Regel in bestimmten Fällen ausgeführt wird. Eine Regel kann eine oder mehrere Ausnahmen enthalten.

Mögliche Ausnahmen:

- stammt von …
- enthält diese Wörter in der Absenderadresse …
- enthält diese Wörter in der Empfängeradresse …
- enthält diese Wörter im Betreff …
- enthält diese Wörter im Text …
- enthält diese Wörter in den Transport-Headern …
- hat den Wichtigkeitsgrad …
- enthält einen Anhang
- wird an … gesendet
- wird nur an mich gesendet
- enthält meinen Namen im Cc-Feld
- enthält meinen Namen nicht im „An“- oder Cc-Feld …
- enthält meinen Namen im „An“- oder „Cc“-Feld
- hat die Vertraulichkeitsstufe …
- wird nach … empfangen
- wird vor … empfangen
- hat eine Größe von mindestens …
- hat eine Größe von höchstens …
- enthält meinen Namen im „An“-Feld

### „Keine weiteren Regeln mehr verarbeiten“

Wenn dieses Kontrollkästchen aktiviert ist:

Sobald diese Regel zutrifft, werden keine weiteren Regeln mehr angewendet.

Nützlich, wenn es sich bei dieser Regel um eine „endgültige“ Aktion handelt (z. B. Löschen oder Verschieben)

:::note [Bewährte Vorgehensweise]
Aktivieren Sie diese Option für Regeln mit hoher Priorität oder für Löschregeln. Lassen Sie das Kontrollkästchen deaktiviert, wenn andere Regeln weiterhin gelten sollen.
:::

### Beispiel

Bedingung: Der Absender fügt einen Newsletter bei

Aktion: Als gelesen markieren, in den Ordner „Newsletter“ verschieben

![Inbox Rule example for a Newsletter rule: received from newsletter@grommunio.com, marked as read and moved to the Newsletter folder, with stop processing enabled](/img/web/web-p079-1.png)

:::tip
1. Regeln werden nur auf neu eingehende E-Mails angewendet.
2. Regeln werden von oben nach unten ausgewertet, daher ist die Reihenfolge entscheidend.
3. Verwenden Sie die Option „Keine weiteren Regeln verarbeiten“, um Konflikte zu vermeiden.
4. Testen Sie Regeln zunächst mit einer einfachen Bedingung.
:::

## Kalender

![Calendar settings showing general calendar settings, calendar view settings, and reminder settings](/img/web/web-p081-1.png)

### 1. Allgemeine Kalendereinstellungen

**Erster Tag der Woche**
Legt den ersten Wochentag für Kalenderansichten fest.

Gängige Werte: `Monday` oder `Sunday`

**Arbeitsbeginn**
Legt die tägliche Arbeitsbeginnzeit für die Kalenderplanung fest.

Beispiel: `09:00`

**Ende des Arbeitstages**
Bezeichnet das Ende des Arbeitstages.

Beispiel: `17:00`

**Kalenderauflösung**
Legt die Größe des Zeitrasters für die Kalenderfelder fest.

Optionen: `5 minutes, 6 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour`

**Standarddauer für Termine**
Legt die Standarddauer für neue Termine fest.

Beispiel: `30 minutes`

**Standardstatus für ganztägige Termine**
Legt den Standardverfügbarkeitsstatus fest.

Mögliche Werte:

- Frei
- Vorläufig
- Belegt
- Out of Office

**Arbeitstage**
Legt fest, welche Tage als Teil der regulären Arbeitswoche gelten.

Beispiel: `Monday–Friday (Mo–Fr)`

### 2. Einstellungen für die Kalenderansicht

Wenn mehrere Kalender zur Anzeige ausgewählt sind (z. B. der eigene Kalender sowie freigegebene Team- oder Ressourcenkalender), stehen zwei Anzeigemodi zur Verfügung: „Nebeneinander“ und „Überlagert“.

1. **Side-by-Side-Modus** – Jeder Kalender wird in einer eigenen Spalte angezeigt. Die Zeitachse verläuft vertikal, während die Kalender horizontal nebeneinander angeordnet sind.
2. **Überlagerungsmodus** – Alle ausgewählten Kalender werden in einer einzigen Ansicht zusammengeführt. Termine aus verschiedenen Kalendern erscheinen im selben Zeitraster.

Termine werden in der Regel durch unterschiedliche Farben, Bezeichnungen oder Kalendernamen gekennzeichnet.

### 3. Einstellungen für Erinnerungen

Legt fest, ob an neu erstellte Termine und Besprechungen – einschließlich Standardtermine (zeitbasiert) und ganztägige Termine – automatisch Erinnerungen anhand der konfigurierten Standard-Erinnerungszeiten angewendet werden.

## Delegierte

![Delegate settings panel with Add, Remove, and Permission controls](/img/web/web-p082-1.png)

Mithilfe von Beauftragteneinstellungen können bestimmte Benutzer (Beauftragte) im Namen des Postfachbesitzers handeln. Beauftragten kann je nach den ihnen zugewiesenen Berechtigungen die Erlaubnis erteilt werden, Elemente wie E-Mails oder Besprechungsanfragen unter Verwendung der Identität des Postfachbesitzers zu versenden.

Dieser Abschnitt dient der Verwaltung von Bevollmächtigten und nicht der einfachen Freigabe von Ordnern:

Weist dem Postfach einen neuen Bevollmächtigten zu. Dem Bevollmächtigten können bestimmte Berechtigungen erteilt werden, beispielsweise das Versenden von E-Mails im Namen des Postfachbesitzers.

- **Hinzufügen**
  Weist dem Postfach einen neuen Bevollmächtigten zu. Dem Bevollmächtigten können bestimmte Berechtigungen erteilt werden, beispielsweise das Versenden von E-Mails im Namen des Postfachbesitzers.
- **Entfernen**
  Entzieht einem zuvor zugewiesenen Benutzer die Zugriffsrechte als Bevollmächtigter.
- **Berechtigung**
  Konfiguriert oder ändert die einem ausgewählten Bevollmächtigten gewährten Berechtigungen.

Nach Auswahl von „Hinzufügen“ öffnet sich das Adressbuch, in dem ein Benutzer als Bevollmächtigter ausgewählt werden kann. Sobald ein Bevollmächtigter ausgewählt wurde, wird ein Berechtigungsdialogfeld angezeigt, in dem Zugriffsebenen und zusätzliche Optionen konfiguriert werden können.

### Berechtigungen delegieren

Dem ausgewählten Bevollmächtigten können spezifische Berechtigungen für einzelne Postfachkomponenten erteilt werden, wie zum Beispiel:

`Calendar`, `Tasks`, `Inbox`, `Contacts`, `Notes`, `Journal`

Jeder Postfachkomponente kann eine der folgenden Zugriffsebenen zugewiesen werden:

- **Eigentümer**
  Gewährt volle Kontrolle über die Komponente, einschließlich des Lesens, Erstellens, Änderns und Löschens von Elementen.
- **Sekretär**
  Ermöglicht die Verwaltung von Elementen im Namen des Postfachbesitzers, z. B. das Erstellen, Bearbeiten und Beantworten von Elementen, ohne volle Eigentumsrechte.
- **Nur Lesen**
  Gewährt Lesezugriff. Elemente können angezeigt, aber nicht erstellt, geändert oder gelöscht werden.
- **Keine**
  Verweigert jeglichen Zugriff auf die Komponente. (Standard)

#### Weitere Optionen

**Der Beauftragte erhält Kopien der an mich gesendeten Nachrichten im Zusammenhang mit Besprechungen** – Wenn diese Option aktiviert ist, erhält der Beauftragte Kopien von Besprechungseinladungen, Aktualisierungen und Absagen, die an den Postfachinhaber gesendet werden.

:::caution[Achtung]
Diese Option ist nur verfügbar, wenn der Kalender über die Berechtigung **Eigentümer** oder **Sekretär** verfügt.
:::

**Der Beauftragte kann meine privaten Elemente sehen** – Wenn diese Option aktiviert ist, darf der Beauftragte Elemente, die als privat markiert sind, in den zulässigen Ordnern einsehen. Ist diese Option deaktiviert, bleiben private Elemente für den Beauftragten verborgen, auch wenn ihm andere Berechtigungen gewährt wurden.

:::note
In Fällen, in denen lediglich Zugriff auf Ordnerebene erforderlich ist (z. B. Lese- oder Bearbeitungsrechte für bestimmte Ordner), sollte die Ordnerfreigabe direkt konfiguriert werden, indem Sie mit der rechten Maustaste auf den Ordner klicken und „Ordner freigeben…“ auswählen, anstatt die Delegierungseinstellungen zu verwenden.
:::

## Absenderadressen

In dieser Einstellung können Sie festlegen, welche Absenderadresse beim Verfassen einer neuen Nachricht, beim Beantworten oder beim Weiterleiten einer E-Mail automatisch im Feld „Von“ ausgewählt wird.

Es können mehrere Absenderadressen zur Liste hinzugefügt werden; für jeden Aktionstyp (Neue E-Mail, E-Mail beantworten oder E-Mail weiterleiten) kann jedoch nur eine Adresse als Standard ausgewählt werden.

Der Standardabsender wird durch ein grünes Symbol gekennzeichnet. Wählt man für dieselbe Aktion einen anderen Absender aus, wird die zuvor ausgewählte Adresse wieder rot angezeigt, wodurch sichergestellt wird, dass pro Aktion nur ein Standardabsender aktiv ist.

Dieser Mechanismus ermöglicht eine präzise Steuerung der in verschiedenen E-Mail-Szenarien verwendeten Absenderidentität und verhindert gleichzeitig widersprüchliche Standardeinstellungen.

- **Antwort-E-Mail**
  Gibt an, ob die Adresse beim Beantworten einer bestehenden E-Mail als Absender verwendet werden kann.
  Es kann nur eine Adresse als Standardabsender ausgewählt werden.
  Ein grünes Symbol zeigt an, dass die Berechtigung erteilt wurde.
  Ein rotes X zeigt an, dass die Berechtigung verweigert wurde.
- **Neue E-Mail**
  Gibt an, ob die Adresse beim Verfassen einer neuen E-Mail als Absender verwendet wird.
  Es kann nur eine Adresse als Standardabsender ausgewählt werden.
  Ein grünes Symbol kennzeichnet den aktiven Standardabsender; ein rotes Symbol kennzeichnet alle anderen.
- **E-Mail weiterleiten**
  Gibt an, ob die Adresse beim Weiterleiten einer E-Mail als Absender verwendet wird.
  Es kann nur eine Adresse als Standardabsender ausgewählt werden.
  Ein grünes Symbol kennzeichnet den ausgewählten Standardabsender; ein rotes Symbol kennzeichnet inaktive Einträge.
- **Name**
  Zeigt den beschreibenden Namen an, der der Absenderidentität zugeordnet ist.
- **E-Mail-Adresse**
  Zeigt die E-Mail-Adresse an, die im Feld „Von“ erscheint.

### Verfügbare Aktionen

- **Adressbuch…**
  Öffnet das Adressbuch, um einen Kontakt oder eine Adresse als Absenderidentität auszuwählen.
- **Hinzufügen…**
  Erstellt manuell einen neuen Absendereintrag.
  Diese Option dient zum Hinzufügen benutzerdefinierter Absenderadressen, die nicht aus dem Adressbuch ausgewählt wurden.
- **Bearbeiten…**
  Ermöglicht die Bearbeitung von Absendereinträgen, die zuvor manuell über die Schaltfläche „Hinzufügen“ angelegt wurden.
  Aus dem Adressbuch importierte Absenderidentitäten können hier nicht bearbeitet werden.
- **Anzeigen…**
  Zeigt die Kontaktdaten der ausgewählten Absenderidentität im schreibgeschützten Modus an.
  Dies gilt nur für Einträge, die zuvor aus dem Adressbuch ausgewählt wurden.
- **Entfernen…**
  Löscht die ausgewählte Absenderidentität aus der Liste.
  Entfernt den Zugriff auf diese Absenderadresse im Feld „Von“.

## Vertrauenswürdige Absender

![Safe Senders settings panel with an empty safe senders list](/img/web/web-p084-1.png)

Mit der Funktion „Vertrauenswürdige Absender“ in grommunio Web können Benutzer bestimmte E-Mail-Adressen oder Domänen als vertrauenswürdig kennzeichnen.

Bei diesen vertrauenswürdigen Absendern müssen Sie in E-Mails nicht mehr auf „Eingebettete Bilder herunterladen“ klicken. Bilder und andere Inhalte dieser Absender werden automatisch geladen, wodurch das Lesen von E-Mails schneller und sicherer wird.

## Mobile Geräte

![Mobile Devices panel showing the device list and action buttons with no devices connected](/img/web/web-p086-1.png)

### Überblick

Mobile Device Management (MDM) ist ein Plugin für grommunio Web. Es ermöglicht Benutzern, die Liste und die Details der mobilen Geräte einzusehen, die für die Synchronisierung der Kontodaten konfiguriert sind. Mit MDM können Benutzer außerdem eine erneute Synchronisierung, die Entfernung oder die Fernlöschung eines bestimmten Geräts veranlassen.

Das MDM-Plugin ist serverseitig aktiviert und in der Plugin-Liste stets sichtbar.

Die Startansicht zeigt eine Liste aller Mobilgeräte an, die derzeit für die Synchronisierung von Kontodaten konfiguriert sind, sowie weitere Geräteinformationen:

- `Device`, `User Agent`, `Provisioning Status`, `Last Connect`, `Device ID`

Wenn Sie die Spaltenauswahl erweitern, werden folgende zusätzliche Informationen angezeigt:

- `Device OS`, `Device Info`, `First Sync time`

Die Auswahl der angezeigten Spalten und deren Reihenfolge sind vollständig konfigurierbar.

![Mobile Devices list with a connected SamsungDevice entry and its sync information](/img/web/web-p087-1.png)

Wenn Sie ein Gerät auswählen, öffnet sich ein Popup-Fenster, in dem weitere Informationen zum Gerät angezeigt werden: Anzahl und Typen der synchronisierten Ordner, die grommunio-Synchronisierungsversion, die aktuelle, von der grommunio-Synchronisierung implementierte ActiveSync-Protokollversion sowie die aktuell auf dem Gerät geltende Bereitstellungsrichtlinie.

![Device details popup, General tab: connection dates, status, and folder synchronization counts](/img/web/web-p088-1.png)

![Device details popup, Details tab: device type, operating system, user agent, and MDM plugin versions](/img/web/web-p088-2.png)

### Aktionen

:::caution [Wichtig]
Machen Sie sich vor dem Klicken auf eine Schaltfläche genau bewusst, welche Aktion diese auslöst, da dadurch Schreibvorgänge auf Ihrem Gerät und in Ihrem grommunio-Speicher ausgelöst werden.
:::

#### Gerät löschen

Dieser Befehl setzt den Gerätestatus auf „Löschanforderung ausstehend“. Bei der nächsten Anforderung bestätigt das Gerät die Anforderung und führt die Datenlöschung durch. Je nach Herstellerimplementierung ist es möglich, dass das Gerät nach Durchführung dieses Vorgangs neu startet. Aufgrund der Folgen dieses Vorgangs muss der Benutzer sein Passwort eingeben, bevor er die Löschanforderung auslöst.

:::caution[Wichtig]
Die Hersteller haben unterschiedliche Löschstrategien implementiert. Bei einigen Geräten, vor allem bei Modellen der Serie Android, werden lediglich das grommunio-Konto und dessen Daten (E-Mails, Kontakte, Kalendereinträge usw.) gelöscht.

Bei einigen iOS-Geräten wird eine vollständige Löschung des Geräts durchgeführt, bei der auch Ihre persönlichen Daten entfernt werden, darunter unter anderem Mediendaten (Fotos und Videos), Apps und Einstellungen. Dies ist vergleichbar mit einem Zurücksetzen auf die Werkseinstellungen.
:::

Die Löschstrategie kann auch von den vom Domänenadministrator festgelegten Bereitstellungsrichtlinien abhängen. Bei Fragen oder Unklarheiten bezüglich dieses Vorgangs wenden Sie sich bitte **vor** der Durchführung an den Domänenadministrator oder den grommunio-Support.

#### Vollständige Neusynchronisierung

Dieser Befehl markiert das Gerät für eine vollständige Neusynchronisierung des grommunio-Kontos. Bei der nächsten Anfrage bestätigt das Gerät die Anfrage und führt zunächst die Hierarchiesynchronisierung und anschließend die Inhaltssynchronisierung durch. Beachten Sie, dass dieser Vorgang einige Zeit in Anspruch nehmen kann, insbesondere bei einer großen Anzahl von Elementen oder Elementen mit Anhängen im grommunio-Speicher.

Diese Funktion sollte verwendet werden, wenn Synchronisationsprobleme auftreten, z. B. wenn bestimmte Elemente auf dem Mobilgerät nicht angezeigt werden.

#### Gerät entfernen

Dieser Befehl löscht den gespeicherten Gerätestatus aus dem grommunio-Speicher, und das Gerät verschwindet zudem aus der Liste.

:::note
Diese Maßnahme verhindert nicht, dass das Gerät Ihre grommunio-Daten synchronisiert. Wenn Sie möchten, dass das Gerät die Synchronisierung ebenfalls einstellt, müssen Sie Ihr grommunio-Konto vom Gerät entfernen. Wenn Sie das Konto nicht vom Gerät entfernen, führt dies lediglich dazu, dass das Gerät eine vollständige Neusynchronisierung durchführt.
:::

#### Aktualisieren

Dieser Befehl aktualisiert die Geräteliste. Wenn nach dem Öffnen des MDM-Plugins ein grommunio-Konto auf einem neuen Mobilgerät eingerichtet wird, werden durch Anklicken dieser Schaltfläche die Geräteinformationen aus dem grommunio-Store abgerufen, und das neue Gerät wird in der Liste angezeigt.

## Passwort ändern

![Change Password panel with fields for current password, new password, and password confirmation](/img/web/web-p089-1.png)

Verwenden Sie diese Einstellung, um das Passwort für das Konto zu aktualisieren. Geben Sie das aktuelle Passwort ein, legen Sie dann ein neues Passwort fest und bestätigen Sie es. Nach dem Speichern ist das neue Passwort für alle zukünftigen Anmeldungen erforderlich.

## Plugins

![Plugins panel listing available plugins with their display names and versions, some with selectable checkboxes](/img/web/web-p090-1.png)

In diesem Abschnitt werden alle verfügbaren Plugins mit ihrem Namen und ihrer Version angezeigt. In diesem Abschnitt können Sie optionale Funktionen in der Weboberfläche aktivieren oder deaktivieren.

Nur Plugins mit einem aktivierbaren Kontrollkästchen können vom Benutzer aktiviert oder deaktiviert werden. Obligatorische Plugins sind für die Kernfunktionalität erforderlich und werden vom Systemadministrator verwaltet.

:::note
Änderungen werden sofort nach dem Neuladen wirksam.
:::

## Tastaturkürzel

![Keyboard Shortcuts panel with availability options and a list of shortcuts for creating items and calendar navigation](/img/web/web-p091-1.png)

Die Einstellung **Tastaturkürzel** enthält eine vollständige Liste aller verfügbaren Tastaturkürzel samt der dazugehörigen Aktionen. Einige Tastaturkürzel sind als **BASIC** gekennzeichnet, was auf häufig verwendete und wichtige Funktionen hinweist.

Oben auf der Seite kann eine der folgenden Optionen ausgewählt werden, um die Verfügbarkeit von Tastenkombinationen zu steuern:

- **Tastaturkürzel deaktiviert** – Deaktiviert alle Tastaturkürzel.
- **Grundlegende Tastaturkürzel aktiviert** – Aktiviert nur die als **BASIC** gekennzeichneten Tastaturkürzel und bietet so einen minimalen und vereinfachten Satz an Tastaturkürzeln.
- **Alle Tastaturkürzel aktiviert** – Aktiviert den vollständigen Satz der verfügbaren Tastaturkürzel, einschließlich fortgeschrittener und seltener verwendeter Aktionen.

## Über

![About panel showing grommunio Web copyright notices and license details for the software and its components](/img/web/web-p092-1.png)

Dieser Abschnitt enthält Informationen zur Anwendung, darunter Urheberrechtshinweise und Lizenzangaben zur Software und ihren Komponenten. Er dient ausschließlich zu Referenz- und Informationszwecken.
