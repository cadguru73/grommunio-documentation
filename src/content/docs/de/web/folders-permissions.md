---
title: "Ordner und Berechtigungen"
description: "Machen Sie sich mit dem Ordner-Navigationsbereich, den Ordneroptionen sowie der Konfiguration und Freigabe von Ordnerberechtigungen in grommunio Web vertraut."
sidebar:
  order: 65
---

## Struktur des Ordner-Navigationsbereichs

Der Ordnernavigationsbereich in grommunio Web zeigt alle Ordner, auf die Sie Zugriff haben, in einer hierarchischen Struktur an.

:::tip[Hinweis]
Die Option **Alle anzeigen** muss ausgewählt sein.
:::

![Folder Navigation Area showing Favourites, the John Doe mailstore with its default subfolders, Public Folders, and the Open Shared Folders + button](/img/web/web-p064-1.png)

### Favoriten

Der erste Abschnitt enthält die Favoriten.

Dieser Abschnitt enthält Verweise (Verknüpfungen) auf Ordner, die Sie als Favoriten markiert haben. Das Hinzufügen eines Ordners zu den Favoriten führt nicht zu einer Duplizierung des Ordners, sondern erstellt lediglich einen Verweis für den schnellen Zugriff.

### Mailstore (Benutzer-Stammordner)

Unter „Favoriten“ befindet sich Ihr Mailstore, der den Stammordner des Postfachs darstellt.

Es enthält die folgenden Standardunterordner:

- Posteingang
- Entwürfe
- Postausgang
- Gesendete E-Mails
- Gelöschte E-Mails
- Spam
- Kalender
- Kontakte
- Aufgabenliste
- Aufgaben
- Notizen
- Tagebuch
- RSS-Feeds
- Synchronisierungsprobleme

Diese Ordner werden automatisch erstellt und dienen zur Speicherung verschiedener Arten von Elementen wie E-Mails, Kalendereinträge, Kontakte und Aufgaben. Es handelt sich um systemseitige Standardordner, die weder geändert noch gelöscht werden können.

### Freigegebene Ordner

Unterhalb Ihres E-Mail-Speichers werden alle hinzugefügten freigegebenen Ordner angezeigt.

Freigegebene Ordner gehören anderen Benutzern oder Ressourcen und müssen manuell hinzugefügt werden.

:::note
Verfügt ein Benutzer über Speicherbesitzerrechte für das Postfach eines anderen Benutzers, wird dieses Postfach dank der Speicherhinweis-Funktion von grommunio automatisch integriert. Die Speicherbesitzerrechte können von Administratoren in der Admin-Benutzeroberfläche konfiguriert werden.
:::

Freigegebene Ordner können über die Schaltfläche **„Freigegebene Ordner öffnen +“** im Ordner-Navigationsbereich (unten) hinzugefügt werden.

### Öffentliche Ordner

Am unteren Rand des Ordnernavigationsbereichs wird der Ordner **Öffentlicher Ordner – &lt;domain&gt;** angezeigt.

Dieser Ordner enthält öffentliche Ordner, auf die Benutzer innerhalb derselben Domäne je nach den ihnen zugewiesenen Berechtigungen zugreifen können.

## Ordneroptionen

Die folgenden Optionen stehen zur Verfügung, wenn Sie mit der rechten Maustaste auf einen Ordner in der Ordnerstruktur klicken. Die verfügbaren Optionen können je nach Ordnertyp und Benutzerberechtigungen variieren.

### Grundlegende Ordneroptionen

- **Öffnen**
  Öffnet den ausgewählten Ordner und zeigt dessen Inhalt in der Hauptansicht an.
- **Ordner umbenennen**
  Ermöglicht es, den Namen des ausgewählten Ordners zu ändern.

  :::note
  Die Umbenennung des Stammordners ist nur über die Admin-Benutzeroberfläche möglich.
  :::

- **Neuer Ordner**
  Erstellt einen neuen Unterordner unter dem ausgewählten Ordner.
  Der neue Ordner übernimmt standardmäßig die Berechtigungen seines übergeordneten Ordners.
- **Elemente wiederherstellen**
  Stellt Elemente wieder her, die zuvor aus diesem Ordner gelöscht wurden, sofern vorhanden.
  Diese Option ist in der Regel für Ordner verfügbar, die die Wiederherstellung von Elementen unterstützen.
- **Zu Favoriten hinzufügen**
  Fügt den ausgewählten Ordner dem Bereich „Favoriten“ hinzu, um einen schnellen Zugriff zu ermöglichen.
  Favoriten werden oben in der Ordnerstruktur angezeigt.
- **Ordner freigeben …**
  Ermöglicht die Freigabe des Ordners für andere Benutzer und die Festlegung ihrer Zugriffsberechtigungen, z. B. Lesezugriff oder Lese-/Schreibzugriff.
