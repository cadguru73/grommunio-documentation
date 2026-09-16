---
title: "Einleitung"
description: "Ein Überblick über grommunio Web mit Informationen zu den Systemvoraussetzungen, der Anmeldung, dem Willkommensassistenten und dem Aufbau der Hauptoberfläche."
sidebar:
  order: 10
---

grommunio Web ist die webbasierte Benutzeroberfläche der grommunio-Software-Suite. Sie vereint eine Reihe von Anwendungen, die auch für normale Nutzer einfach zu bedienen sind. Der Zugriff auf grommunio Web erfolgt über einen modernen Webbrowser. Die Oberfläche verfügt über alle wichtigen und im Alltag nützlichen Tools wie E-Mail, Kalender, Kontakte, Notizen und Aufgaben sowie eine Integration mit grommunio Meet und anderen Anwendungen.

Insgesamt bietet grommunio Web integrierte, fortschrittliche Tools für Teamarbeit und professionelle Zusammenarbeit, wie beispielsweise Chat- und Web-Meetings. Da sich grommunio Web leicht konfigurieren lässt, können Administratoren und Entwickler jederzeit neue Plugins erstellen und diese in die Benutzeroberfläche integrieren.

## Anforderungen

Auf grommunio Web kann über einen modernen Webbrowser zugegriffen werden, darunter Varianten von Microsoft Edge, Google Chrome, Mozilla Firefox und Apple Safari. Wir empfehlen die Verwendung aktueller Versionen, um ein optimales Nutzererlebnis zu gewährleisten.

## Anmelden

### Zugriff auf grommunio Web

![grommunio Web login page with username and password fields and the Sign in button](/img/web/web-p008-1.png)

Um auf grommunio Web zuzugreifen, gehen Sie wie folgt vor:

1. Rufen Sie den von Ihrem Administrator bereitgestellten Link mit Ihrem Browser auf. In der Regel lautet der Link etwa `https://example.com` oder `https://mail.example.com/web`.
2. Geben Sie Ihren Benutzernamen und Ihr Passwort ein.
3. Klicken Sie auf die Schaltfläche „Anmelden“.

### Willkommensassistent

Bei Ihrer ersten Anmeldung werden Sie vom „Willkommensassistenten“ begrüßt, mit dem Sie einige allgemeine Einstellungen wie Sprache, Starttag der Woche und weitere Optionen konfigurieren können. Diese Einstellungen können später jederzeit im Konfigurationsbereich „Einstellungen“ geändert werden.

![Welcome Assistant dialog showing account information and general calendar settings for a new user](/img/web/web-p009-1.png)

Folgende Optionen stehen zur Verfügung:

#### 1. Kontoinformationen

**Profilbild**
Ermöglicht es dem Nutzer, sein Profilbild hochzuladen oder zu ändern. Akzeptiert werden gängige Bildformate (JPEG, GIF, PNG, BMP).

**Anzeigename**
Der Name, der anderen Benutzern angezeigt wird.

:::caution[Achtung]
Kann in grommunio Web nicht bearbeitet werden! Nur in der Admin-Benutzeroberfläche.
:::

**E-Mail**
Zeigt die primäre E-Mail-Adresse des Benutzers an. Dieses Feld kann in grommunio Web nicht bearbeitet werden.

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

#### 2. Allgemeine Kalendereinstellungen

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

Optionen: `5 minutes`, `6 minutes`, `10 minutes`, `15 minutes`, `30 minutes`, `1 hour`

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

#### Fertigstellung

Nachdem der Benutzer alle Einstellungen überprüft hat, gelangt er zur vollständigen grommunio Web-Benutzeroberfläche, wobei die ausgewählte Konfiguration bereits übernommen wurde.

## Überblick

Sobald Sie sich bei grommunio Web angemeldet haben, wird Ihnen eine Übersicht über Ihre persönliche Benutzeroberfläche angezeigt. Standardmäßig gelangen Sie zur Postfachübersicht, die in der Regel entweder leer ist oder bereits mit Daten aus einer von Ihrem Administrator durchgeführten Migration vorbelegt ist.

