---
title: "Datenbankprüfung"
description: "Anekdote zum Zeitaufwand: Die gesamte Datei „exchange.sqlite3“ wird gelesen. Auf einem AMD 5950X CPU mit SQLite 3.46 (läuft im Single-Thread-Modus) beträgt die Verarbeitungsgeschwindigkeit bei einem In-…"
sidebar:
  order: 160
---

Anekdote zur Laufzeit: Die gesamte Datei „exchange.sqlite3“ wird gelesen. Auf einem AMD 5950X CPU mit SQLite 3.46 (läuft im Single-Thread-Modus) beträgt die Verarbeitungsgeschwindigkeit bei einer Datei im Arbeitsspeicher etwa 104 MB/s. Daher beeinflussen langsame Speichermedien und sehr große Postfächer die Dauer des Vorgangs in der Praxis.

``` text
# sqlite3 /var/lib/gromox/domain/1/exmdb/exchange.sqlite3
sqlite> pragma integrity_check;
integrity_check
--------------------------------------------------
row 202171 missing from index state_username_index
row 208269 missing from index state_username_index
row 208282 missing from index state_username_index
row 208284 missing from index state_username_index
row 225182 missing from index state_username_index
row 226595 missing from index state_username_index
Tree 33990 page 33990 cell 260: invalid page number 4053928964
Tree 33990 page 33990 cell 259: invalid page number 4050783236
Tree 33990 page 33990 cell 255: invalid page number 333502732
Multiple uses for byte 1240 of page 33990
```

# Recovery

Wenn (nur) Indizes beschädigt sind, kann die Datei neu erstellt werden, sofern gromox-http die Datenbank gerade nicht aktiv nutzt:

``` sh
systemctl stop gromox-http
cd /var/lib/gromox/domain/1/exmdb/
(echo "PRAGMA foreign_keys=0;"; sqlite3 exchange.sqlite3 ".recover") | sqlite3 new.db
chmod u=rw,g=rw new.db
chown grommunio:gromox new.db
mv exchange.sqlite3 exchange.sqlite3.old
mv new.db exchange.sqlite3
systemctl restart gromox-http
```

Wir deaktivieren hier vorübergehend Fremdschlüssel (FK), da die Wiederherstellung Tabellen in einer Reihenfolge verarbeiten kann, die von FK-Einschränkungen nicht unterstützt wird.

(Es gibt auch einen alternativen Befehl für `.recover`:)

``` sh
sqlite3 exchange.sqlite3 ".clone new.db"
```

Die Wirksamkeit der Befehle „recover“ und „clone“ hängt vom Ausmaß der Beschädigung der Datenbankdatei ab. Strukturelle Probleme auf der Ebene SQLite werden (soweit möglich) behoben, doch können die wiederhergestellten Daten insgesamt weiterhin logische Fehler enthalten, z. B. zwei Benutzer mit derselben ID.

Wenden Sie sich an den grommunio-Support. Erstellen Sie Sicherungskopien.