- **Eigenschaften**
  Zeigt detaillierte Informationen zum ausgewählten Ordner an, darunter Speicherort, Elemente, Objekt-ID, Ordnergröße und Berechtigungen.

  Wenn Sie auf die Schaltfläche **„Ordnergröße…“** klicken, werden zusätzliche Informationen zu allen Unterordnern angezeigt, darunter deren individueller Speicherverbrauch und die Verteilung der Gesamtgröße.

Zusätzlich zu den grundlegenden Ordneroptionen stehen für bestimmte Ordnertypen die folgenden Optionen zur Verfügung:

### Stammordner

- **Neu laden**
  Aktualisiert die Ordnerstruktur und lädt den Ordnerinhalt neu, um sicherzustellen, dass die neuesten Änderungen angezeigt werden.

### E-Mail-Ordner

- **Alle Nachrichten als gelesen markieren**
  Markiert alle Nachrichten im ausgewählten Ordner als gelesen.
  Diese Aktion gilt nur für den aktuellen Ordner und hat keine Auswirkungen auf Unterordner.
- **Ordner leeren**
  Löscht alle Nachrichten im ausgewählten Ordner endgültig.
  Je nach Systemkonfiguration werden gelöschte Nachrichten möglicherweise in den Ordner „Gelöschte Objekte“ verschoben oder sofort entfernt.
- **E-Mails importieren**
  Importiert E-Mail-Nachrichten im **EML**-Format in den ausgewählten Ordner.

### Kalenderordner

- **Farbe auswählen**
  Weist dem ausgewählten Kalender eine Farbe zu.
  Die Farbe dient dazu, Kalendereinträge in Kalenderansichten und Überlagerungen optisch voneinander zu unterscheiden.
- **Termine importieren**
  Importiert Kalendereinträge im **iCalendar**- (`.ics`) oder **vCalendar**- (`.vcs`) Format in den ausgewählten Kalender.

### Kontaktordner

- **Kontakte importieren**
  Importiert Kontakte aus einer externen Datei in den ausgewählten Kontaktordner.
  Zu den unterstützten Formaten gehört **vCard** (`.vcf`).

### Gemeinsamer Stammordner

Die in einem freigegebenen Stammordner verfügbaren Optionen hängen von den Berechtigungen des Benutzers ab. Benutzer mit höheren Berechtigungen sehen mehr Optionen, während Benutzer mit eingeschränkten Berechtigungen nur die Aktionen sehen, zu deren Ausführung sie berechtigt sind. Die Option **„Shop schließen“** ist jedoch unabhängig von den Berechtigungen des Benutzers immer verfügbar.

- **Speicher schließen**
  Schließt den freigegebenen Postfach- oder Ordnerspeicher und entfernt ihn aus der Ordnerstruktur.
  Diese Aktion löscht die freigegebenen Daten nicht und kann durch erneutes Öffnen des freigegebenen Speichers rückgängig gemacht werden.

:::caution[Achtung]
Das Gleiche gilt für freigegebene Unterordner: Die meisten Optionen können je nach Benutzerberechtigungen und -rechten variieren.
:::

## Berechtigungen

In diesem Dialogfeld können Sie die Zugriffsrechte für verschiedene Benutzer oder Gruppen für den ausgewählten Ordner konfigurieren.

![Permissions tab of the folder properties dialog, showing the user/group list with default and anonymous entries, the Profile dropdown, and the Read, Write, Delete items, and Other permission categories](/img/web/web-p067-1.png)

### Benutzer und Profile

- **Benutzer-/Gruppenliste**
  Zeigt Benutzer oder Gruppen an, denen Berechtigungen für den Ordner zugewiesen wurden.
  - *Standard*: Gilt für alle Benutzer, sofern nicht ausdrücklich anders festgelegt.
  - *Anonym*: Gilt für nicht authentifizierte Benutzer.
- **Schaltflächen „Hinzufügen“ / „Entfernen“**
  Dienen zum Hinzufügen neuer Benutzer oder Gruppen für die Berechtigungsvergabe oder zum Entfernen bestehender Einträge.
- **Profil-Dropdown**
  Ermöglicht die Auswahl vordefinierter Berechtigungsprofile zur schnellen Anwendung von Standardberechtigungssätzen.

### Berechtigungskategorien

- **Lesen**
  Legt fest, in welchem Umfang Zugriff zum Lesen des Ordnerinhalts gewährt wird.
  - **Keine:** Keine Berechtigung zum Anzeigen des Ordnerinhalts.
  - **Vollständige Details:** Berechtigung zum Lesen der vollständigen Details von Elementen, einschließlich Inhalt und Metadaten.
