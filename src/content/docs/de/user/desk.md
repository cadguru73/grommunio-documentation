---
title: "grommunio Desk"
description: "Installieren und nutzen Sie grommunio Desk, den nativen Desktop-Client für Windows, macOS und Linux – mit Serverprofilen, Hintergrundbetrieb in der Taskleiste und betriebssystem-eigenen Benachrichtigungen."
sidebar:
  label: grommunio Desk
  order: 20
---

**grommunio Desk** ist der native Desktop-Client für grommunio, der für
**Windows, macOS und Linux** verfügbar ist. Er stellt Ihnen grommunio Web in einem eigenen
Anwendungsfenster zur Verfügung – mit einer Desktop-Integration, die ein Browser-Tab nicht bieten kann:
Hintergrundbetrieb in der Taskleiste, betriebssystemnative Benachrichtigungen und die Möglichkeit,
mehrere grommunio-Server von einem Ort aus zu verwalten.

:::tip[Gleiche Funktionen wie grommunio Web]
Der Desktop-Client stellt die vollständige Benutzeroberfläche von grommunio Web dar, sodass alle Informationen aus
dem **[grommunio Web](/web/)**-Handbuch – E-Mail, Kalender, Kontakte, Chat, Meet und
alles Weitere – auch für grommunio Desk gelten. Diese Seite behandelt nur die Aspekte, die
spezifisch für die Desktop-Anwendung sind.
:::

## Installation

Laden Sie das Installationsprogramm für Ihre Plattform vom grommunio-Download-Portal herunter und
führen Sie es aus:

- **[grommunio.com/download](https://grommunio.com/download/)**

Es stehen Builds für Windows, macOS und Linux zur Verfügung. Starten Sie nach der Installation
**grommunio Desk** wie jede andere Anwendung.

## Erste Schritte – Einen Server hinzufügen

Beim ersten Start zeigt grommunio Desk eine Startseite an, über die Sie eine Verbindung zu Ihrem
grommunio-Server herstellen können:

1. Wählen Sie **Server hinzufügen** (auch später über das Menü **Server** verfügbar).
2. Geben Sie die URL Ihres grommunio-Servers ein, zum Beispiel
   `https://mail.example.com`. Die Adresse wird vor dem Speichern überprüft.
3. Bestätigen Sie. grommunio Desk lädt die grommunio Web-Anmeldung für diesen Server; melden Sie sich
   mit Ihrer E-Mail-Adresse und Ihrem Passwort an.

Dein Server und deine Sitzung werden lokal gespeichert, sodass du beim nächsten Start direkt
wieder eingeloggt bist.

## Arbeiten mit mehreren Servern

grommunio Desk kann **mehrere Serverprofile** gleichzeitig verwalten – dies ist nützlich, wenn Sie
auf mehr als eine grommunio-Umgebung zugreifen (beispielsweise auf ein berufliches und ein privates
Postfach oder auf mehrere Kundensysteme):

- Fügen Sie über das Menü **Server** unter **Server hinzufügen** weitere Server hinzu.
- Wechseln Sie über die Titelleiste bzw. das Menü **Server** zwischen den verbundenen Servern.
- Entfernen Sie einen nicht mehr benötigten Server über das Menü **Server** (Sie werden zur
  Bestätigung aufgefordert).

## Anwendungsmenüs

Die Menüleiste bietet die üblichen Desktop-Funktionen:

| Menü | Inhalt |
| --- | --- |
| **Datei** | Aktionen auf Anwendungsebene und Beenden von grommunio Desk. |
| **Server** | Serverprofile hinzufügen, wechseln und entfernen; zur Startseite zurückkehren. |
| **Ansicht** | Aktuelle Ansicht neu laden und zoomen. |
| **Hilfe** | Produkt- und Versionsinformationen. |

## Hintergrundbetrieb und das Symbol in der Taskleiste

grommunio Desk läuft im Hintergrund weiter, sodass Sie auch nach dem Schließen des Fensters weiterhin
Benachrichtigungen erhalten:

- Wenn Sie das Fenster schließen, wird die Anwendung in die **Taskleiste** minimiert und nicht
  beendet.
- Verwenden Sie den Eintrag **„App öffnen“** im Taskleisten-Symbol, um das Fenster wieder in den Vordergrund zu holen.
- Um die Anwendung vollständig zu beenden, wählen Sie den Befehl im Menü **„Datei“** (oder im Taskleisten-Menü).

## Benachrichtigungen

grommunio Desk löst **betriebssystemnative Benachrichtigungen** (Windows, macOS und Linux) für
neue E-Mails und andere Ereignisse aus, sodass diese im normalen
Benachrichtigungsbereich Ihres Betriebssystems angezeigt werden, auch wenn sich das Fenster im Hintergrund befindet. Stellen Sie sicher, dass
Benachrichtigungen für grommunio Desk in Ihren Betriebssystemeinstellungen zugelassen sind.

## Standard-E-Mail-Handler (mailto-Links)

grommunio Desk kann als Handler Ihres Systems für `mailto:`-Links fungieren. Wenn Sie
in einer anderen Anwendung auf eine E-Mail-Adresse klicken, öffnet grommunio Desk eine neue
Nachricht – und fragt Sie, über welchen der verbundenen Server die Nachricht gesendet werden soll, falls Sie über mehrere verfügen.

## Konfigurations- und Protokolldateien

Anwendungsdaten werden pro Benutzer im Konfigurationsverzeichnis des Betriebssystems gespeichert:

| Plattform | Konfiguration | Protokolle |
| --- | --- | --- |
| **Linux** | `~/.config/grommunio Desk/config.json` | `~/.config/grommunio Desk/logs/` |
| **macOS** | `~/Library/Application Support/grommunio Desk/config.json` | `~/Library/Application Support/grommunio Desk/logs/` |
| **Windows** | `%APPDATA%\grommunio Desk\config.json` | `%APPDATA%\grommunio Desk\logs\` |

Die Protokollierung ist standardmäßig deaktiviert und kann bei der
Fehlerdiagnose in der Konfiguration aktiviert werden; ist sie aktiviert, werden ein `main.log` und ein `renderer.log`
in das oben genannte Verzeichnis `logs` geschrieben.

:::note
grommunio Desk ist Open Source (AGPL-3.0). Der Quellcode und das Issue-Tracking sind zu finden unter
[github.com/grommunio/grommunio-desk](https://github.com/grommunio/grommunio-desk).
:::
