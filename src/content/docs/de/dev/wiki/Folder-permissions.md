---
title: "Ordnerberechtigungen"
description: "Berechtigungen in Postfächern funktionieren ganz anders als die „Discretionary Access Controls“ in einem Unix-Dateisystem. Objekte in einem Postfach speichern keine Informationen zum Eigentümer…"
sidebar:
  order: 60
---

Die Berechtigungen innerhalb von Postfächern funktionieren ganz anders als die „Discretionary Access Controls“ in einem Unix-Dateisystem. Objekte in einem Postfach speichern keine Informationen zum Eigentümer. Die Berechtigung für bestimmte Aktionen hängt vollständig von den Zugriffsberechtigungen ab, die für dieses Postfach und/oder dessen Unterabschnitte eingerichtet wurden. Ein Benutzer, der ein Objekt erstellt hat, kann dieses möglicherweise nicht mehr ändern oder löschen. Bei privaten Postfächern erhält der natürliche Eigentümer implizit das Recht „OWNER“ für alle Objekte im privaten Postfach. Für öffentliche Postfächer gibt es in der SQLite3-Datei in der Tabelle `configurations` eine Einstellung: Schlüssel `CONFIG_ID_DEFAULT_PERMISSION` mit dem Wert `frightsReadAny | frightsCreate | frightsVisible | frightsEditOwned | frightsDeleteOwned` (0x41b) und Schlüssel `CONFIG_ID_ANONYMOUS_PERMISSION` mit dem Wert `frightsNone` (0), die wirksam wird, wenn kein anderer Eintrag aus der Tabelle `permissions` übereinstimmt.