![Main grommunio Web interface showing the menu bar, shortcut bar, folder navigation area and an empty inbox in the main content area](/img/web/web-p011-1.png)

Die Hauptübersicht über das grommunio Web ist wie folgt aufgebaut:

### Hauptbereich der Benutzeroberfläche

Der Hauptbereich der Benutzeroberfläche enthält Verweise auf die wichtigsten Anwendungsbereiche. Standardmäßig sind dies: E-Mail, Kalender, Aufgaben und Notizen. Oben rechts finden Sie persönliche Informationen wie die Anzeige des angemeldeten Benutzers sowie die Schaltflächen „Erinnerungen“, „Einstellungen“, „Hilfe“ und „Abmelden“.

![Top menu bar with the Mail, Calendar, Contacts, Tasks and Notes application areas and personal controls on the right](/img/web/web-p012-1.png)

### Schnellzugriffsleiste

![Shortcut Bar with buttons for new item, address book, refresh, print and layout](/img/web/web-p012-2.png)

Die Schnellzugriffsleiste fasst die wichtigsten Funktionen des Anwendungsbereichs zusammen, in dem Sie sich gerade befinden. Sie ermöglicht den schnellen Zugriff auf häufig verwendete Aktionen wie beispielsweise:

- einen neuen Eintrag erstellen
- das Adressbuch öffnen
- die Ansicht aktualisieren
- eine E-Mail ausdrucken
- das Layout ändern

#### Dropdown-Menü „Neuer Artikel“

Wenn Sie auf den kleinen Pfeil rechts neben der Schaltfläche **Neuer Eintrag** klicken, öffnet sich ein Dropdown-Menü, über das verschiedene Arten von Einträgen erstellt werden können. Die verfügbaren Optionen sind:

- **E-Mail** – Eine neue E-Mail-Nachricht erstellen.
- **Termin** – Einen neuen Kalendertermin eintragen.
- **Meeting-Anfrage** – Eine Einladung zu einer Besprechung erstellen und versenden.
- **Kontakt** – Einen neuen Kontakt zum Adressbuch hinzufügen.
- **Verteilerliste** – Eine neue Verteilergruppe erstellen.
- **Aufgabe** – Eine neue Aufgabe erstellen.
- **Aufgabenanfrage** – Einem anderen Benutzer eine Aufgabe zuweisen.
- **Haftnotiz** – Eine Notiz erstellen.

### Registerkartenleiste

Unterhalb der Schnellzugriffsleiste befindet sich die **Registerkartenleiste**.

![Tab Bar showing the pinned Inbox tab and a plus symbol for creating new items](/img/web/web-p012-3.png)

In der Registerkartenleiste werden alle derzeit geöffneten Elemente als Registerkarten angezeigt, beispielsweise der Posteingang, neue E-Mails, Termine, Besprechungsanfragen usw.

Auf der allerersten Registerkarte wird der Ordner angezeigt, in dem Sie sich gerade befinden. Diese Registerkarte ist immer angeheftet und kann nicht geschlossen werden.

Alle über das Dropdown-Menü „Neues Element“ neu erstellten Elemente (z. B. E-Mail, Termin, Meeting) werden hier als zusätzliche Registerkarten angezeigt. Darüber hinaus können neue Elemente auch durch Klicken auf das +-Symbol am Ende der Registerkartenleiste erstellt werden.

Temporäre Registerkarten werden automatisch entfernt, wenn:

- Ein Artikel wird versendet
- Ein Artikel wird gespeichert
- Der Nutzer schließt den Tab manuell
- Der Nutzer aktualisiert den Browser

Diese Ansicht mit Registerkarten ermöglicht ein schnelles Wechseln zwischen mehreren Elementen, ohne den Kontext aus den Augen zu verlieren.

### Bereich für die Ordnernavigation

