---
title: "Fehlerbehebung"
description: "Behebungen für die Probleme, auf die Nutzer von grommunio am häufigsten stoßen – Anmeldung, fehlerhaftes Laden der Weboberfläche, fehlende E-Mails und Synchronisierung mit Mobilgeräten."
sidebar:
  order: 40
---

Häufige Probleme und wie Sie diese selbst beheben können. Sollte keine dieser Lösungen helfen, wenden Sie sich bitte an
Ihren Administrator oder die [grommunio-Community](https://community.grommunio.com).

## Anmelden

Falls Sie sich nicht bei grommunio Web anmelden können:

- Vergewissern Sie sich, dass Sie Ihre **vollständige E-Mail-Adresse** als Benutzernamen verwenden
  und dass die Feststelltaste deaktiviert ist.
- Vergewissern Sie sich, dass die **Serveradresse** in der Adressleiste Ihres Browsers mit der übereinstimmt,
  die Ihnen Ihr Administrator mitgeteilt hat.
- Wenn Sie Ihr Passwort kürzlich geändert haben, stellen Sie sicher, dass verbundene Apps und mobile
  Geräte das neue Passwort verwenden.
- Immer noch Probleme? Möglicherweise ist Ihr Konto gesperrt oder deaktiviert – wenden Sie sich an Ihren Administrator.

## Die Weboberfläche scheint fehlerhaft oder veraltet zu sein

Nach einem Update verwendet der Browser möglicherweise weiterhin zwischengespeicherte Dateien:

- Seite unter Umgehung des Caches neu laden: <kbd>Strg</kbd>+<kbd>Umschalt</kbd>+<kbd>R</kbd>
  (Windows/Linux) oder <kbd>Cmd</kbd>+<kbd>Umschalt</kbd>+<kbd>R</kbd> (macOS).
- Sollten die Probleme weiterhin bestehen, leeren Sie den Cache Ihres Browsers für die Website grommunio oder versuchen Sie es
  in einem privaten/Inkognito-Fenster, um eine Erweiterung als Ursache auszuschließen.
- Verwenden Sie eine aktuelle Version eines gängigen Browsers (Edge, Chrome, Firefox oder
  Safari).

## Eine Nachricht, die ich erwartet hatte, ist nicht angekommen

- Überprüfen Sie den Ordner **„Junk“** – die Nachricht wurde möglicherweise als Spam gefiltert; markieren Sie sie
  als *„Kein Junk“*, um den Filter zu trainieren und die Nachricht zurückzuholen.
- Überprüfen Sie Ihre **Nachrichtenregeln** (Einstellungen → Regeln), falls eine Regel die Nachricht verschoben oder gelöscht
  hat.
- Fragen Sie den Absender, ob er eine Zustellungsbestätigung erhalten hat. Falls ja, leiten Sie deren
  Text an Ihren Administrator weiter.

## Mobile Geräte (Exchange ActiveSync)

Sollten die Synchronisationsprobleme mit Ihrem Mobilgerät weiterhin bestehen und eine normale Neusynchronisierung
keine Abhilfe geschaffen haben, setzen Sie die Verbindung des Geräts zurück:

1. Entfernen Sie das grommunio-Konto vom Mobilgerät.
2. Gehen Sie in grommunio Web zu **Einstellungen → Mobilgeräte** und entfernen Sie das
   Gerät bzw. die Geräte.
3. Warten Sie mindestens **fünfzehn Minuten**.
4. Erstellen Sie das Konto auf dem Mobilgerät neu.

Dadurch wird der serverseitige Synchronisierungsstatus zurückgesetzt, sodass das Gerät eine vollständige
Synchronisierung durchführt.
