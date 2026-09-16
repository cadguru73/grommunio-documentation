---
title: "Inhalt der Debugging-Meldung"
description: "Klicken Sie in grommunio-web mit der rechten Maustaste auf die Nachricht und rufen Sie den Dialog „Optionen“ auf. Dort finden Sie ein Feld für die Objekt-ID. (g-web bietet diese Funktion beispielsweise für Calen nicht an…"
sidebar:
  order: 60
---

## Ermittlung der internen Nachrichten-ID

**Problem:** Sie müssen die interne ID eines Ordner- oder Nachrichtenobjekts ermitteln, das bereits in einem Gromox-Speicher vorhanden ist.

**Vorgehensweise:** Navigieren Sie in MFCMAPI zu dem gewünschten Profil / Speicher / Ordner / der Nachricht und öffnen Sie die Eigenschaft „PR_ENTRYID“ im Detail durch einen Doppelklick mit der Maus oder durch Drücken der ENTER-Taste. Im grauen Feld unten rechts wird die ID im Hexadezimalformat neben der Beschriftung „Folder Global `Counter`/\_Message Global `Counter`“ angezeigt (im Screenshot hervorgehoben). Stellen Sie sicher, dass sich das Profil im Online-Modus befindet, um einen verwertbaren Wert zu erhalten.

![](/img/mfcmapi_entryid1.png)

![](/img/mfcmapi_entryid2.png)

Klicken Sie in grommunio-web mit der rechten Maustaste auf die Nachricht und rufen Sie den Dialog „Optionen“ auf. Dort finden Sie ein Feld für die Objekt-ID. (g-web bietet diese Option beispielsweise für Kalender- und Kontaktelemente noch nicht an; im Dialog „Optionen“ für diese E-Mail-Elemente fehlt dieses Feld noch.)

![](/img/gweb-messageid.png)

## Objekte extrahieren

**Problem:** Sie möchten ein MAPI-Meldungsobjekt zur weiteren Diagnose extrahieren.

**Vorgehensweise:** Unter Verwendung der zuvor ermittelten Nachrichten-ID kann das Export-Dienstprogramm mit dem Befehl „exm2eml“ aufgerufen werden. „exm2eml“ bietet je nach den Anforderungen des Benutzers bzw. Entwicklers verschiedene Ausgabeformate an. Standardmäßig wird das RFC5322-Internet-Mail-Format generiert. Die Konvertierung vom MAPI- zum RFC5322-Internet-Mail-Format und zurück ist nicht unbedingt idempotent bzw. verlustfrei, sodass die Verwendung des Gromox-Nachrichtenübertragungsstromformats (GXMT) (mit `--mt`) oder TNEF (`--tnef`) gerechtfertigt sein.

``` sh
gromox-exm2eml --mt -u test@host.example.net 0x314cc >0x314cc.eml

gromox-exm2eml --mt -u test@host.example.net 0x314cc >0x314cc.mt
```

Wenn eine Nachricht in einen anderen Ordner verschoben wird, wird ihr eine neue Objekt-ID zugewiesen.

## Nachrichten in der Zustellung

**Beobachtung:** gromox-delivery gibt Protokollmeldungen zum Thema „Versandfehler“ aus.

``` text
# journalctl -u gromox-delivery
...
exmdb_client_do_rpc: Dispatch error
oxcmail_import:2870: returned false
SMTP message queue-ID: 2, FROM: doc@example.com, TO: doc@example.com  fail to convert rfc5322 into MAPI message object
```

**Ursache:** Die Verbindung TCP zwischen gromox-delivery und gromox-http (exmdb_provider-Teilkomponente) wurde unerwartet beendet. Die Routinen zur Konvertierung von Internet-E-Mails in MAPI-Objekte konnten daher nicht abgeschlossen werden.

**Zu ergreifende Maßnahme:** Überprüfen Sie die Systemprotokolle auf Hinweise darauf, dass gromox-http abgestürzt ist oder dass ein Administrator den Prozess absichtlich beendet hat.

---

**Beobachtung:** gromox-delivery gibt Protokollmeldungen zu fehlgeschlagenen Konvertierungen von RFC5322 nach MAPI aus, wie beispielsweise die folgenden (jedoch ohne den oben erwähnten „Dispatch-Fehler“).

``` text
# journalctl -u gromox-delivery
...
oxcical_import:1234: returned null/false
...
oxcmail_import:2870: returned false
SMTP message queue-ID: 2, FROM: doc@example.com, TO: doc@example.com  fail to convert rfc5322 into MAPI message object
```

**Ursache:** Nicht optimale Parsing-Routinen.

**Zu ergreifende Maßnahme:** Senden Sie die Nachrichtendatei an den Grommunio-Support, um die weitere Untersuchung zu erleichtern.