Im **Ordner-Navigationsbereich** erhalten Sie einen Überblick über Ihre persönlichen Ordner sowie über alle zugehörigen sekundären Postfächer, wie z. B. öffentliche Ordner, auf die Sie Zugriff haben. Je nachdem, welches Modul Sie gerade verwenden (E-Mail, Kalender, Kontakte usw.), werden im **Ordner-Navigationsbereich** normalerweise nur die für dieses Modul relevanten Ordner angezeigt. Im E-Mail-Modul sehen Sie beispielsweise Ihre E-Mail-Ordner, während im Kalender-Modul nur Kalender angezeigt werden.

![Folder Navigation Area showing Favourites and a user mailbox with Inbox, Drafts, Outbox, Sent Items, Deleted Items, Junk Email and Public Folders](/img/web/web-p013-1.png)

#### Option „Alle anzeigen“

Im Navigationsbereich befindet sich das Kontrollkästchen **Alle anzeigen**. Wenn dieses Kontrollkästchen aktiviert ist, werden unter **Alle anzeigen** *alle mit Ihrem Postfach verknüpften Ordner* angezeigt, unabhängig vom aktiven Modul. So erhalten Sie in einer einzigen Ansicht einen vollständigen Überblick über alle Ordner.

:::note
Wenn Sie zu einem Ordner eines anderen Typs wechseln, wird automatisch in den entsprechenden Anwendungsbereich gewechselt. Wenn Sie beispielsweise einen Kalenderordner auswählen, wird automatisch in den Kalender-Anwendungsbereich gewechselt und der ausgewählte Kalender geöffnet.
:::

### Hauptinhaltsbereich

Im **Hauptinhaltsbereich** werden die wichtigsten Informationen der Anwendung angezeigt, basierend auf dem aktuell ausgewählten Modul, Ordner oder Kontext.

Wenn beispielsweise im E-Mail-Modul der Ordner **„Posteingang“** ausgewählt wird, werden im Hauptinhaltsbereich alle in diesem Posteingang enthaltenen E-Mails angezeigt. Wird ein anderer Ordner, ein Suchergebnis oder ein anderer Elementtyp ausgewählt, passt sich der angezeigte Inhalt entsprechend an.

![Main Content Area showing a message list on the left and a task request preview on the right](/img/web/web-p014-1.png)

In vielen Bereichen von grommunio Web steht eine integrierte *Suchfunktion* zur Verfügung. Die Suchergebnisse werden direkt im Hauptinhaltsbereich angezeigt und ersetzen während der Suche die Standard-Ordneransicht.

Alle im Hauptinhaltsbereich angezeigten Einträge lassen sich nach verschiedenen Kriterien **sortieren**, beispielsweise nach Absender, Betreff, Datum, Kategorien, Status usw. Die Sortieroptionen können in der Regel durch Klicken auf die Spaltenüberschriften oder mithilfe der bereitgestellten Sortiersteuerelemente aufgerufen werden.

Dieses dynamische Verhalten stellt sicher, dass der Hauptinhaltsbereich stets den aktuellen Arbeitskontext widerspiegelt und einen schnellen Zugriff auf relevante Informationen ermöglicht.

### Datenstruktur

Ihre wichtigsten Groupware-Daten werden in einer sogenannten „Mailbox“ oder einem „Mail-Speicher“ gespeichert. Diese Daten umfassen wichtige Informationen wie Ihre E-Mails, Kalenderdaten, Kontakte und so weiter. Um diese Daten gut verwalten zu können, ist der Mailbox-Speicher hierarchisch in Ordner gegliedert. Standardmäßig enthält ein Speicher eine Reihe von Standardordnern, die wiederum verschiedene Typen aufweisen. Diese sind:

| Name | Typ     |
|---------------|----------|
| Posteingang | E-Mail   |
| Entwürfe | E-Mail   |
| Gesendete E-Mails    | E-Mail   |
| Gelöschte E-Mails | E-Mail   |
| Aufgaben | Aufgaben    |
| Kalender | Kalender |
| Kontakte | Kontakte |
| Junk-E-Mail   | E-Mail   |
| Notizen | Notizen    |
| Postausgang | E-Mail   |

