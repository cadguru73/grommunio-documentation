---
title: "Installationsanleitung (grommunio Appliance)"
description: "grommunio liefert einsatzbereite Appliances für:"
sidebar:
  label: "Geführte Installation"
  order: 30
---

grommunio liefert einsatzbereite Appliances für:

- Bare-Metal- oder virtualisierte Umgebungen (ISO)
- Container-Umgebungen (Docker)
- Spezialisierte, automatisierte Virtualisierungsumgebungen (OVA)

sowie ein Community-Image, um grommunio auf einem Raspberry Pi auszuführen.

:::note
Für grommunio stehen verschiedene Möglichkeiten zur Automatisierung und Bereitstellung zur Verfügung. Es ist nicht möglich, alle diese Methoden hier zu beschreiben – sollten Sie nach einer bestimmten Art der Bereitstellung suchen, wenden Sie sich bitte an einen der Partner von grommunio oder direkt an grommunio. grommunio ist sowohl für sehr kleine Installationen als auch für große Hyperscale-Installationen mit Millionen von Nutzern verfügbar.
:::

Um grommunio über ISO bereitzustellen, müssen Sie das Installationsmedium auf Ihrem Installationsziel bereitstellen. Das ISO ist ein generisches, bootfähiges Installationsmedium, das in den meisten Szenarien funktioniert. Um das ISO auf einem Bare-Metal-System bereitzustellen, kann das ISO zur Vereinfachung der Installation auf USB-Sticks kopiert werden.

Das grommunio Appliance ist eine universell einsetzbare Installationsplattform, die alle für den erfolgreichen Betrieb des grommunio erforderlichen Komponenten enthält. Es umfasst bereits das Betriebssystem für eine vereinfachte Verwaltung und ermöglicht einen universellen Einsatz. Bei jeder appliance-Installation werden automatisch vorkonfigurierte Update-Server bereitgestellt und Dienste für die Nutzung vorbereitet. Wenn Sie eine universelle und einfache Bereitstellung suchen, ist das grommunio Appliance genau das Richtige für Sie. Dank vereinfachter Update-Verwaltung, Backups und vollständiger Portabilität kann das appliance auf jeder Zielinstallation mit 1 bis 2000 Benutzern bei entsprechender Hardwareausstattung betrieben werden. Für größere Installationen oder Installationen mit besonderen Anforderungen, wie beispielsweise – aber nicht beschränkt auf – geografisch verteilte, Cluster- oder Hyperscale-Installationen, wenden Sie sich bitte an unsere Partner und/oder unser Support-/Professional-Services-Team. Alternativ reichen die kombinierten Informationen aus der manuellen Installation in diesem Kapitel zusammen mit den Abschnitten der Man-Page aus, um die grommunio-Konfiguration nach Ihren Anforderungen einzurichten.

## Konfiguration des grommunio Appliance über CUI/Setup

Die Benutzeroberfläche der grommunio-Konsole (`grommunio-cui`) bietet eine Konsolenschnittstelle, über die der Administrator grundlegende Aufgaben ausführen kann, um das appliance für die Admin-UI (Admin-Weboberfläche) oder die Admin-CLI (Admin-Befehlszeilenschnittstelle) vorzubereiten, wie beispielsweise die Netzwerkkonfiguration und die Zeitsynchronisation.

![Main screen of grommunio-cui](/img/cui_1_main.png)

## Hauptbildschirm

Nach dem Start von `grommunio-cui` befinden Sie sich auf dem Hauptbildschirm. Nach der Anmeldung können Sie Änderungen an der Systemkonfiguration vornehmen.

Auf dem Hauptbildschirm stehen folgende Funktionen zur Verfügung:

- F1: Umschalten des Farbschemas (heller vs. dunkler Modus)
- F2: Anmelden, um den Systemkonfigurationsmodus freizuschalten
- F5: Umschalten des Tastaturlayouts
- L: Systemprotokoll-Viewer öffnen

