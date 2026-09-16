---
title: "Gromox CLI Dienstprogramme"
description: "Die Low-Level-Befehlszeilentools der Serie Gromox, die direkt auf Speicherspeicher und Postfächer einwirken – gromox-mbop-Postfachoperationen, Erstellung von Speicherspeichern, Überprüfung/Reparatur, Größenanpassung, Snapshots sowie Import/Export."
sidebar:
  label: "Gromox-CLI-Dienstprogramme"
  order: 10
---

Während [`grommunio-admin`](/cli/grommunio-admin/) die *Verwaltungs*ebene
(Benutzer, Domänen, Konfiguration) verwaltet, wirken die **`gromox-*`**-Dienstprogramme direkt auf die
Speicherebene ein – die benutzerspezifischen **Speicher** (`exchange.sqlite3` sowie die
Anhänge/Inhaltsdateien). Sie befinden sich unter `/usr/sbin` und
`/usr/libexec/gromox/` und sind die richtigen Werkzeuge für Wartung, Reparatur und
Migration auf Datenebene.

:::caution
Diese Tools greifen auf Daten in aktiven Postfächern zu. Einige davon sind destruktiv. Erstellen Sie vor
Massen- oder Reparaturvorgängen einen
[Snapshot](#gromox-snapshot) oder ein Backup und
führen Sie diese Vorgänge vorzugsweise zu Zeiten mit geringem Datenverkehr durch.
:::

## gromox-mbop

`gromox-mbop` („Postfachoperationen“) ist das Arbeitspferd für postfachspezifische Aktionen.
Es wählt immer zuerst ein Zielpostfach aus und führt dann eine oder mehrere Aktionen aus:

```bash
gromox-mbop -u jdoe@example.com <action> [args...]
```

Auf der [`gromox-mbop(8)`](/man/gromox-mbop-8/)-Handbuchseite finden Sie Informationen zu allen Aktionen und
Optionen. Die für Administratoren wichtigsten Aktionen:

| Aktion | Was sie bewirkt |
| --- | --- |
| `emptyfld` | Einen oder mehrere Ordner leeren. `--soft` ahmt das Löschen durch einen Client nach; `-R` durchläuft Unterordner rekursiv; `-t age` beschränkt sich auf Elemente, die älter als *age* sind. |
| `delmsg` | Löscht bestimmte Nachrichten aus einem Ordner (`-f folder`) anhand der Nachrichten-ID. |
| `purge-softdelete` | Endgültiges Löschen von vorläufig gelöschten („wiederherstellbaren“) Elementen. `-r` durchläuft Unterordner rekursiv; `-t timespec` beschränkt die Auswahl nach Alter. |
| `purge-datafiles` | Anhangs- und Inhaltsdateien auf der Festplatte entfernen, auf die keine Nachricht mehr verweist. |
| `vacuum` | Die SQLite-Datenbank des Speichers (`VACUUM`) komprimieren. |
| `recalc-sizes` | Die gemeldete Größe des Speichers neu berechnen. |
| `ping` | Das Postfach auf dem Server öffnen – eine schnelle Überprüfung: „Ist der Speicher in Ordnung?“ |
| `unload` | Den Store aus dem Arbeitsspeicher-Cache des Servers entfernen. |
| `set-locale` | Die Ländereinstellung des Postfachs festlegen (bestimmt die übersetzten Namen der integrierten Ordner). |
| `get-photo` / `set-photo` / `clear-photo` | Das Kontaktbild des Benutzers lesen, festlegen oder entfernen. |
| `get-websettings` / `set-websettings` | Die benutzerspezifischen grommunio Web-Einstellungen (JSON). |
| `sync-midb` | Den von den IMAP/POP-Frontends verwendeten midb-Index neu erstellen. |
| `clear-rwz` | Die zwischengespeicherten Outlook-Regel-Organizer-Meldungen (`IPM.RuleOrganizer`) entfernen. |
| `clear-profile` | Löschen Sie das zwischengespeicherte PHP-MAPI-Profil für den Store. |
| `cgkreset` | Setzen Sie die Änderungsnummern/Schlüssel aller Objekte zurück – ein Wiederherstellungsschritt bei Synchronisationsfehlern. |

### Angaben zum Ordner

Ordner werden entweder über einen **symbolischen Namen** (unabhängig von den Spracheinstellungen
) oder über einen **Pfad** angesprochen:

```bash
gromox-mbop -u jdoe@example.com emptyfld --soft JUNK
gromox-mbop -u jdoe@example.com emptyfld "/Top of Information Store/Archive/2022"
```

Zu den anerkannten symbolischen Namen gehören `INBOX`, `SENT`, `DRAFT`, `OUTBOX`, `JUNK`,
`DELETED` (auch bekannt als `TRASH`/`WASTEBASKET`), `CALENDAR`, `CONTACTS`, `TASKS`,
`NOTES`, `JOURNAL` und `IPM_SUBTREE`. Der Schrägstrich dient immer als Hierarchietrennzeichen
(symbolische Namen funktionieren nur bei privaten Speichern).

### Befehlsketten

Für ein Postfach können mehrere Aktionen miteinander verkettet werden, indem man jede einzelne in Klammern setzt:

```bash
gromox-mbop -u jdoe@example.com ( purge-softdelete -r / ) ( purge-datafiles )
```

### Eine Aktion für alle Postfächer ausführen

Der Pseudo-Befehl `foreach.*` wiederholt eine Aktion für viele Postfächer – ideal
für flottenweite Wartungsarbeiten:

```bash
# Every mailbox hosted on this server
gromox-mbop foreach.mb.here purge-softdelete -r -t 30d /
```

## Shop-Erstellung

Die Speicher werden normalerweise von `grommunio-admin user create` für Sie bereitgestellt. Die
zugrunde liegenden Primitive stehen bei Bedarf direkt zur Verfügung:

| Tool | Zweck |
| --- | --- |
| [`gromox-mkprivate(8)`](/man/gromox-mkprivate-8/) | Einen leeren **privaten** (benutzerspezifischen) Speicher anlegen. |
| [`gromox-mkpublic(8)`](/man/gromox-mkpublic-8/) | Einen leeren **öffentlichen** (pro Domain) Speicher erstellen. |

## Wartung und Inspektion

### gromox-mbck

Überprüfen Sie einen Briefkasten auf bauliche Mängel und beheben Sie diese vorsichtig.

```bash
gromox-mbck jdoe@example.com
```

Siehe [`gromox-mbck(8)`](/man/gromox-mbck-8/). Führen Sie den Vorgang auf einem in den Ruhezustand versetzten Postfach durch und erstellen Sie
zuvor einen Snapshot.

### gromox-mbsize

Die Größe eines Postfachs und die Ursachen für den Speicherverbrauch melden – praktisch für die
Überprüfung von Kontingenten.

```bash
gromox-mbsize jdoe@example.com
```

Siehe [`gromox-mbsize(8)`](/man/gromox-mbsize-8/).

### gromox-dbop

Pflege der Benutzerdatenbank für die Verwaltungsdatenbank (Schema-Upgrades und
damit verbundene Vorgänge). Siehe [`gromox-dbop(8)`](/man/gromox-dbop-8/).

### gromox-mailq

Die Warteschlange des lokalen Zustelldienstes anzeigen – nützlich, wenn die Post offenbar feststeckt.

```bash
gromox-mailq
```

Siehe [`gromox-mailq(8)`](/man/gromox-mailq-8/).

## gromox-Snapshot

Erstellen Sie eine speicherplatzsparende Momentaufnahme des Postfachspeichers auf einem
Copy-on-Write-Dateisystem (z. B. Btrfs):

```bash
/usr/libexec/gromox/gromox-snapshot
```

Planen Sie dies über einen systemd-Timer, um regelmäßige Backups mit geringem Overhead durchzuführen. Siehe
[`gromox-snapshot(8)`](/man/gromox-snapshot-8/).

## Import und Export

Für Migrationen und die Datenwiederherstellung kann Gromox Nachrichten zwischen Postfächern und
Festplattenformaten verschieben. Die Konvertierungstools bilden eine kleine Pipeline – zum Beispiel
[`gromox-eml2mbox(8)`](/man/gromox-eml2mbox-8/) und
[`gromox-mbox2mt(8)`](/man/gromox-mbox2mt-8/) verbinden RFC 5322-/mbox-Daten mit dem
internen „Mail-Transfer“-Format, das in einen Speicher geladen wird. Die
Seite [Mailbox-Übertragungsformat](/dev/gromox/mtformat/) beschreibt das Format
ausführlich; den vollständigen Satz finden Sie im [Man-Pages](/man/)-Index.