- **Schreiben**
  Legt die Rechte zum Erstellen oder Bearbeiten von Elementen innerhalb des Ordners fest.
  - **Elemente erstellen:** Berechtigung zum Erstellen neuer Elemente wie E-Mails oder Kalendertermine.
  - **Unterordner erstellen:** Berechtigung zum Erstellen von Unterordnern innerhalb des aktuellen Ordners.
  - **Eigene bearbeiten:** Berechtigung, vom Benutzer erstellte Elemente zu bearbeiten.
  - **Alle bearbeiten:** Berechtigung, alle Elemente im Ordner zu bearbeiten, unabhängig vom Ersteller.
- **Elemente löschen**
  Legt die Löschrechte für Ordnerelemente fest.
  - **Keine:** Keine Berechtigung zum Löschen von Elementen.
  - **Eigene:** Berechtigung zum Löschen von Elementen, die vom Benutzer erstellt wurden.
  - **Alle:** Berechtigung zum Löschen beliebiger Elemente im Ordner.
- **Sonstiges**
  Zusätzliche ordnerbezogene Berechtigungen:
  - **Ordnerbesitzer:** Weist den Benutzer als Besitzer des Ordners aus und gewährt in der Regel volle Zugriffsrechte.
  - **Ordnerkontakt:** Weist den Benutzer als Kontakt für den Ordner zu, häufig zu Verwaltungszwecken.
  - **Ordner sichtbar:** Ermöglicht die Sichtbarkeit des Ordners.

### Rekursive Anwendung

- **Geänderte Berechtigungen rekursiv anwenden (kopieren)**
  Wenn diese Option ausgewählt ist, werden die konfigurierten Berechtigungen rekursiv auf den aktuellen Ordner und alle Unterordner angewendet.

### Aktionen

- **OK**
  Speichert die Änderungen und schließt das Dialogfeld.
- **Abbrechen**
  Verwirft die Änderungen und schließt das Dialogfeld.

## Ordner erfolgreich freigeben

1. **Stamm-Mailspeicher auswählen**

   Wählen Sie zunächst den Stamm-Mailstore in der Ordnerstruktur aus. Bevor Sie einzelne Ordner freigeben können, müssen die Berechtigungen auf der Stammebene konfiguriert werden.

2. **Dialogfeld „Berechtigungen“ öffnen**

   Es gibt mehrere Möglichkeiten, das Dialogfeld „Berechtigungen“ zu öffnen:

   - Klicken Sie mit der rechten Maustaste auf den Ordner und wählen Sie **Ordner freigeben**.
   - Öffnen Sie die **Eigenschaften** des Ordners und wechseln Sie zur Registerkarte **Berechtigungen**.

3. **Berechtigungen konfigurieren**

   Im Dialogfeld „Berechtigungen“:

   - Fügen Sie **Ordner sichtbar** für die Benutzer oder Gruppen hinzu, die Zugriff auf den Ordner haben sollen.
   - Klicken Sie auf **OK**, um die Eingaben zu speichern und das Dialogfeld zu schließen.

4. **Bestimmten Ordner freigeben**

   Nachdem Sie die Berechtigungen im Stammverzeichnis festgelegt haben, wählen Sie den Ordner aus, der freigegeben werden soll, und öffnen Sie dessen **Berechtigungsdialog**. Fügen Sie **Ordner sichtbar** hinzu und weisen Sie die erforderlichen Rechte zu.

:::caution[Achtung]
Wenn es sich bei dem Ordner, den Sie freigeben möchten, um einen Unterordner handelt, stellen Sie sicher, dass alle darüber liegenden übergeordneten Ordner ebenfalls über die Berechtigung **Ordner sichtbar** für die vorgesehenen Benutzer verfügen. Andernfalls können Benutzer möglicherweise nicht auf den freigegebenen Unterordner zugreifen, selbst wenn dessen Berechtigungen korrekt eingestellt sind. **Ausnahme:** Standardordner wie „Posteingang“, „Kalender“ usw. können unabhängig von den Root-Rechten geöffnet werden.
:::

## Berechtigungsmatrix

| Profil | Keine lesen | Alle Details lesen | Elemente erstellen | Unterordner erstellen | Eigene bearbeiten | Alle bearbeiten | Keine löschen | Eigene löschen | Alle löschen | Ordnerbesitzer | Ordnerkontakt | Ordner sichtbar |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Eigentümer | | x | x | x | x | x | | | x | x | x | x |
| Veröffentlichender Redakteur | | x | x | x | x | x | | | x | | | x |
| Redakteur | | x | x | | x | x | | | x | | | x |
| Veröffentlichender Autor | | x | x | x | x | | | x | | | | x |
| Autor | | x | x | | x | | | x | | | | x |
| Nicht redaktioneller Autor | | x | x | | | | | x | | | | x |
| Gutachter | | x | | | | | x | | | | | x |
| Mitwirkender | x | | x | | | | x | | | | | x |
| Keine Angabe | x | | | | | | x | | | | | |
| Benutzerdefiniert | o | o | o | o | o | o | o | o | o | o | o | o |