## Anmelden

![Login](/img/cui_2_login.png)

Um in den Systemkonfigurationsmodus zu wechseln, drücken Sie `F2` und melden Sie sich mit dem Superuser-Konto des Systems (`root`) an.

:::caution
Das ursprüngliche Root-Passwort ist nicht festgelegt (leer). Wenn Sie bei der ersten Anmeldung zur Passworteingabe aufgefordert werden, geben Sie einfach kein Passwort ein.
:::

## Hauptkonfigurationsbildschirm

Das Hauptmenü bietet `grommunio-cui` folgende Funktionen:

- Systemkennwort ändern
- Netzwerkkonfiguration
- Zeitzonenkonfiguration
- Zeitsynchronisationskonfiguration
- grommunio-Einrichtungsassistent
- Kennwort für die Admin-Weboberfläche ändern
- Terminal
- Neustart
- Herunterfahren

![Main configuration screen of grommunio-cui](/img/cui_3_mainconfig.png)

## Systemkennwort ändern

Der Menüpunkt `Change system password` öffnet ein Fenster zur Festlegung des Passworts für das Superuser-Konto (`root`). Führen Sie diesen Schritt direkt nach der Installation durch. Verwenden Sie ein sicheres Passwort. Wir empfehlen ein Passwort, das aus mindestens vier Wörtern besteht.

![Changing the superuser password with grommunio-cui](/img/cui_4_change_sys_pass.png)

## Netzwerkkonfiguration

Der Menüeintrag `Network configuration` startet das Netzwerkkonfigurationsprogramm (`yast2 lan`), das alle gängigen Netzwerkkonfigurationseinstellungen unterstützt. Ausführliche Informationen zur Konfiguration des Netzwerks mit dem Dienstprogramm `yast` finden Sie in der Online-Dokumentation zu YaST unter <https://documentation.suse.com/sles/15-SP6/html/SLES-all/cha-network.html#sec-network-yast>

![Network configuration with YaST](/img/cui_5_network.png)

:::caution
Zu den Konfigurationseinstellungen, deren Änderung empfohlen wird, gehören: Hostname, Netzwerkadressierung (IP-Adresse), DNS (Nameserver), Routing (Standard-Gateway).
:::

:::caution
Beachten Sie, dass die Verwendung der Domäne `localhost` kein gültiger Hostname ist und/oder `local` kein gültiger Domänenname ist. Stellen Sie sicher, dass Sie den Hostnamen und den FQDN in allen Einrichtungs- und Installationsphasen korrekt festlegen, um mit einer gültigen Konfiguration arbeiten zu können.
:::

### Einrichtung von Hostname und FQDN

Es ist erforderlich, den Hostnamen und den Domänennamen des Systems korrekt einzurichten.

Zweitens sollten für eine ordnungsgemäße lokale Namensauflösung von Diensten die entsprechenden Einträge entweder in DNS vorhanden sein und/oder in `/etc/hosts` festgelegt werden.

Um dies mit dem appliance zu erreichen, legen Sie den vollqualifizierten Domänennamen (FQDN) in den Schnittstelleneinstellungen (die auf `/etc/hosts` gespiegelt werden) **und** auf der Registerkarte „Hostname/DNS“ fest (der statische Hostname bezieht sich auf `/etc/hostname`). Auf diese Weise können alle Dienste des appliance die korrekte Adressierung basierend auf der Domäne und dem Host verwenden. Eine korrekte Konfiguration von Hostname/DNS ist zwingend erforderlich, insbesondere bei Setups mit mehreren Hosts.

![Hostname setting (affects \0/etc/hostname\1)](/img/yast_hostname_interface.png)

![Hostname resolution aid (affects \0/etc/hosts\1)](/img/yast_hostname_system.png)

:::caution
Um die Einstellungen zu überprüfen, sollte der Befehl `hostname` den FQDN des Systems zurückgeben.
:::

## Zeitzonenkonfiguration