### Suchfunktion

Über den Bereich „Suchwerkzeuge“ lassen sich Suchergebnisse verfeinern und eingrenzen, wenn Sie nach Elementen wie E-Mails, Terminen, Kontakten, Aufgaben oder Notizen suchen.

![Search Tools panel with options for Folders, Show, Filter, Date, Search and Filter category](/img/web/web-p015-1.png)

#### Ordner

- **Unterordner einbeziehen**
  Wenn diese Option ausgewählt ist, werden bei der Suche alle Unterordner des aktuell ausgewählten Ordners berücksichtigt.
  Beispiel: Bei der Suche im Posteingang werden auch alle Unterordner des Posteingangs durchsucht.

#### Anzeigen…

Diese Optionen legen fest, welche Art von Einträgen in den Suchergebnissen angezeigt werden:

- **E-Mails**
  Bezieht E-Mail-Nachrichten in die Suchergebnisse ein.
- **Termine**
  Bezieht Kalendereinträge wie Besprechungen und Veranstaltungen mit ein.
- **Kontakte**
  Bezieht Kontakteinträge mit ein.
- **Aufgaben**
  Bezieht Aufgabeneinträge mit ein.
- **Notizen**
  Bezieht Notizen mit ein.

Es können ein oder mehrere Artikeltypen ausgewählt werden.

#### Filter…

Diese Optionen schränken die Ergebnisse anhand des Nachrichtenstatus oder des Inhalts ein:

- **Ungelesen**
  Zeigt nur Elemente an, die noch nicht als gelesen markiert wurden.
- **Anhänge**
  Zeigt nur Elemente an, die einen oder mehrere Anhänge enthalten.

#### Datum

- **Beliebiges Datum**
  Ermöglicht die Filterung der Suchergebnisse nach einem bestimmten Zeitraum, z. B.:
  `Any date`, `Past week`, `Past 2 weeks`, `Past month`, `Past 6 month`, `Past year` oder `Custom date`

Dadurch lassen sich die Ergebnisse auf einen bestimmten Zeitraum eingrenzen.

#### Suche…

Diese Optionen legen fest, in welchen Feldern gesucht wird:

- **Absender**
  Sucht nach Elementen anhand des Namens oder der E-Mail-Adresse des Absenders.
- **Empfänger**
  Sucht nach Elementen anhand der Namen oder E-Mail-Adressen der Empfänger.
- **Betreff**
  Sucht in der Betreffzeile der Elemente.
- **Text & Anhänge**
  Durchsucht den Textkörper der Nachricht sowie den Inhalt von Anhängen (sofern unterstützt).

#### Filterkategorie…

- **Kategorie auswählen**
  Ermöglicht die Filterung der Suchergebnisse nach zugewiesenen Kategorien (z. B. farbcodierte oder beschriftete Artikel).

#### Favoriten

- **Favoriten**
  Dies ist eine Schaltfläche, mit der ein Ordner basierend auf der Suchanfrage zu den Favoriten hinzugefügt wird.
  Beim Anklicken kann ein benutzerdefinierter Ordnername eingegeben werden.

### Allgemeines Verhalten

grommunio Web ist eine echte Webanwendung, die ein außergewöhnlich verbessertes Webanwendungserlebnis bietet. Durch dieses Verhalten bietet grommunio Web gegenüber herkömmlichen Webanwendungen zahlreiche Verbesserungen der Benutzererfahrung, darunter:

- Unterstützung für Drag & Drop von Elementen.
- Kontextmenüs per Rechtsklick mit zusätzlichen Funktionen für Objekte.
- Mehrfachauswahl von Objekten mithilfe der Strg-Taste (oder der Cmd-Taste bei Apple).
- Tabellarische Benutzeroberfläche für multitaskingfähiges Arbeiten.
