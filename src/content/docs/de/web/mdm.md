---
title: "Verwaltung mobiler Geräte"
description: "Mobile Device Management (MDM) ist ein Plugin für grommunio Web. Es ermöglicht Benutzern, die Liste und die Details der mobilen Geräte einzusehen, die für die Synchronisierung des Kontos konfiguriert sind…"
sidebar:
  label: "Mobilgeräte"
  order: 80
---

## Überblick

Mobile Device Management (MDM) ist ein Plugin für grommunio Web. Es ermöglicht Benutzern, die Liste und die Details der mobilen Geräte einzusehen, die für die Synchronisierung der Kontodaten konfiguriert sind. Mit MDM können Benutzer außerdem eine erneute Synchronisierung, die Entfernung oder die Fernlöschung eines bestimmten Geräts veranlassen.

Das MDM-Plugin ist serverseitig aktiviert und in der Plugin-Liste stets sichtbar.

Um auf das Plugin zuzugreifen, wählen Sie oben rechts im grommunio-Webfenster „Einstellungen“ aus. Wählen Sie anschließend in der Liste, die daraufhin im linken Bereich angezeigt wird, „Mobile Geräte“ aus. Die Startansicht zeigt eine Liste aller mobilen Geräte, die derzeit für die Synchronisierung der Kontodaten konfiguriert sind, sowie einige zusätzliche Geräteinformationen: benutzerfreundlicher Gerätename, Betriebssystem des Geräts, Zeitpunkt der ersten und letzten Synchronisierung, Geräte-ID usw. Die Spaltenliste und deren Reihenfolge sind konfigurierbar.

![MDM device list](/img/web_mdm_devicelist.png)

Wenn Sie ein Gerät auswählen, öffnet sich ein Popup-Fenster, in dem weitere Informationen zum Gerät angezeigt werden: Anzahl und Typen der synchronisierten Ordner, die grommunio-Synchronisierungsversion, die aktuelle, von der grommunio-Synchronisierung implementierte ActiveSync-Protokollversion sowie die aktuell auf dem Gerät geltende Bereitstellungsrichtlinie.

![MDM device details](/img/web_mdm_devicedetails1.png)

![MDM device details](/img/web_mdm_devicedetails2.png)

## Maßnahmen

:::caution
Machen Sie sich unbedingt klar, welche Aktion eine bestimmte Schaltfläche auslöst, bevor Sie darauf klicken, da diese Schreibvorgänge auf Ihrem Gerät und in Ihrem grommunio-Speicher auslösen.
:::

### Gerät löschen

Dieser Befehl setzt den Gerätestatus auf „Löschanforderung ausstehend“. Bei der nächsten Anforderung bestätigt das Gerät die Anforderung und führt die Datenlöschung durch. Je nach Herstellerimplementierung ist es möglich, dass das Gerät nach Durchführung dieses Vorgangs neu startet. Aufgrund der Folgen dieses Vorgangs muss der Benutzer sein Passwort eingeben, bevor er die Löschanforderung auslöst.

:::caution
Die Hersteller haben unterschiedliche Löschstrategien implementiert. Bei einigen Geräten, vor allem bei Modellen der Baureihe Android, werden lediglich das grommunio-Konto und dessen Daten (E-Mails, Kontakte, Kalendereinträge usw.) gelöscht.

Bei einigen iOS-Geräten wird eine vollständige Löschung des Geräts durchgeführt, bei der auch Ihre persönlichen Daten entfernt werden, darunter unter anderem Mediendaten (Fotos und Videos), Apps und Einstellungen. Dies ist vergleichbar mit einem Werksreset.
:::

Die Löschstrategie kann auch von den vom Domänenadministrator festgelegten Bereitstellungsrichtlinien abhängen. Wenden Sie sich an ihn oder den grommunio-Support, wenn Sie Zweifel bezüglich dieses Vorgangs haben, **bevor** Sie ihn ausführen.

### Vollständige Neusynchronisierung

Dieser Befehl markiert das Gerät für eine vollständige Neusynchronisierung des grommunio-Kontos. Bei der nächsten Anfrage bestätigt das Gerät die Anfrage und führt zunächst die Hierarchie- und anschließend die Inhaltssynchronisierung durch. Beachten Sie, dass dies einige Zeit in Anspruch nehmen kann, insbesondere wenn Sie viele Elemente oder viele Elemente mit Anhängen in Ihrem grommunio-Speicher haben.

Nutzen Sie diese Funktion, wenn bei der Synchronisierung Probleme auftreten, z. B. wenn bestimmte Elemente auf dem Mobilgerät nicht angezeigt werden.

### Gerät entfernen

Mit diesem Befehl wird der gespeicherte Gerätestatus aus Ihrem grommunio-Speicher gelöscht, und das Gerät verschwindet zudem aus der Liste.

:::note
Diese Maßnahme verhindert nicht, dass das Gerät Ihre grommunio-Daten synchronisiert. Wenn Sie möchten, dass das Gerät die Synchronisierung ebenfalls einstellt, müssen Sie Ihr grommunio-Konto vom Gerät entfernen. Wenn Sie das Konto nicht vom Gerät entfernen, führt dies lediglich dazu, dass das Gerät eine vollständige Neusynchronisierung durchführt.
:::

### Aktualisieren

Dieser Befehl aktualisiert die Geräteliste. Wenn Sie nach dem Öffnen des MDM-Plugins ein grommunio-Konto auf einem neuen Mobilgerät einrichten, werden durch Anklicken dieser Schaltfläche die Geräteinformationen aus Ihrem grommunio-Store abgerufen und das neue Gerät erscheint in der Liste.