Über den Menüeintrag `Timezone configuration` kann die bevorzugte Zeitzone festgelegt werden, die in Serverprotokollen usw. angezeigt wird. Auf E-Mails hat dies keine praktischen Auswirkungen, da E-Mail-Clients wie grommunio-web Zeitstempel ohnehin in die Zeitzone des jeweiligen Geräts umrechnen, auf dem das Programm ausgeführt wird.

![Timezone configuration with YaST](/img/cui_6_timezone.png)

## Konfiguration der Zeitsynchronisation

Die Konfiguration von Timesync erfolgt über eine einfache Benutzeroberfläche, über die Sie die Zeitzone entsprechend Ihrer Region und der dortigen Zeitzone einstellen können. Es wird generell empfohlen, die Einstellung auf `Hardware Clock Set to UTC` zu belassen, da dies das empfohlene zeitzonenunabhängige Verhalten für Dienste (z. B. bei Protokollen usw.) gewährleistet.

![Timesync configuration](/img/cui_7_timesync.png)

Nach dieser Grundeinrichtung sollte Ihr grommunio Appliance:

- eine Verbindung zum Internet herstellen können (Verfügbarkeit von Updates usw.)
- eine gültige Zeitzone eingestellt haben
- einen gültigen Zeitserver konfiguriert haben, wobei die Systemzeit entsprechend synchronisiert ist

## grommunio-Einrichtungsassistent

Nachdem Sie die vorangegangenen grundlegenden Einrichtungsschritte abgeschlossen haben, wird empfohlen, den grommunio-Einrichtungsassistenten auszuführen, um die Konfiguration entsprechend Ihren Anforderungen abzuschließen.

Der Menüpunkt `grommunio setup wizard` startet das Programm `grommunio-setup`, das Sie durch die Ersteinrichtung des grommunio führt.

:::caution
grommunio-setup kann zwar mehrmals ausgeführt werden, doch durch das Durchlaufen des Einrichtungsvorgangs von grommunio-setup wird die gesamte Installation stets zurückgesetzt. grommunio-setup erkennt automatisch, ob es bereits ausgeführt wurde, und warnt Sie, dass alle gespeicherten Daten verloren gehen, wenn Sie fortfahren.
:::

### Begrüßungsbildschirm

Beim Start von `grommunio-setup` wird ein informativer Begrüßungsbildschirm angezeigt.

![grommunio-setup: welcome screen](/img/cui_8_setup_welcome.png)

### Einrichtung des Repositorys

Als ersten Schritt fordert `grommunio-setup` Sie auf, die Abonnementdaten einzugeben. Diese Abonnementdaten sind im Kauf des Produkts enthalten, ebenso wie das Abonnementzertifikat, das für die spätere Installation bereitgestellt wird. Wenn Sie dieses Feld leer lassen, bindet grommunio-setup automatisch die Community-Repositorys ein.

:::note
Community-Repositorys werden nach bestem Bemühen bereitgestellt und werden nicht unterstützt. grommunio begrüßt zwar die Nutzung von grommunio durch Community-Mitglieder, doch die im Rahmen der Abonnement-Repositorys verfügbaren Software-Distributionen bieten produktionsrelevante Vorteile. Abonnement-Repositorys (nur mit einem gültigen Abonnement verfügbar) enthalten qualitätsgeprüfte Pakete, Hotfixes und zusätzliche Funktionen, die in den Community-Repositorys nicht verfügbar sind.
:::

![grommunio-setup: repository setup](/img/cui_9_setup_repository.png)

### Datenbankvariante

Im nächsten Schritt von `grommunio-setup` werden Sie aufgefordert, anzugeben, welchen zentralen Datenbanktyp Sie konfigurieren möchten. Bei den meisten Installationen wird die lokale Datenbankinstallation verwendet, bei der die MySQL-Datenbank automatisch initialisiert und vorbereitet wird. Bei größeren und/oder speziellen Konfigurationen, z. B. Clustern, Multi-Node- und verteilten Systemen, kann es empfehlenswert sein, stattdessen eine Verbindung zu einer bereits vorhandenen Datenbank herzustellen.

