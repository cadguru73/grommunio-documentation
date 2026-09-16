---
title: "Schnellstart"
description: "Dieses Kapitel enthält eine kurze Anleitung, die als Checkliste für die Installation und Inbetriebnahme des grommunio dienen kann."
sidebar:
  order: 20
---

Dieses Kapitel enthält eine kurze Anleitung, die als Checkliste für die Installation und Inbetriebnahme des grommunio dienen kann.

- Laden Sie die Installation ISO von <https://download.grommunio.com/appliance/grommunio.x86_64-latest.install.iso> herunter. Bei dem Installationsimage handelt es sich um ein Hybrid-Installationsimage, das sich auch mit USB-Imaging-Tools wie GNU ddrescue oder <https://rufus.ie> auf einen USB-Stick übertragen lässt.
- Verwenden Sie das Installationsmedium von grommunio, um die Installation durchzuführen und die Konfiguration im Schnellstartmodus vorzunehmen, indem Sie die folgenden Kapitel durchgehen.
- Erstellen oder beantragen Sie TLS-Zertifikate für den sicheren, verschlüsselten Betrieb der Hauptdienste.
- Erstellen Sie die entsprechenden DNS-Einträge (A-, MX-, TXT- und CNAME-Einträge).
- Konfigurieren Sie den grommunio appliance, indem Sie grommunio-setup ausführen.

## Mindestanforderungen

Für die Installation von grommunio (oder bei Verwendung von grommunio Appliance) gelten die folgenden Mindestanforderungen:

- Server oder virtuelle Maschine (VMware, Xen, KVM oder Hyper-V) mit mindestens:
  - 4 CPU-Kernen
  - 6 GB RAM
  - 32 GB Systemfestplatte für das Betriebssystem und die Basisinstallation. Das Installationsprogramm
    überschreibt die **gesamte** Zielfestplatte (siehe den Hinweis unter *Installation*).
    Stellen Sie **zusätzlichen** Speicherplatz für Postfachdaten bereit – dies ist der größte Faktor bei der Dimensionierung
    und wächst mit der Benutzeranzahl und der Quote pro Postfach.
- Korrekt konfigurierte DNS-Einträge, mindestens zwei, zum Beispiel:
  - **\<FQDN\>**, zum Beispiel **mail.example.com**
  - **autodiscover.example.com**