Die betreffende Nachricht sollte sich in `/var/lib/gromox/queue/save` befinden. Ein Konvertierungsfehler gilt als schwerwiegender Fehler, und es wird kein erneuter Versuch unternommen.

(Es gibt drei weitere Fehler, die nicht als schwerwiegend gelten. Diese sind: Die Benutzerdatenbank ist nicht verfügbar, ein Berechtigungsfehler auf der Festplatte oder ein Ereignis „Festplatte voll“. In diesen Fällen wird ein erneuter Zustellversuch unternommen, und die Nachrichten werden stattdessen in `/var/lib/gromox/queue/cache` abgelegt. Der erneute Zustellversuch könnte in einer zukünftigen Version von Gromox wegfallen, da Postfix bereits in der Lage ist, dies zu handhaben.)

Die Meldung lässt sich finden, indem man den Zeitstempel im Protokoll mit dem Zeitstempel des Dateiobjekts oder – genauer gesagt – mit dem Zeitstempel im Dateinamen selbst abgleicht. Der Dateiname besteht in der Regel aus einem Unix-Zeitstempel, einem beim Systemstart monoton ansteigenden Zähler (QID) und dem Hostnamen. Diese Datei kann kleine binäre Tags enthalten. Wenn Sie also mit dem Befehl `grep` nach der genauen Datei suchen und der Befehl die Fehlermeldung `Binary file matches` ausgibt, benötigen Sie möglicherweise die Option `--text`. Die folgenden Befehlsbeispiele sollen Ihnen bei der Konvertierung von und in Unix-Zeitstempel helfen.

``` text
perl -e 'print scalar localtime 1699956475'

date -d "2023-11-14 11:07:55" +%s
```

## Zugestellte Nachrichten & IMAP-Nachrichten

**Anmerkung:** Eine Nachricht erscheint in jedem MUA unvollständig, nachdem sie vom gromox LDA (gromox-Zustellung) in die Mailbox abgelegt wurde oder von einem IMAP-Client, der z. B. den Befehl IMAP APPEND verwendet, in die Mailbox abgelegt wurde.

**Ursache:** Die Konvertierung von Internet-Mail (IM) in MAPI ist von Natur aus verlustbehaftet, und bei der Konvertierung wurden unerwarteterweise zu viele Inhalte der IM-Nachricht ignoriert.

**Zu ergreifende Maßnahme:** Senden Sie die Original-EML-Kopie der Nachricht an den Grommunio-Support, um die weitere Untersuchung zu erleichtern.

Sehen Sie im Verzeichnis `/var/lib/gromox/user/XXX/eml/` nach. Der Dateiname entspricht in der Regel dem bei der Auslieferung verwendeten Namen (Unix-TS + QID + Hostname). Wurde die Datei zu einem späteren Zeitpunkt erstellt, kann sich dies in den Zeitstempeln widerspiegeln. Dies sollte ebenso wie die Verwendung von `grep` dabei helfen, die Auswahl an Dateien einzugrenzen. (Die Binär-Tags aus der Auslieferungsphase sind nicht vorhanden.)

Der Hostname-Teil kann `.midb` lauten. Ist dies der Fall, wurde diese Datei aus einem MAPI-Objekt synthetisiert und stellt *nicht die ursprüngliche EML-Form* aus delivery/IMAP dar.

## Aus einer MAPI-Quelle importierte Nachrichten

**Beobachtung:** Eine Nachricht erscheint in jedem MUA nach dem Import aus gromox-{kdb2mt,pff2mt,oxm2mt,mt2exm} unvollständig.

**Beobachtung:** Eine Nachricht weist fehlende oder beschädigte Metadaten, einen beschädigten Nachrichtentext auf oder es bestehen erhebliche Unterschiede in der Darstellung zwischen den Clients Outlook, grommunio-web oder einigen IMAP-Clients, sodass sie subjektiv als „defekt“ angesehen wird.

**Ursache:** Muss noch im Detail ermittelt werden. Importe über gromox-kdb2mt/pff2mt/oxm2mt sind praktisch verlustfrei (im Vergleich zu RFC5322-Konvertierungen), da das Datenmodell bereits MAPI ist. Einige Metadaten sowie interne IDs und Verweise werden neu generiert oder verworfen, damit die Nachrichten in der Ziel-Mailbox im Gromox-Format sinnvoll sind. Es werden jedoch nicht alle veralteten Metadaten verworfen, um eine möglichst verlustfreie Konvertierung zu gewährleisten; solche veralteten Daten können jedoch in Ausnahmefällen zu ungewöhnlichem Verhalten führen. (Beispielsweise ungewöhnliche Empfängeradresstypen.)