![grommunio-setup: choice of database variant](/img/cui_10_setup_dbchoice.png)

### Datenbank-Einstellungen

Wenn Sie „lokale Datenbank“ auswählen, werden Ihnen im nächsten Installationsschritt automatisch Informationen angezeigt, die für die Initialisierung der Datenbank verwendet werden. Bei Standardinstallationen wird empfohlen, die Standardwerte zu übernehmen. Die Werte für die Installation werden zufällig generiert, wodurch Ihre Installation vor unbefugtem Zugriff geschützt ist.

![grommunio-setup: settings for database initialization](/img/cui_11_setup_dbsettings.png)

### Administrator

Nach der Einrichtung der Datenbank wird ein Standard-Administratorpasswort für die Anmeldung am grommunio Admin bzw. API abgefragt. Der Standardbenutzer (`admin`) wird dann mit dem hier eingegebenen Passwort initialisiert. Standardmäßig generiert das grommunio automatisch ein Passwort und zeigt es am Ende des Einrichtungsvorgangs an.

:::caution
Am Ende des Einrichtungsvorgangs wird das hier eingegebene Passwort auf dem Übersichtsbildschirm nach der Einrichtung angezeigt. Stellen Sie sicher, dass keine unbefugten Personen Zugriff auf die Systemkonsole haben oder diese einsehen können, um diese wichtigen Zugangsdaten zu entnehmen.
:::

:::note
Sie können dieses Passwort jederzeit später über `grommunio-cui` zurücksetzen.
:::

![grommunio-setup: setting of the admin password](/img/cui_12_setup_adminpw.png)

### Vollständig qualifizierter Domänenname

Im nächsten Schritt von `grommunio-setup` wird die Konfiguration des vollqualifizierten Domänennamens (FQDN) verlangt. Der FQDN setzt sich üblicherweise aus dem **Hostnamen** in Kombination mit der primären **Domäne** des Systems zusammen. Es wird dringend empfohlen, dass der hier gewählte Name Teil der Zertifikate ist, die zu einem späteren Zeitpunkt in `grommunio-setup` generiert werden.

![grommunio-setup: setting the fully qualified domain name (fqdn)](/img/cui_13_setup_fqdn.png)

### Primäre E-Mail-Domain

Wenn Sie mit dem nächsten Schritt fortfahren, werden Sie aufgefordert, die primäre E-Mail-Domäne anzugeben. Die primäre E-Mail-Domäne ist als Hauptsystemdomäne für die weitere Systemkonfiguration von Bedeutung.

![grommunio-setup: setting the primary mail domain](/img/cui_14_setup_primarydomain.png)

### Konfiguration von Relayhost

Soll die Installation keine E-Mails direkt versenden (indem die MTAs der Empfänger direkt aufgelöst werden), wird empfohlen, einen Relayhost einzurichten. Der folgende Schritt ermöglicht die Konfiguration eines Relayhosts, der beispielsweise für die Integration in bestehende Firewalls oder E-Mail-Sicherheits-appliances verwendet werden kann. Soll das konfigurierte Ziel direkt verwendet werden (indem die IP-Adresse über DNS-A-Einträge anstelle der zugehörigen MX-Einträge abgefragt wird), sollte der Relayhost in eckige Klammern gesetzt werden, z. B. „\[mail.isp.com\]“.

![grommunio-setup: configuration of relayhost](/img/cui_15_setup_relayhost.png)

### Konfiguration des TLS

Im nächsten Schritt der Konfiguration mit `grommunio-setup` wird ein Menü angezeigt, in dem Sie die gewünschte TLS-Konfiguration für die grommunio-Installation auswählen können:

![grommunio-setup: choosing the TLS installation mode](/img/cui_16_setup_tlsmode.png)

