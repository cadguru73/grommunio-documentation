---
title: "Microsoft Exchange"
description: "PFF (vgl. Zusammenfassung aus dem Forensics Wiki) ist ein Format, das aus Outlook und Exchange exportiert werden kann. Outlook nutzt dieses Format für verschiedene Szenarien, und…"
sidebar:
  order: 20
---

PFF (vgl. [Zusammenfassung aus dem Forensics Wiki](https://forensics.wiki/personal_folder_file_%28pab%2C_pst%2C_ost%29/)) ist ein Format, das aus Outlook und Exchange exportiert werden kann. Outlook nutzt dieses Format für verschiedene Szenarien und bezeichnet es dabei mit unterschiedlichen Namen (*.pst*, *.ost*), es handelt sich jedoch um ein und denselben Dateityp.

- *.pst*-Dateien können interaktiv mit Outlook erstellt werden
- *.ost*-Dateien können aus dem Verzeichnis *C:Users...* übernommen werden
- *.pst*-Dateien können auch über die PowerShell von Exchange Server weitgehend automatisiert erstellt werden

## Interaktiver Export von Outlook

Sobald das Hauptfenster von Outlook geöffnet ist, wählen Sie „Datei“, „Öffnen & Exportieren“, „Importieren/Exportieren“:

![](/img/olexport1.png)

![](/img/olexport2.png)

Befolgen Sie anschließend die übliche Dialogkette.

![](/img/olexport3.png)

![](/img/olexport4.png)

![](/img/olexport5.png)

![](/img/olexport6.png)

:::caution
Bevor Sie versuchen, PFF-Dateien zu kopieren, stellen Sie sicher, dass die Datei(en) nirgendwo mehr geöffnet ist/sind. Auch nach dem Schließen von Outlook kann Outlook noch einige Sekunden lang im Hintergrund weiterlaufen, *insbesondere* wenn das MAPI-Profil den *Cached Mode* von Exchange verwendet hat. Es wurden verschiedene Fehlerzustände beim Versuch, auf aktive PFF-Dateien zuzugreifen, beobachtet, wie zum Beispiel:

1\. In der `cmd.exe`-Shell erzeugt der Befehl `type stillactive.pst >new.pst` die Datei „new.pst“ mit einer Größe von nur 512 Byte, bevor er mit der Meldung `The process cannot access the file because another process has locked a portion of the file` abgebrochen wird.

2\. Unter der `cmd.exe`-Shell kann der Befehl `scp stillactive.pst a@b.com:` die Datei auf dem Zielsystem erstellen, jedoch bestehen alle Bytes aus ASCII-NUL-Bytes. (Dies wurde bei Powershell-OpenSSH v8.x beobachtet; in 9.x behoben). scp gibt die Protokollmeldung `Domain error` aus.

3\. PFF-Dateien enthalten eine CRC-32-Prüfsumme, die sich während der Nutzung der Datei leicht ändern kann. Versuche, die Datei unterhalb von Windows zu lesen (z. B. auf Speicher- oder Hardwareebene), oder der Versuch, eine PFF-Datei zu verwenden, die nicht ordnungsgemäß geschlossen wurde, können dazu führen, dass gromox-pff2mt die Eingabe ablehnt.
:::

## gromox-pff2mt importieren

Auf dem System grommunio können PFF-Dateien über die Befehlszeile mit den Befehlen [gromox-pff2mt](/man/gromox-pff2mt-8/) und [gromox-mt2exm](/man/gromox-mt2exm-8/) importiert werden. Es handelt sich hierbei um zwei Befehle, die über eine Pipe miteinander verkettet werden sollen; Informationen zur Aufrufsyntax finden Sie in den verlinkten Handbuchseiten.

![](/img/gxpff2mt.png)

![](/img/gxdone.png)

## Automatisierte Massenmigration mit `exchange2grommunio.ps1`

Für die Migration zahlreicher Postfächer enthält grommunio ein PowerShell-Skript —
[`exchange2grommunio.ps1`](https://github.com/grommunio/gromox/blob/master/tools/exchange2grommunio.ps1) —
das den gesamten Ablauf von Anfang bis Ende automatisiert. Für jedes Exchange-Postfach exportiert es eine
`.pst`, stellt diese dem grommunio-Server über einen freigegebenen Ordner zur Verfügung und
importiert sie dort über SSH – wobei optional auch die grommunio-Postfächer angelegt werden.

### So funktioniert es

Für jedes ausgewählte Postfach führt das Skript folgende Schritte aus:

1. Exportiert das Postfach mit `.pst` und `New-MailboxExportRequest` in einen freigegebenen
   Ordner, in den das Exchange-Subsystem schreiben kann.
2. Stellt über SSH (unter Verwendung von `plink.exe`) eine Verbindung zum grommunio-Server her, auf dem derselbe
   Ordner eingebunden ist (`mount.cifs`), und importiert die `.pst`.
3. Löscht optional anschließend die `.pst`, um Speicherplatz zu sparen, und protokolliert das
   Ergebnis.

Erfolgreiche Importe werden in `exchange2grommunio.done` geschrieben, Fehlschläge in
`exchange2grommunio.failed`, sodass ein Durchlauf fortgesetzt oder wiederholt werden kann.

### Voraussetzungen

- grommunio ist an demselben **LDAP/AD** wie Exchange angeschlossen, daher müssen Benutzer auf
  beiden Seiten die Auflösung vornehmen (LDAP vor dem Import testen).
- Das Skript wird in einer **Exchange-Verwaltungsshell mit erhöhten Rechten** ausgeführt (Windows
  Server 2012 R2 oder neuer, PowerShell 2.0+; 3.0+ wird empfohlen, damit die Ausgabe des Linux-Befehls
  in den Protokollen erfasst wird).
- **`plink.exe`** (aus PuTTY) befindet sich im selben Verzeichnis wie das Skript;
  optional **`pageant.exe`** für die SSH-Authentifizierung per öffentlichem Schlüssel.
- Ein **freigegebener Ordner** (UNC-Pfad), in den das Exchange-Subsystem schreiben kann und
  den der grommunio-Server einbinden kann (`cifs-utils` installiert), mit ausreichend Speicherplatz
  für die `.pst`-Dateien.
- SSH-Zugriff auf den grommunio-Server, dessen Host-Schlüssel bereits von
  `plink.exe` akzeptiert wurde.

### Wichtige Einstellungen

Alle Einstellungen befinden sich am Anfang des Skripts (oder in einer separaten Konfigurationsdatei).
Die wichtigsten davon:

| Variable | Zweck |
| --- | --- |
| `$GrommunioServer` | FQDN des Zielservers grommunio |
| `$WinSharedFolder` / `$LinuxSharedFolder` | Der freigegebene Ordner `.pst`, wie er von Windows (UNC) und von Linux (Einhängepunkt) aus gesehen wird |
| `$LinuxUser` | Shell-Benutzer auf der grommunio-Seite (z. B. `root`) |
| `$LinuxUserPWD` / `$LinuxUserSSHKey` / `$UsePageant` | SSH-Authentifizierung: Passwort, privater Schlüssel (`.ppk`) oder Schlüssel über Pageant |
| `$WindowsUser` / `$WindowsPassword` | Windows-Konto, das zum Einbinden der Freigabe auf Linux verwendet wird |
| `$AutoMount` | Die Freigabe auf Windows automatisch auf dem Server grommunio einbinden |
| `$DeletePST` | Nach erfolgreichem Import jeweils `.pst` löschen |
| `$MailboxLanguage` | Sprache für neu erstellte Postfächer (siehe `/usr/share/grommunio-admin-api/res/storelangs.json`) |
| `$Organization` | `-o <id>`, wenn erstellte Postfächer domänenübergreifende Aliase haben |
| `$MigrationPriority` | `New-MailboxExportRequest` Priorität (`Normal` ist in der Regel schneller als `High`) |
| `$LogFile` | Zusammenfassungsprotokoll; Export-/Importprotokolle pro Postfach finden Sie unter `<share>\logs\` |

### Auswahl der zu migrierenden Postfächer

- **Zulassungsliste:** Setzen Sie `$ImportMboxes` (ein Array von Adressen) oder, falls diese leer ist,
  liest das Skript die Adressen aus der Datei `exchange2grommunio.import` auf der
  Freigabe. Wenn beide Felder leer bleiben, werden **alle** Postfächer migriert.
- **Sperrliste:** `$IgnoreMboxes` / die Datei `exchange2grommunio.ignore` schließt
  Postfächer aus (wird immer berücksichtigt).

:::tip[Importliste aus grommunio erstellen]
Sie können die Liste der vorhandenen grommunio-Postfächer direkt erstellen:

```bash
gromox-mbop foreach.mb echo-username > /mnt/pst/exchange2grommunio.import
```

Um nur die fehlgeschlagenen Vorgänge erneut auszuführen, kopieren Sie die Liste der fehlgeschlagenen Vorgänge in die Importliste
(`cp exchange2grommunio.failed exchange2grommunio.import`).
:::

### Anlegen von Postfächern während der Migration

Zwei Schalter legen fest, ob das Skript auch die grommunio-Postfächer einrichtet
(dafür ist eine funktionierende LDAP-Konfiguration erforderlich):

| `$CreateGrommunioMailbox` | `$OnlyCreateGrommunioMailbox` | Verhalten |
| --- | --- | --- |
| `$false` | `$false` | Nacheinander in **vorhandene** Postfächer migrieren |
| `$true` | `$false` | Jedes Postfach nacheinander **erstellen und dann migrieren** |
| `$true` | `$true` | **Zwei Durchläufe**: Zuerst alle Postfächer erstellen, dann erneut ausführen, wobei beide auf `$false` gesetzt sind, um die Daten zu migrieren |

Der Zwei-Schritt-Modus wird für umfangreiche Migrationen empfohlen: Die Benutzer können sofort in
grommunio mit leeren Postfächern arbeiten (neue E-Mails kommen wie gewohnt an), während die
historischen Daten im Hintergrund importiert werden.

### Ausführung

Führen Sie das Skript in der Exchange-Verwaltungs-Shell mit erhöhten Rechten aus:

```powershell
.\exchange2grommunio.ps1
```

- Für einen **unbeaufsichtigten** Durchlauf setzen Sie `$WaitAfterImport = $false` und
  `$StopOnError = $false`, damit das Skript bei einem Fehler nicht blockiert und
  auf den Administrator wartet.
- Um den Vorgang **ordnungsgemäß zu beenden**, erstellen Sie die Stopp-Marker-Datei (`exchange2grommunio.STOP`)
  auf der Freigabe – das Skript schließt die aktuelle Mailbox ab und wird anschließend beendet.

Der zugrunde liegende Import auf der grommunio-Seite verwendet dieselben Werkzeuge wie der manuelle
Pfad ([gromox-pff2mt](/man/gromox-pff2mt-8/) → [gromox-mt2exm](/man/gromox-mt2exm-8/)),
daher gelten die [oben genannten Import-Hinweise](#gromox-pff2mt-import) gelten gleichermaßen.
