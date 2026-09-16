---
title: "Meet"
description: "Aktivieren Sie das Meet-Plugin, um browserbasierte Videokonferenzen durchzuführen, und fügen Sie Meet-Links zu Terminen und Besprechungen in grommunio Web hinzu."
sidebar:
  order: 90
---

Die Funktion Meet integriert grommunio Meet in grommunio Web und ermöglicht browserbasierte Videokonferenzen über generierte oder benutzerdefinierte Meeting-URLs.

## Aktivieren des Meet-Plugins

So aktivieren Sie die Funktion Meet:

1. Melden Sie sich bei **grommunio Web** an.
2. Navigieren Sie zu **Einstellungen**.
3. Öffnen Sie den Abschnitt *Plugins*.
4. Aktivieren Sie das Plugin, indem Sie das Kontrollkästchen **Meet** aktivieren.
5. Klicken Sie auf **Übernehmen**, um die Konfiguration zu speichern.
6. Laden Sie die grommunio Web-Oberfläche neu.

Nach dem Neuladen stehen dem Benutzer die Funktionen des Meet zur Verfügung.

Nach der Aktivierung erscheint ein neuer Eintrag **Meet** in der *Shortcut-Leiste* der grommunio Web-Benutzeroberfläche.

## Funktionen der Registerkarte „Meet“

Wenn Sie auf den Eintrag **Meet** in der *Shortcut-Leiste* klicken, wird die Registerkarte „Meet“ geöffnet.

![The Meet tab in grommunio Web with a field to enter a meeting name, a Start meeting button, and an empty recent meetings list](/img/web/web-p098-1.png)

Die Registerkarte „Meet“ bietet folgende Funktionen:

### Individuelle Gestaltung des Meeting

- Benutzer können ein **benutzerdefiniertes Schlüsselwort** eingeben, um einen Besprechungsraum zu erstellen.
- Das Schlüsselwort wird an die Basis-URL „Meet“ angehängt, um einen eindeutigen Besprechungslink zu bilden:

  `https://mail.domain/meet/<keyword>`
- Der generierte Link kann an die Teilnehmer der Besprechung weitergegeben werden.

### Aktuelle Meetings-Liste

Die Registerkarte „Meet“ enthält außerdem eine Liste der **letzten Besprechungen**.

Diese Liste enthält Besprechungen, an denen der Benutzer zuvor teilgenommen hat oder die er erstellt hat.

Die jüngsten Treffen ermöglichen:

- Schneller erneuter Zugriff auf regelmäßig genutzte oder häufig verwendete Besprechungsräume
- Wiederverwendung bestehender Besprechungslinks, ohne ein neues Stichwort erstellen zu müssen

Einträge in der Sitzungsliste können vom Benutzer manuell gelöscht werden.

- Durch das Löschen eines Eintrags wird dieser lediglich aus der Liste entfernt
- Die zugrunde liegende URL der Besprechung bleibt gültig und kann weiterhin aufgerufen werden, sofern sie extern weitergegeben wurde

## Einen Meet-Link zu einem Termin hinzufügen oder Meeting

Meet-Links können auch direkt aus dem Kalender heraus erstellt werden.

1. Erstellen Sie einen neuen *Termin* oder *Meeting*.
2. Klicken Sie auf **Meeting hinzufügen**.
3. grommunio Web generiert automatisch einen Meet-Link.
4. Der Link wird eingefügt in:
   - das Feld **Ort**
   - das Feld **Notizen**

![A Calendar meeting with the generated Meet link shown in the Location field and a one-click join link in the Notes field](/img/web/web-p099-1.png)

So können eingeladene Teilnehmer mit einem einzigen Klick an der Besprechung teilnehmen.

:::note
Wenn ein Kalendereintrag einen bereits vorhandenen Link zu einer Besprechung enthält, wird die Option **An Webmeeting teilnehmen** angezeigt. Durch Auswahl dieser Option können Sie direkt an der zugehörigen Online-Besprechung teilnehmen, ohne den Link manuell kopieren oder eingeben zu müssen.
:::