0: **Erstellung eines selbstsignierten Zertifikats**

> Die Erstellung eines eigenen selbstsignierten Zertifikats ist die einfachste Option – ein solches Zertifikat wird jedoch bei der ersten Verbindung als „nicht vertrauenswürdig“ angezeigt und muss erst als vertrauenswürdig markiert werden, bevor fortgefahren werden kann. Dieses Verhalten ist normal und liegt daran, dass ein Client, der eine Verbindung herstellt, keine Möglichkeit hat, zu überprüfen, ob das Zertifikat eine gültige Quelle hat. Diese Einstellung ist die Standardeinstellung und erfordert keine Vorbereitungen für die Zertifikatserstellung. grommunio empfiehlt diese Option nicht für Produktionsumgebungen, da bei dieser Option jeder Client dem verwendeten Zertifikat zunächst vertrauen muss. Diese Option eignet sich am besten für Test- und Demo-Installationen von grommunio.

![grommunio-setup: Creating a self-signed certificate](/img/cui_17_setup_selfsigned.png)

1: **Einrichtung einer eigenen Zertifizierungsstelle (CA) und eines Zertifikats**

> Die Einrichtung einer eigenen Zertifizierungsstelle ist eine erweiterte Option, mit der Sie selbstsignierte Zertifikate unter einer eigenen Zertifizierungsstelle erstellen können. Auf diese Weise können Sie (manuell) weitere Zertifikate unter dem Dach einer eigenen zentralen Zertifizierungsstelle erstellen, wobei mehrere Serverzertifikate von derselben, von Ihnen selbst generierten Zertifizierungsstelle signiert werden. Diese Option eignet sich am besten für die Validierung und Demo-Installation größerer grommunio-Installationen mit mehreren Instanzen.

![grommunio-setup: Creating own certificate authority (CA) and certificate](/img/cui_18_setup_ownca.png)

2: **Import eines vorhandenen TLS-Zertifikats aus Dateien**

> Durch das Importieren eines eigenen Zertifikats können Sie jede Art von externem Zertifikatspaar (PEM-kodiert) mit Ihrer grommunio-Installation verwenden. Beachten Sie, dass es empfehlenswert ist, entweder SAN-Zertifikate mit mehreren Domänen oder ein Wildcard-Zertifikat zu verwenden. Durch die Wahl Ihrer eigenen TLS-Zertifikate verfügen Sie über höchste Flexibilität, entweder eine vertrauenswürdige Zertifizierungsstelle (CA) zu nutzen oder ein öffentlich signiertes Zertifikat einer offiziell vertrauenswürdigen Zertifizierungsstelle, darunter unter anderem Thawte, Digicert, Comodo oder andere.

![grommunio-setup: Importing existing certificate](/img/cui_19_setup_importcert.png)

3: **Automatische Erstellung von Zertifikaten mit Let's Encrypt**

> Mit dieser Option wird die automatische Zertifikatserstellung über die Zertifizierungsstelle Let's Encrypt ermöglicht. Die Nutzung von Let's Encrypt-Zertifikaten ist kostenlos, es gelten jedoch die Nutzungsbedingungen von Let's Encrypt, auf die bei der Installation verwiesen wird. Bei Auswahl dieser Option werden die von Ihnen ausgewählten Domains automatisch angefordert und der Validierungsprozess automatisch gestartet. Damit dieser automatisierte Prozess erfolgreich abläuft, überprüft Let's Encrypt alle definierten Domainnamen, indem es eine Challenge auf dem appliance erstellt. Damit dies funktioniert, muss Port 80 (HTTP) während dieses Überprüfungsschritts (und jeder anschließenden automatischen Erneuerung) über das Internet erreichbar sein, wobei alle Domains auf den appliance verweisen müssen. Diese Option wird für jede einfache Installation empfohlen und ermöglicht bei korrekter Vorbereitung einen möglichst reibungslosen Installationsablauf.