**Zu ergreifende Maßnahme:** Senden Sie die MT-Stream-Datei an den Grommunio-Support, um die weitere Untersuchung zu erleichtern.

Für gromox-kdb2mt: Die Standardausgabe des Prozesses gromox-kdb2mt in eine Datei aufzeichnen. Die Option `--only-obj` kann dazu beitragen, eine kleinere MT-Datei zu erzeugen. Je nach den Umständen kann jedoch der Zugriff auf die gesamte Datenbank (interaktiv oder über einen mysqldump) erforderlich sein, falls die MT-Datei nicht aussagekräftig genug ist.

Für gromox-pff2mt: Die Standardausgabe von gromox-pff2mt in eine Datei umleiten. Die Option `--only-nid` kann dabei helfen, eine MT-Datei mit minimaler Größe zu erstellen. Je nach den Umständen kann jedoch Zugriff auf die PFF-/PST-/OST-Datei erforderlich sein, falls die MT-Datei nicht aussagekräftig genug ist.

Für gromox-oxm2mt: Senden Sie die .msg-Datei an den Support.

Für gromox-tnef2mt: Senden Sie die .tnef-Datei an den Support.

## Aus den Dateien RFC5322/5545/6350 konvertierte Nachrichten

**Beobachtung:** Eine Nachricht wird in jedem MUA-Dateiformat nach dem Import aus gromox-eml2mt, gromox-ical2mt oder gromox-vcf2mt unvollständig angezeigt.

**Ursache:** Die Konvertierung von Internet-Mail (IM) in MAPI ist von Natur aus verlustbehaftet, und bei der Konvertierung wurden unerwarteterweise zu viele Inhalte der IM-Nachricht ignoriert.

**Zu ergreifende Maßnahme:** Senden Sie die Originaldatei im EML-, iCal- oder vCard-Format an den Grommunio-Support, um die weitere Untersuchung zu erleichtern.

## Nachrichten im Ruhezustand

**Anmerkung:** Bestimmte Vorgänge an einem Postfach, die bestehende Nachrichten betreffen, funktionieren nicht wie erwartet. Beispiele für Anwendungsfälle, auf die dies zutrifft:

- Verschieben von Nachrichten zwischen Ordnern
- Zuweisen von Kategorien zu Nachrichten
- Verfassen oder Versenden von Nachrichten
- Konvertierung von MAPI in RFC5322 für ausgehende E-Mails

**Grund:** Wird individuell festgelegt.

**Zu ergreifende Maßnahme:** Der Grommunio-Support benötigt zur Reproduktion möglicherweise das Nachrichtenobjekt (vgl. „Objekte extrahieren“) oder die gesamte SQLite-Datei, die sich z. B. unter `/var/lib/gromox/X/exmdb/exchange.sqlite3` befindet.

## In RFC5322/5545/6350-Dateien konvertierte Nachrichten

**Beobachtung:** gromox-http oder gromox-zcore gibt eine Protokollmeldung über eine fehlgeschlagene Konvertierung von MAPI nach RFC5322 aus, die etwa wie folgt lautet.

``` text
# journalctl -u gromox-zcore
...
user=test@host.example.net host=::ffff:192.0.2.37  W-1281: Failed to export to RFC5322 mail while sending mid:0x5001b
```

**Ursache:** Vermutlich hat die Software nicht damit gerechnet, dass bestimmte Metadaten in der Nachricht fehlen.

**Zu ergreifende Maßnahme:** Wenden Sie sich an den Grommunio-Support, um den Zugriff auf die SQLite3-Datei zu ermöglichen. (Der Konvertierungsvorgang sollte bei allen MAPI-Meldungen stets erfolgreich verlaufen.)

## Ausgehende Nachrichten

**Feststellung:** Eine Nachricht im Ordner „Gesendete Objekte“ scheint in Ordnung zu sein, kommt beim Empfänger in seinem Posteingang jedoch unvollständig an.

**Ursache:** Nicht optimale Exportroutinen.

**Zu ergreifende Maßnahmen:** Vor-Ort-Prüfung durch den Administrator, weitere Schritte in Absprache mit dem Grommunio-Support.

**Vorgehensweise:**

Ermitteln Sie die interne Nachrichten-ID (siehe oben auf der Seite). Im Beispiel-Screenshot lautet diese 0x314cc. Mit dieser ID lässt sich die Konvertierung von MAPI nach RFC5322 nachstellen:

``` sh
gromox-exm2eml -u test@host.example.net 0x314cc
```

Falls diese EML fehlerhaft aussieht: Die Exportroutine funktioniert nicht. Siehe Abschnitt „Nachrichten im Ruhezustand“.

Wenn diese EML in Ordnung aussieht: Suchen Sie nach Problemen im SMTP-Transport oder auf der Empfängerseite.