- Ein TLS-Zertifikat, das alle DNS-Namen enthält, alternativ ein Wildcard-Zertifikat für die gesamte Domäne. (Let's Encrypt kann über grommunio-setup konfiguriert werden.) Wenn Sie bereits über ein Zertifikat verfügen, kann dieses wiederverwendet werden, sofern es im PEM-Format vorliegt und eine Datei die Zertifikatskette sowie das Serverzertifikat enthält, zusammen mit einer separaten Schlüsseldatei.

:::note
Es wird dringend empfohlen, den entsprechenden Eintrag *autodiscover.example.com* für DNS korrekt einzurichten, da AutoDiscover den Server andernfalls nicht ermitteln kann.
:::

:::caution
IPv6 muss unbedingt aktiviert sein, da viele Vorkonfigurationen darauf basieren. Eine „echte“ IPv6-Adresse ist nicht erforderlich, die Verfügbarkeit von `::1` reicht aus.
:::

Optionale Anforderungen:

- MX-Einträge vom Typ DNS für die Zustellung eingehender E-Mails.
- Zum Zeitpunkt der Zertifikatserstellung durch Let's Encrypt muss Port 80 für alle definierten DNS-Einträge erreichbar sein.

## Installation

1.  Herunterladen des bootfähigen x86-Images von download.grommunio.com: <https://download.grommunio.com/appliance/grommunio.x86_64-latest.install.iso>
2.  Laden Sie die Installationsdatei auf den Server, auf dem grommunio installiert werden soll.
3.  Starten Sie das Installationsprogramm und wählen Sie im Startmenü „Install grommunio_Appliance“, um appliance zu installieren.

:::caution
Beachten Sie, dass das Installationsprogramm Sie um Bestätigung bittet, bevor das Installationsziel gelöscht und überschrieben wird!
:::

![grommunio Appliance installer boot screen](/img/admin_quickstart_boot.png)

Nachdem das Image auf die Festplatte kopiert wurde, ist der appliance startbereit und kann nun eingerichtet werden.

## Einrichtung

Nach der Installation zeigt das appliance die Konsolenbenutzeroberfläche (CUI) des grommunio an. Ausführlichere Anweisungen zum Einrichtungsprozess finden Sie unter [grommunio Appliance-Konfiguration mit CUI/Einrichtung](/admin/installation/#grommunio-appliance-configuration-with-cuisetup)].

:::caution
Das ursprüngliche Root-Passwort ist nicht festgelegt (leer). Wenn Sie zur Eingabe des Passworts aufgefordert werden, drücken Sie einfach die Eingabetaste.
:::

Um den grommunio zu konfigurieren, gehen Sie wie folgt vor:

1.  Wählen Sie **„Systemkennwort ändern“**, um ein neues Root-Kennwort festzulegen.
2.  Wählen Sie **„Netzwerkkonfiguration“**, um die Netzwerkverbindung des appliance einzurichten.
3.  Wählen Sie **„Zeitzonenkonfiguration“**, um die richtige Zeitzone für den appliance einzurichten.
4.  Wählen Sie **„Zeitsynchronisationskonfiguration“**, um die richtigen Zeitserver (NTP) für genaue Datums- und Uhrzeiteinstellungen einzurichten.
5.  Wählen Sie **„grommunio-Einrichtungsassistent“**, um interaktiv durch die weitere Konfiguration geführt zu werden.
6.  (Optional) Wählen Sie **„Admin-Web-UI-Passwort ändern“**, um das Passwort nach der Einrichtung nach Ihren Wünschen zurückzusetzen.

Der „grommunio-Setup-Assistent“ ruft *grommunio-setup* auf, das über die CUI oder ein beliebiges anderes Terminal des appliance gestartet werden kann.

:::note
SSH ist standardmäßig aktiviert, daher kann grommunio-setup auch über eine SSH-Sitzung ausgeführt werden. Beachten Sie, dass Sie zunächst ein Passwort festlegen müssen, bevor Sie sich über SSH anmelden können.
:::

Um innerhalb des grommunio-Setup-Assistenten (grommunio-setup) zu navigieren, beachten Sie bitte die folgenden Navigationstipps:

- *\<TAB\>* dient zur Navigation durch Dialogelemente
- *\<ARROW-UP\>* oder *\<ARROW-DOWN\>* dienen zur Navigation innerhalb von Formularelementen (z. B. bei der Eingabe von Abonnementdaten) oder Menüauswahlen (bei der Datenbankeinrichtung)
- Die Tasten *\<j\>* oder *\<k\>* dienen zum Scrollen in längeren, inhaltsreichen Dialogen (wie im Abschlussdialog)
- *\<ESC\>* beendet grommunio-setup in jeder beliebigen Phase der Konfiguration

Weitere Tastenkombinationen werden bei Anzeige von „grommunio-cui“ am unteren Bildschirmrand angezeigt.

grommunio-setup gibt für die meisten Dialogfelder automatisch Standardwerte vor; diese können nach Belieben überschrieben werden. Beispielsweise generiert grommunio-setup automatisch Passwörter, die nach der Installation auch in der grommunio-setup-Protokolldatei */var/log/grommunio-setup.log* verfügbar sind.

:::caution
Sollte die Konfiguration aus irgendeinem Grund fehlschlagen, kann grommunio-setup erneut ausgeführt werden. Eine Neukonfiguration von Grund auf ist jedoch **destruktiv** und führt zu einer Neuinitialisierung der Installation. Wenn Sie systembezogene Parameter ändern möchten, verwenden Sie stattdessen die Verwaltungsschnittstelle grommunio. Bei jedem erneuten Aufruf von grommunio-setup wird eine Warnung angezeigt und eine Bestätigung angefordert, bevor Daten gelöscht werden.
:::

:::caution
Der Installationsvorgang wird in der Datei **/var/log/grommunio-setup.log** protokolliert. Beachten Sie, dass diese Datei alle Instanzkonfigurationen enthält, die zur Konfiguration von grommunio-setup verwendet wurden. Als Abonnementinhaber haben Sie Anspruch auf Support. Wenn Sie Hilfe benötigen, können Sie beispielsweise das Installationsprotokoll an grommunio senden. (Passwortangaben sollten entfernt werden.)
:::

:::caution
Es wird empfohlen, das Installationsprotokoll nach erfolgreicher Installation an einem sicheren Ort aufzubewahren und es vom appliance zu löschen. Alternativ kann das Installationsprotokoll an einem sicheren Ort als Referenz für alle Angaben zu Ihrer Installation zur späteren Verwendung aufbewahrt werden.
:::

### grommunio Admin-Benutzer

Im Rahmen des grommunio-setup-Prozesses werden einige Konten automatisch angelegt – beispielsweise ein Datenbankkonto für die Benutzerverwaltung sowie ein Konto für den anfänglichen grommunio-Administrator (admin).

:::caution
Der Admin-Benutzer von grommunio und der Root-Benutzer von appliance sind voneinander getrennte, nicht synchronisierte Benutzer. Der Admin-Benutzer ist ausschließlich dem grommunio Administration-Framework bekannt und ist (absichtlich) kein Systembenutzer. Die Anmeldedaten beider Benutzer sind sicher aufzubewahren. Der Root-Benutzer ist der Hauptsystemadministrator, während „admin“ der Hauptadministrator von grommunio ist. Sie können (und sollten) unterschiedliche Passwörter haben. Aufgrund des Rollenkonzepts von grommunio wird sogar empfohlen, diese Passwörter in der Produktion nicht zu verwenden, sondern stattdessen für regelmäßig auszuführende Aufgaben Benutzer mit geringeren Berechtigungen anzulegen.
:::

:::note
Das Passwort des Hauptadministrators kann jederzeit mit „grommunio-cui“ oder durch Eingabe von „`grommunio-admin passwd --password "ChangeMe"`“ geändert werden.
:::

### Repository-Konfiguration

Das interaktive Konfigurationstool grommunio-setup fordert während der Ausführung die Anmeldedaten für Ihr Abonnement an. Wenn Sie über ein gültiges Abonnement verfügen, geben Sie bitte Ihre Abonnementdaten ein. Ohne gültiges Abonnement aktiviert grommunio-setup die Community-Repositorys, die nach bestem Bemühen bereitgestellt werden und für die kein Support angeboten wird. Mit einem gültigen Abonnement wird Ihr Abonnement-Repository aktiviert und stellt kommerzielle Pakete für die Installation bereit, damit Sie stets über die neuesten Funktionen und Fehlerbehebungen auf dem Laufenden bleiben.

:::note
Um ein gültiges Abonnement zu erhalten, wenden Sie sich bitte an einen unserer Partner oder nutzen Sie unsere etablierten Kommunikationskanäle unter <https://grommunio.com>
:::

### Zertifikate

grommunio-setup bietet vier Möglichkeiten zur Bereitstellung des von allen Diensten verwendeten TLS-Zertifikats:

- **Selbstsigniertes Zertifikat** – die einfachste Option (Standardeinstellung); Clients müssen dem Zertifikat bei der ersten Verbindung vertrauen. Am besten geeignet für Demos und Validierungen, nicht für den Produktiveinsatz.
- **Eigene Zertifizierungsstelle (CA) + Zertifikat** – Erstellen Sie eine lokale Zertifizierungsstelle und signieren Sie Zertifikate damit; nützlich für größere Validierungsumgebungen mit mehreren Instanzen.
- **Vorhandenes Zertifikat importieren** – Verwenden Sie Ihr eigenes PEM-Zertifikat bzw. Schlüsselpaar (ein SAN- oder Wildcard-Zertifikat wird empfohlen). Die flexibelste Option für öffentlich vertrauenswürdige Zertifizierungsstellen.
- **Let's Encrypt** – kostenlose, automatische Ausstellung und Erneuerung; erfordert während der Validierung (und Erneuerung) für jede Domain einen vom Internet aus erreichbaren Port 80. Empfohlen für die meisten einfachen Installationen.

Die Zertifikate werden in `/etc/grommunio/ssl` abgelegt und von den appliance-Diensten automatisch referenziert. Eine detaillierte Anleitung zu den einzelnen Optionen finden Sie unter [TLS-Konfiguration](/admin/installation/#tls-configuration)].

## Firewall

Um einen reibungslosen Betrieb zu gewährleisten, öffnet das grommunio appliance verschiedene Ports, damit Clients darauf zugreifen können. Die folgenden Ports stehen standardmäßig zur Verfügung:

- 25 (SMTP)
- 80 (HTTP)
- 110 (POP3)
- 143 (IMAP)
- 443 (HTTPS)
- 465 (SMTPS – implizite TLS-E-Mail-Übermittlung)
- 587 (Submission – STARTTLS-E-Mail-Übermittlung)
- 993 (IMAPS)
- 995 (POP3S)
- 8080 (Admin, unverschlüsselt – wird bei der Erstkonfiguration verwendet)
- 8443 (Admin HTTPS)

:::note
Der Admin-Server API wird während der Erstkonfiguration unverschlüsselt auf Port 8080 bereitgestellt. Sobald die Einrichtung abgeschlossen ist, wechseln Sie zu TLS, damit die Admin-Benutzeroberfläche über HTTPS auf Port 8443 erreichbar ist – siehe [Konfiguration von Admin API und TLS](/admin/operations/#admin-api-tls-configuration).
:::

Generell wird empfohlen, nur die Ports freizugeben, die für den Zugriff auf die Dienste erforderlich sind. Beachten Sie, dass die wichtigsten Protokolle des grommunio, RPC over HTTP, MAPI/HTTP, EWS (Exchange Web Services) und EAS (Exchange ActiveSync) alle über Port 443 (HTTPS) erreichbar sind.

Beachten Sie beim Einsatz von Proxys und Load Balancern, dass für den erfolgreichen Betrieb von RPC über Proxys eine spezielle Konfiguration erforderlich ist. Die für den Betrieb von RPC über Proxys erforderlichen HTTP-Transportmodi sind RPC_IN_DATA und RPC_OUT_DATA. Bekannte Proxy-Software, die diese RPC-Datenkanäle unterstützt, sind: haproxy, squid, nginx und Apache.

## Überprüfen Sie die Installation

Sobald grommunio-setup abgeschlossen ist, verfügen Sie über ein konfiguriertes – aber noch leeres – System. Überprüfen Sie, ob es funktioniert:

- Öffnen Sie die **Admin-Benutzeroberfläche** unter `https://<FQDN>:8443/` und melden Sie sich als **`admin`** mit dem von Ihnen festgelegten Passwort (oder dem von grommunio-setup generierten Passwort, das unter `/var/log/grommunio-setup.log` vermerkt ist) an.
- Öffnen Sie **grommunio Web** unter `https://<FQDN>/` – die Webmail- und Groupware-Oberfläche für Benutzer.

Wenn beide über HTTPS geladen sind und die Admin-Benutzeroberfläche sich anmeldet, ist das appliance betriebsbereit.

## Nächste Schritte

Ein neu eingerichtetes appliance-System enthält noch keine E-Mail-Domänen und keine Benutzer. Fahren Sie fort mit:

- [Administration](/admin/administration/) — Erstellen Sie Ihre erste E-Mail-**Domain** und Ihren ersten **Benutzer** und verwalten Sie anschließend Rollen, öffentliche Ordner und Einstellungen.
- [Betrieb](/admin/operations/) — Day-2-Aufgaben, Updates und Umstellung des Admin-Servers von API auf TLS.
- [Migration](/migration/) — Importieren Sie Postfächer aus Exchange, Kopano und anderen Systemen.

:::note[Vor der Inbetriebnahme]
Legen Sie eine **Backup**-Strategie fest, die die E-Mail-Speicher, Datenbanken und Konfigurationen abdeckt – siehe [Betrieb → Backup & Notfallwiederherstellung](/admin/operations/#backup--disaster-recovery) – und überprüfen Sie die Sicherheitsmaßnahmen jenseits der Firewall (TLS für den Admin API, fail2ban, 2FA/SSO).
:::