3.a: **Erstellung von Zertifikaten mit Let's Encrypt für mehrere Domänen**

> Um weitere Domains zu Ihrem Let's Encrypt-Zertifikat hinzuzufügen, können Sie den folgenden Befehl verwenden:

``` bash
certbot certonly -n --standalone --agree-tos \
--preferred-challenges http \
--cert-name="<domain1>" \
-d "<domain1>" \
-d "<domain2>" \
-d "<domain3>" \
-d "<domain4>" \
-d "<domain5>" \
-m "me@domain1.com" \
--pre-hook "service nginx stop" \
--deploy-hook /usr/share/grommunio-setup/grommunio-certbot-renew-hook \
--post-hook "service nginx start"
```

Dabei steht `--cert-name="<domain1>"` für die ursprüngliche Domain und `-d "<domain2>"` bis `-d "<domain5>"` für die zusätzlichen Domains, die dem LE-Zertifikat hinzugefügt werden sollen. `-m "me@domain1.com"` ist Ihre E-Mail-Adresse, während `--pre-hook "service nginx stop"` nginx vor der Zertifikatsänderung stoppt, `--deploy-hook /usr/share/grommunio-setup/grommunio-certbot-renew-hook` die Änderungen vornimmt und `--post-hook "service nginx start"` nginx nach der Änderung startet.

![grommunio-setup: Generating Let's Encrypt certificates](/img/cui_20_setup_letsencrypt.png)

Alle auf diese Weise generierten Zertifikate werden in `/etc/grommunio/ssl` abgelegt und von allen Diensten des appliance automatisch referenziert.

### Abschluss der Einrichtung

Nachdem alle oben genannten Schritte von `grommunio-setup` abgeschlossen sind, werden im abschließenden Dialogfeld die zusammengefassten Informationen zur Installation als Referenz angezeigt.

![grommunio-setup: Setup finalization](/img/cui_21_setup_final.png)

:::caution
Alle für die Installation und Einrichtung relevanten Informationen werden unter /var/log/grommunio-setup.log gespeichert. Diese Datei enthält die bei der Initialisierung verwendeten Passwörter, die Sie an einem sicheren Ort speichern oder löschen können, wenn sie nicht mehr benötigt werden.
:::

## Zurücksetzen des Admin-Webpassworts

Der Menüeintrag `Admin web password reset` ändert das Passwort des Hauptadministrators (`admin`). Administratoren, die diese Option ausführen möchten, ohne zuvor `grommunio-cui` auszuführen, können dies jederzeit tun, indem sie den Befehl `grommunio-admin passwd` ausführen.

![Admin Web password reset](/img/cui_22_admin_passwd.png)

## Terminal

Die Option `Terminal` aktiviert eine klassische Shell, aus der man jederzeit durch Eingabe des Befehls `exit` zu `grommunio-cui` zurückkehren kann. Diese Option sollte mit Bedacht und nur von erfahrenen Administratoren verwendet werden.

![Staring Terminal (root privileges)](/img/cui_23_terminal.png)

:::caution
Beachten Sie, dass das hier ausgeführte Terminal vollständige Administratorrechte (Root-Zugriff) auf den Appliance gewährt. Angesichts dieser Berechtigungsstufe wird empfohlen, mit äußerster Vorsicht vorzugehen.
:::

## Neustart

![Rebooting grommunio Appliance](/img/cui_24_reboot.png)

Die Option `Reboot` führt einen Neustart des gesamten grommunio Appliance durch. Beachten Sie, dass die angebotenen Dienste während des Neustarts nicht verfügbar sind.

## Herunterfahren

![Shut down grommunio Appliance](/img/cui_25_shutdown.png)

Die Option `Shutdown` fährt das gesamte grommunio Appliance herunter. Beachten Sie, dass die Dienste erst wieder verfügbar sind, wenn das Appliance durch einen Neustart wieder bereitgestellt wurde.
