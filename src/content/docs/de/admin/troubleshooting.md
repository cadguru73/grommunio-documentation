---
title: "Fehlerbehebung"
description: "Abonnementkunden können ein Support-Paket erstellen, indem sie den Befehl „grommunio-support“ ausführen, und das erstellte Support-Paket an den Support von grommunio senden…"
sidebar:
  order: 90
---

## Support-Paket

Abonnementkunden können ein Support-Paket erstellen, indem sie den Befehl `grommunio-support` ausführen, und das erstellte Support-Paket zur Analyse an den Support von grommunio senden: [support@grommunio.com](mailto:support@grommunio.com?subject=%5Bgrommunio%5D%20support%20request%3A%20TOPIC&body=License%3A%0D%0A%0D%0ASteps%20to%20reproduce%3A%0D%0A%0D%0AActual%20result%3A%0D%0A%0D%0AExpected%20result%3A%0D%0A%0D%0A---%0D%0A%0D%0AIf%20supplied%20with%20grommunio-support%20archive%20the%20following%20information%20is%20optional%3A%0D%0A%0D%0AEnvironment%20(Platform%2FOS)%3A%0D%0A%0D%0Agrommunio%20Version%3A%0D%0A%0D%0AKomponente%20(falls%20bekannt)%3A%0D%0A%0D%0AProtokolle%20(falls%20vorhanden)%3A%0D%0A%0D%0A---%0D%0A%0D%0AEigene%20Anmerkungen%3A%0D%0A%0D%0A---%0D%0A%0D%0AKontaktdaten%3A).

Das erstellte Archiv wird im Web-Stammverzeichnis des grommunio-Admin-Archivs bereitgestellt. Aus diesem Grund wird dringend empfohlen, das erstellte Support-Archiv zu löschen, sobald es an den grommunio-Support übermittelt wurde. Das Support-Archiv kann gelöscht werden, indem Sie auf die Konsole zugreifen und den Befehl `rm -f /usr/share/grommunio-admin-web/grommunio-support.txz` ausführen.

Die von grommunio-support erfassten Informationen umfassen:

- Absturzrelevante Informationen (Coredumps)
- Festplattenlayout (einschließlich LVM-Layout sowie SMART und Software-RAID)
- Konfigurationsauszug (einschließlich /etc und spezifischere Informationen, z. B. vom Webserver)
- Informationen zur Hochverfügbarkeit
- Informationen zum Arbeitsspeicher
- Netzwerkkonfiguration
- Prozessbezogene Informationen
- Sysconfig-Informationen

:::caution
Das Support-Paket enthält möglicherweise vertrauliche Informationen. Falls Sie diesbezüglich Bedenken haben, empfehlen wir Ihnen, bestimmte private Daten aus dem erstellten Archiv zu entfernen, bevor Sie es an den grommunio-Support senden. Support-Daten werden ausschließlich zu Diagnosezwecken verwendet und gelten als vertrauliche Informationen.
:::

:::note
Die Unterstützung ist ausschließlich auf den von grommunio bereitgestellten appliance-Systemen verfügbar. Bei SUSE-basierten Distributionen kann sie auch über eine Repository-Installation mittels des Pakets „grommunio-setup“ bereitgestellt werden, das eine Abhängigkeit vom Paket „supportutils“ aufweist.
:::

## Installationsprotokolle

Der Einrichtungsassistent des grommunio Appliance speichert sein Protokoll unter `/var/log/grommunio-setup.log`. Wenn beispielsweise die Zertifikatserstellung im Assistenten fehlschlägt, sollten die Gründe dafür in dieser Datei ersichtlich sein.

## Systemprotokolle

Das grommunio Appliance übernimmt die Systemprotokollierungseinstellungen vom systemd. Weitere Informationen finden Sie in der Manpage zu systemd-journald(8). Um die Protokolle anzuzeigen, verwenden Sie den Befehl journalctl(8) an der Eingabeaufforderung einer Root-Shell:

    journalctl -u gromox-http -n 1000
    journalctl -f

Nützliche Optionen, die beliebig miteinander kombiniert werden können, sind:

> - `-f` für den Follow-Modus
> - `-n`, um so viele der neuesten Zeilen anzuzeigen
> - `-u`, um die Anzeige auf eine bestimmte Serviceeinheit zu beschränken

Einige Protokolle werden nicht an „journald“, sondern in Dateien ausgegeben. Dazu gehören:

| URI-Präfix | Prozess | Dateien |
|----|----|----|
| `/dav` | nginx | `/var/log/nginx/grommunio-web-access.log`, `/var/log/nginx/grommunio-web-error.log` |
| `/dav` | php-fpm | `/var/log/grommunio-dav/grommunio-dav-php.log` |
| `/Microsoft-Server-ActiveSync` | nginx | `/var/log/nginx/grommunio-web-access.log`, `/var/log/nginx/grommunio-web-error.log` |
| `/Microsoft-Server-ActiveSync` | php-fpm | `/var/log/grommunio-sync/grommunio-sync-fpm.log` |
| `/web` | nginx | `/var/log/nginx/grommunio-web-access.log`, `/var/log/nginx/grommunio-web-error.log` |
| `/web` | php-fpm | `/var/log/gromox` |

## Coredumps

Auf dem grommunio Appliance ist standardmäßig „systemd-coredump“ installiert, sodass das System so konfiguriert ist, dass Dumps in das Verzeichnis `/var/lib/systemd/coredump` ausgegeben werden. Sollte es zu einem Absturz gekommen sein, der einen Speicherauszug in diesem Verzeichnis hinterlassen hat, stellen Sie die Speicherauszugsdatei dem Support-Team zur Verfügung und geben Sie die Versionsangaben der Pakete an (z. B. liefert der Befehl `rpm -qi gromox grommunio-index libexmdbpp0` die Felder „Version:“ und „Distribution:“). Beachten Sie, dass die Dateien, da es sich um einen vollständigen Speicherauszug handelt, sensible Informationen wie Benutzernamen, Passwörter, E-Mail-Texte usw. enthalten können.

Bei Systemen, die nicht auf dem appliance basieren, sollten Sie folgende Punkte beachten:

Wenn systemd-coredump installiert wird, setzt dieses Paket normalerweise `systemd-coredump.socket` auf „aktiv“ und legt eine Fragmentdatei in `/usr/lib/sysctl.d/` ab:

    kernel.core_pattern = |/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %e

Wenn diese Fragmentdatei vorhanden ist, wird diese Einstellung beim nächsten Systemstart wirksam. Das Vorhandensein einer weiteren Coredump-Middleware, einschließlich, aber nicht beschränkt auf Ubuntu `apport` oder Fedora `abrt`, kann dazu führen, dass mehrere sysctl-Fragmentdateien miteinander konkurrieren und nur eine davon den Vorrang erhält. Es ist ratsam, nicht mehr als eine solche Middleware zu verwenden.

Außerdem weisen die systemd-Versionen vor 251 eine relativ niedrige Speicherauszugsgrenze von nur 2 GB auf. Informationen zur Erhöhung dieses Wertes finden Sie unter `/etc/systemd/coredump.conf`.

Es ist möglich, auf Middleware zu verzichten und stattdessen die Funktion zum direkten Speichern in eine Datei aus dem Linux-Kernel zu nutzen, z. B. durch Setzen der entsprechenden sysctl-Variablen auf:

    kernel.core_pattern = /var/tmp/core.%E.%p

Dadurch werden Dateien ohne Komprimierung ausgegeben, was während der Entwicklung von Vorteil sein kann, für die Übertragung von Dumps jedoch weniger sinnvoll ist.
