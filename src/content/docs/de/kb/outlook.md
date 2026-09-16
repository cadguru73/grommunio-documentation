---
title: "Fehler und Probleme mit Outlook"
description: "Situation: Beim Anzeigen einer E-Mail mit Anhängen erscheint die neben dem Symbol und dem Dateinamen angegebene Größe höher als die tatsächliche Dateigröße, die …"
sidebar:
  order: 120
---

## Größe der Anhänge

Situation: Beim Anzeigen einer E-Mail mit Anhängen erscheint die neben dem Symbol und dem Dateinamen angegebene Größe höher als die tatsächliche Dateigröße, die auf der Festplatte gespeichert wird.

Ursache: Outlook zeigt den Wert der Eigenschaft `PR_ATTACH_SIZE` MAPI an. Diese Eigenschaft ist so festgelegt, dass sie nicht nur die Dateigröße, sondern auch die Metadaten des Anhangs umfasst.

## Wiederherstellung von vorläufig gelöschten öffentlichen Ordnern

Wenn ein vorläufig gelöschter öffentlicher (Unter-)Ordner wiederhergestellt wird, wird der Name auf ein Zeichen gekürzt, selbst beim EXC2019-Server.

## AutoDiscover-Diagnose

Wenn Outlook ausgeführt wird, erscheint im Infobereich der Windows-Taskleiste ein Outlook-Symbol. Durch Drücken von Strg+rechte Maustaste lässt sich ein Dienstmenü aufrufen, das den Befehl „Test AutoDiscover“ zur Diagnose von Problemen mit Windows enthält. Bekannte Fehler: Der Dialog ignoriert möglicherweise den Inhalt des Passwortfelds und verwendet stattdessen ein gespeichertes Passwort oder SSO, was zu möglicherweise unerwarteten HTTP-401-Antworten (Nicht autorisiert) führen kann. Verwenden Sie im Zweifelsfall gromox-dscli.

![](/img/oldisco.png)

## Warnung zur SRV-Umleitung

Situation: Outlook zeigt eine Umleitungswarnung an, wenn der Hostname im SRV-Eintrag von dem der Domain abweicht.

![](/img/srv-record-redirect.png)

Text: „Soll diese Website <user@example.com> Server-Einstellungen konfigurieren? <https://mail.example.com/autodiscover/autodiscover.xml> . Ihr Konto wurde zur Einstellung der Server-Einstellungen auf diese Website weitergeleitet. Sie sollten nur Einstellungen von Quellen zulassen, die Sie kennen und denen Sie vertrauen. \[ \] Mich nicht erneut nach dieser Website fragen.“

Ursache: Fragwürdige Programmierung in den Netzwerkbibliotheken von Outlook und/oder Windows. Ein SRV-Eintrag unterliegt denselben Sicherheitsaspekten wie ein CNAME-Eintrag. (Outlook ignoriert zudem die Portnummer im SRV-Eintrag.)

Behebungen/Workarounds: Melden Sie Probleme an Microsoft. Oder aktivieren Sie das Kontrollkästchen „Immer akzeptieren“. Das Löschen des SRV-Eintrags für DNS ist ebenfalls eine praktikable Option, da man stattdessen einen Eintrag vom Typ CNAME/A/AAAA mit dem Wert „0“ in der Zone von DNS vornehmen kann.

## Passwörter mit Umlauten

Gromox teilt den Clients die verfügbaren Authentifizierungsmechanismen über den `WWW-Authentication`-Header in HTTP-Antworten mit. Ab Gromox 2.17 werden „Basic“ und „Negotiate“ unterstützt. „Basic“ wird durch einen `charset`-Parameter ergänzt (RFC 7617 §2.1).

Die Bibliotheken Windows RPC und HTTP ignorieren diesen Parameter jedoch, ebenso wie die wenigen UTF-8-Optionen im Dialogfeld „Internetoptionen“ der Systemsteuerung.

![](/img/windows_intopts.png)

Die RPC/HTTP-Bibliotheken übertragen die Basic-Autorisierung stets unter Verwendung der Codepage der *systemweiten Standard-Locale*. Wenn das im Autorisierungsdialog eingegebene Passwort in dieser Kodierung nicht dargestellt werden kann, wird in der HTTP-Anfrage *überhaupt kein* `Authorization`-Header gesendet.

Exchange Server interpretiert über den „Basic“-Autorisierungsheader empfangene Passwörter zunächst als UTF-8 und versucht es im Falle einer fehlgeschlagenen Passwortvalidierung erneut unter Verwendung der Codepage der Standard-Locale des *Server*-Systems. Das bedeutet, dass ein Windows-Client, der die japanische Locale (Codepage 932) verwendet, niemals eine Verbindung zu einem Exchange Server herstellen kann, der mit der englischen Locale (Codepage 1252) läuft, wenn die Authentifizierung vom Typ „`Basic`“ verwendet wird.

Im Gegensatz zu Windows wird bei Installationen der aktuellen Linux-Systeme ausschließlich UTF-8 verwendet. Daher gibt es keinen zweiten Zeichensatz, den ein Serverprozess sinnvollerweise ausprobieren könnte.

Ab Windows 10 verfügen die Regionseinstellungen in der (klassischen) Systemsteuerung ein Kontrollkästchen, mit dem das schmalbandige Kodierungssystem APIs so umgeschaltet werden kann, dass es Zeichenfolgen und bestimmte andere Daten als UTF-8 *interpretiert* und ausgibt, ähnlich wie es bei Linux-Systemen der Fall ist. Beachten Sie, dass eine Änderung der Region Auswirkungen auf alle nicht annotierten Daten hat. Dies beeinflusst beispielsweise, wie Texteditoren die Kodierung von Klartextdateien ermitteln.

![](/img/windows_region1.png)

![](/img/windows_region2.png)

![](/img/windows_region3.png)

Es wird davon ausgegangen, dass die Authentifizierung über den `Negotiate`-Mechanismus weitgehend frei von Zeichensatzproblemen ist. „Negotiate“ kann GSS/SSO/NTLM-Token enthalten, und insbesondere für NTLM ist *vorgeschrieben*, dass für die Challenge-Response-Authentifizierung UCS-2LE/UTF-16LE verwendet wird, was Nicht-ASCII-Zeichen eine Überlebenschance bietet.

## Der Dialog „Regeln“ lässt sich nicht öffnen

RuleOrganizer ist eine FAI-Nachricht im Posteingang mit PR_MESSAGE_CLASS="IPM.RuleOrganizer". Wenn diese Nachricht keine PR_RW_RULES_STREAM-Eigenschaft aufweist, weigert sich Outlook, den Regeldialog zu öffnen. Es wird ein ropOpenStream-Aufruf ohne MAPI_CREATE ausgeführt, was bedeutet, dass MAPI_CREATE auch nicht an die COM-Methode IMessage::OpenProperty (API) übergeben wurde. Fehlt die Eigenschaft daher, wird OL sie nicht neu erstellen (was unsinnig ist, da sie bei Fehlen der Nachricht diese neu erstellen würde).

Wenn zudem die Eigenschaft „PR_RW_RULES_STREAM“ zwar vorhanden ist, aber den Wert 0 hat, schließt sich der Regeldialog sofort wieder – ein weiterer Fehler.

Fehlerhafte Postfächer können mit dem Befehl `gromox-mbop -u abc@example.com clear-rwz` repariert werden.

## Eigenart bei der Tabellensortierung von MFCMAPI

Wenn Sie eine Tabelle durch Klicken auf eine Spaltenüberschrift sortieren, verwendet MFCMAPI seine eigene Sortierfunktion anstelle von ropSortTable. Es wird nur der Teil der Zeilen sortiert, der bereits geladen wurde (ropQueryRows).

## Outlook 2010/2013 – Spezialausführungen

### Zusammenfassung des Vorworts

Ende Mai 2024 sollten die deutschen Screenshots dieses Dokuments durch die englische Version ersetzt werden. Dabei traten weitere Merkwürdigkeiten zutage.

1.  Englisch OL2013 15.0.5125.1000 / MAPI 15.0.5449:

    - Wenn der AutoDiscover-Handler MH anbietet: AutoDiscover wird abgeschlossen, das MAPI-Profil läuft auf MH, es wurden keine Hinweise auf eine RPCH-Konfiguration gefunden. Alles in Ordnung.
    - ADH bietet nur RPCH an: Der Assistent scheitert in der Autodiscover-Phase. Dies führt schließlich zum manuellen Einrichtungsmodus.
    - Manuelle Einrichtung: Der Assistent ist aus irgendeinem Grund völlig unfähig, eine erfolgreiche RPCH-Verbindung herzustellen.

2.  Deutsche OL2013 (genaue Version noch offen):

    Wenn AutoDiscover erfolgreich ist, können Sie die Einrichtung auch manuell vornehmen oder nach der Erfolgsmeldung von AD in den manuellen Modus wechseln. Unabhängig davon, für welche Vorgehensweise Sie sich entscheiden, geht der Assistent aus irgendeinem Grund davon aus, dass er mit einem mysteriösen Hostnamen namens „SERVERS“ kommunizieren möchte. Man kann den Assistenten erfolgreich beenden, und er glaubt, eine Verbindung zu haben, obwohl dies tatsächlich nicht der Fall ist. Das MAPI-Profil bleibt fehlerhaft, und der falsche RPC-Servername muss mit MFCMAPI bearbeitet werden. Sobald *das* erledigt ist, funktioniert es über RPCH tatsächlich sehr gut.

### Systemsteuerung

Öffnen Sie die Systemsteuerung und das E-Mail-Steuerungs-Widget und erstellen Sie ein neues Profil. Alternativ können neue Profile beim Start von Outlook erstellt werden, sofern der Profilauswahldialog angezeigt wird (vorausgesetzt, es ist noch kein Profil als Standardprofil markiert).

![](/img/profmgr1.png)

![](/img/profmgr2.png)

### Spezielles Dialogfeld für Konten, die einer Domäne angehören

Wenn Sie in Outlook ein neues Profil erstellen, wird möglicherweise ein Dialogfeld angezeigt, das nur zwei Felder enthält (Name, E-Mail-Adresse), wobei das Namensfeld bereits ausgefüllt und ausgegraut ist. Dies kann passieren, wenn der Computer einer bestehenden NT/ActiveDirectory-Domäne angehört.

![](/img/profwithdom.png)

Wenn Sie diese Felder unverändert lassen, überspringt der Assistent möglicherweise AutoDiscover oder verwendet den AutoDiscover des Domänencontrollers (insbesondere, wenn bereits ein Exchange-Server vorhanden ist). Wir haben beobachtet, dass der Assistent in einer solchen Domäne fortfährt und den Namen des Domänencontrollers als RPC-Servernamen verwendet, wodurch Anfragen den Gromox-Server niemals erreichen.

Durch Ändern des Werts im E-Mail-Adressfeld werden im Dialogfeld nun die üblichen *vier* Felder angezeigt. Diese Aktion scheint die implizite Standardeinstellung, den Domänencontroller zu verwenden, aufzuheben, was positiv ist.

### AutoDiscover

![](/img/profnodom2.png)

Bei Verwendung des automatischen Modus (d. h. des Kontrollkästchens „E-Mail-Konto“) im Dialogfeld mit 4(!) Feldern ruft der Profil-Assistent anschließend AutoDiscover auf. Sofern der Domänenname DNS auf einen Gromox-Server aufgelöst wird, sollte der Aufruf von AutoDiscover erfolgreich sein, selbst wenn dieser einem NT-Domänen mit demselben Namen angehört.

![](/img/profdisco.png)

An dieser Stelle wird möglicherweise eine Warnung angezeigt, wenn Sie ein *selbstsigniertes* oder anderweitig nicht überprüfbares TLS-Zertifikat verwendet haben. Falls Ihr Gromox-Server tatsächlich ein solches Zertifikat verwendet, ist dies ein gutes Zeichen dafür, dass AutoDiscover den Gromox-Server tatsächlich erreicht hat.

![](/img/proftls.png)

Darüber hinaus kann möglicherweise auch eine zweite Warnung angezeigt werden. Der Prozess „AutoDiscovery“ nutzt eine Reihe von Techniken, darunter die Überprüfung auf einen Eintrag „DNS“, bei dem der von Ihnen eingegebenen E-Mail-Domain „`autodiscover.`“ vorangestellt wird. Wenn dieser DNS-Eintrag tatsächlich existiert, aber nicht Teil des TLS-Zertifikats ist, meldet der Assistent eine Nichtübereinstimmung des Zertifikatsnamens.

![](/img/proftls2.png)

Da das Problem mit TLS entweder durch ein ordnungsgemäßes Zertifikat gelöst wurde oder einfach ignoriert wurde, sollte AutoDiscover nun funktionieren.

![](/img/profdisco2.png)

Sollte stattdessen eine Fehlermeldung angezeigt werden, dass keine verschlüsselte Verbindung hergestellt werden konnte, deutet dies in der Regel auf ein DNS- oder Netzwerkproblem hin, und der Versuch, eine unverschlüsselte AutoDiscover-Anfrage zu stellen, wird das Problem nicht beheben.

![](/img/profdiscf.png)

![](/img/profdiscf2.png)

![](/img/profdiscf3.png)

![](/img/profdiscf4.png)

Wenn Sie nun wieder zum erfolgreichen Dialogfenster „AutoDiscover“ (mit den drei grünen Häkchen) zurückkehren, haben Sie die Möglichkeit, über das Kontrollkästchen „Kontoeinstellungen ändern“ unten links im Dialogfenster in den manuellen Einrichtungsmodus zu wechseln. Dadurch wechselt der Assistent zum nächsten Dialogschritt mit dem Titel „Server-Einstellungen“.

![](/img/profdisco3.png)

Da es sich hierbei um eine technische Dokumentation handelt, die sich mit den Besonderheiten des Outlook befasst, empfehlen wir Ihnen, dies zu tun, um die folgenden Erläuterungen besser zu verstehen. Lesen Sie weiter unten im Abschnitt „Probleme mit dem RPC-Hostnamen“.

### Manuelle Einrichtung

Wenn Sie das Kontrollkästchen „Manuelle Einrichtung“ aktivieren, wird AutoDiscover übersprungen.

![](/img/profmanual1.png)

![](/img/profmanual2.png)

Nachdem Sie das Auswahlfeld für den Servertyp „Exchange“ ausgewählt haben, gelangen Sie zur Ansicht „Servereinstellungen“. Sie sollten den Server- und den Benutzernamen eingeben. Der OL2013-Profil-Assistent verwendet standardmäßig RPC über Port 135, was vom Gromox nicht unterstützt wird, sodass die Funktion „Name prüfen“ vorerst nicht funktioniert.

![](/img/profserv2.png)

Gehen Sie stattdessen zu „Weitere Einstellungen“ und dort zur Seite „Sicherheit“ und wählen Sie im Dropdown-Menü die Option „Anonyme Authentifizierung“ aus.

![](/img/profproxy1.png)

Wechseln Sie anschließend zur Registerkarte „Verbindung“ unter „Weitere Einstellungen“, aktivieren Sie die Option „Verbindung über HTTP herstellen“ und rufen Sie den Unterdialog „Proxy-Einstellungen“ auf.

![](/img/profproxy2.png)

![](/img/profproxy3.png)

Geben Sie den Servernamen *erneut* in das Feld „HTTP“ ein und wechseln Sie von „NTLM-Authentifizierung“ zu „Basic-Authentifizierung“.

Sie sollten sowohl die Option „Bei schnellen Netzwerken zuerst eine Verbindung über HTTP herstellen“ als auch die Option „Bei langsamen Netzwerken zuerst eine Verbindung über HTTP herstellen“ aktivieren.

„Zuerst über HTTP verbinden, dann TCP/IP verwenden“ ist eine irreführende Bezeichnung; was es eigentlich bedeutet, ist: „Stellen Sie zunächst eine Verbindung über RPCHTTP oder MAPIHTTP her und versuchen Sie es dann mit RPC-over-TCP“.

![](/img/profproxy4.png)

Sie können den/die Unterdialog(e) „Weitere Einstellungen“ schließen.

Wenn Sie nun die Funktion „Name prüfen“ verwenden, sollten die Werte in den Feldern „Server“ und „Benutzername“ „aufgelöst“ werden, d. h. unterstrichen werden. Der Servername ändert sich zudem in den seltsamen Wert `SERVERS`.

### Probleme mit dem RPC-Hostnamen

Wenn AutoDiscover den MH/RPCH-Transport problemlos gefunden hat, wird im Dialogfeld „Servereinstellungen“ im Feld „Server“ *someguid@domain* und im Feld „Benutzername“ die E-Mail-Adresse angezeigt. Außerdem gibt es unter „Weitere Einstellungen“ nur *drei* Registerkarten und keine Möglichkeit, die RPC-Proxy-Einstellungen aufzurufen.

Nun zu dem Sonderfall mit mindestens einer OL2013-Variante (deutsch):

Unabhängig davon, ob Sie die manuelle Einrichtung durchgeführt haben oder über AutoDiscover zu diesem Punkt gelangt sind, werden Sie feststellen, dass der RPC-Server auf den Wert `SERVERS` geändert wurde. Wir haben keinen Hinweis darauf, woher dieser Name stammt – eine Suche in den wichtigsten Windows-DLLs, darunter unter anderem `rpcrt4.dll`, liefert keine entsprechende Zeichenfolge, und eine Internetsuche nach diesem Begriff ist äußerst schwierig, da ein gängiges Wort wiederverwendet wurde.

![](/img/profrpcbroken.png)

Der Server und die E-Mail-Adresse sind unterstrichen, und die Schaltfläche „Namen prüfen“ ist ausgegraut, was normalerweise darauf hinweist, dass die beiden Feldwerte (vermutlich) erfolgreich aufgelöst wurden.

Sie können den Profil-Assistenten an dieser Stelle abschließen. Lesen Sie jedoch weiter, wenn Sie sich für die technischen Details interessieren…

Bei einigen Windows-Installationen funktioniert `SERVERS` einwandfrei, bei anderen hingegen nicht. Wir wissen nicht genau, warum das so ist, aber eine Hypothese lautet, dass manche Versionen versuchen, den RPC-Servernamen vor dem RPCHTTP-Proxynamen aufzulösen. Wir haben mit Wireshark tatsächlich beobachtet, dass Namensauflösungen für `SERVERS` durchgeführt wurden (NBNS-, LLMNR- und/oder MDNS-Pakete) und ins Netzwerk gesendet wurden.

Durch eine *erneute* Änderung des Server- oder Benutzernamenfelds (z. B. durch Entfernen des letzten Zeichens und erneutes Hinzufügen dieses Zeichens) wechseln die Feldwerte wieder in den ungelösten Modus, und die Schaltfläche „Namen prüfen“ wird wieder verfügbar. Wird diese Prüffunktion erneut verwendet, wird der Server nun auf magische Weise zu einem neuen Wert in der Form `xxxxxxxx-xxxx-xxxx-xx-xxxxxxxxxxxx@hostname` aufgelöst. Wir wissen zwar, dass es sich hierbei um eine Endpunkt-ID für einen RPC-Proxy handelt und kennen deren Herkunft im Quellcode, doch auch das hilft nicht dabei, die Verbindung zum Postfach herzustellen.

![](/img/profrpcat.png)

Wenn man ein Feld wiederholt bearbeitet und die Funktion „Namen prüfen“ erneut aufruft, wechselt der Profil-Assistent ständig zwischen `SERVERS` und der Endpunkt-ID hin und her.

Um den falschen RPC-Servernamen wirklich zu beheben, ist die Verwendung von MFCMAPI erforderlich.

### Profildatenmodell MAPI

![](/img/profmfc1.png)

![](/img/profmfc2.png)

![](/img/profmfc3.png)

Im Profil „MAPI“ (`a1` in den Screenshots) befinden sich (mindestens) zwei Dienste, von denen einer für das Postfach und ein weiterer für das Adressbuch bestimmt ist. Der EMSMDB-Dienst besteht aus drei oder vier Anbietern; diese sollten dem privaten Postfach, dem öffentlichen Postfach (falls vorhanden), einem Transportanbieter (XP) und dem globalen Adressbuch (GAB) entsprechen. Der Wert `SERVERS` ist in den Eigenschaften `PR_TEST_LINE_SPEED` (0x662B001F) und 0x662A001F zu finden.

![](/img/profmfc4.png)

![](/img/profmfc5.png)

Außerdem gibt es `PR_PROFILE_RPC_PROXY_SERVER` (das den Proxy RPCHTTP/MAPIHTTP enthält) und `PR_PROFILE_UNRESOLVED_SERVER` (ich weiß nicht, warum dies beibehalten wird).

Der Wert der Eigenschaft „0x662A001F“ steht damit in Zusammenhang. Wenn Sie diese Eigenschaft in MFCMAPI ändern, wird sie auch im Dialogfeld der Systemsteuerung geändert.

MFCMAPI zeigt die Eigenschaft als `PR_TRANSFER_ENABLED` an, was jedoch nicht ganz korrekt ist. Einige Eigenschafts-IDs werden – leider – von verschiedenen Komponenten wiederverwendet (z. B. Profil vs. Postfach vs. Adressbuch), und MFCMAPI berücksichtigt den Kontext, in dem es verwendet wird, einfach nicht und gibt daher den falschen Namen aus.

Der Wert für `PR_TEST_LINE_SPEED` spielt keine Rolle. Es handelt sich dabei um eine spezielle Eigenschaft, die dafür sorgt, dass emsmdb.dll stets eine Netzwerkanfrage auslöst.

Wenn Sie `SERVERS` durch den tatsächlichen Hostnamen ersetzen, ist der Zugriff auf das Postfach möglich.

(Neuere Versionen des Connectors, beispielsweise ab OL2021, erstellen die Eigenschaft 0x662A001F überhaupt nicht mehr.)

### Weiterführende Literatur

Die Registrierung „Windows“ muss normalerweise nicht geändert werden, aber für Neugierige gibt es einige Optionen.

- <https://docs.microsoft.com/en-us/outlook/troubleshoot/profiles-and-accounts/unexpected-autodiscover-behavior>

## Technische Details zu hängenden Verbindungen

Outlook und Tools wie MFCMAPI rufen in der Regel Funktionen der mapi32.dll aus demselben Thread auf, in dem auch die Benutzeroberfläche ausgeführt wird. Die Benutzeroberfläche wird während der Ausführung der MAPI-Funktionen blockiert. Wenn die Benutzeroberfläche eine Zeit lang nicht reagiert, markiert die Desktop-Shell das Fenster als nicht reagierend.

Moderne Verbindungen zu Servern vom Typ Exchange verwenden HTTP (TCP), doch selbst wenn ein Server TCP-RST/FIN sendet, scheinen die MSRPC-Bibliotheken eine Weile zu brauchen, um dies zu erkennen. Wir vermuten, dass dies ein Nebeneffekt des historischen Designs von DCERPC/MSRPC ist, das Datagramm-Übertragungen zulässt – während verbindungsorientierte Übertragungen erst nachträglich hinzugefügt wurden.

Im Cache-Modus werden MAPI-Aufrufe aus der Anwendung heraus an der OST-Datei beendet. Die Synchronisierung zwischen OST und Server läuft in einem separaten Thread. Daher wirken sich Verbindungsunterbrechungen normalerweise nicht auf die Benutzeroberfläche aus, obwohl komplexe Abfragen, die den Inhalt der OST-Datei betreffen (z. B. das Öffnen eines Ordners mit 50.000 E-Mails), dennoch davon betroffen sein können.

Bei MFCMAPI mit einem MAPI-Profil im Online-Modus lässt sich bei einer Unterbrechung der Verbindung beobachten, dass das Speicher-Handle „herunterfährt“ und eine Reihe nachfolgender MAPI-Aufrufe einen Netzwerkfehler zurückgeben, bis mapi.dll oder das Programm beschließt, sich effektiv erneut anzumelden und ein neues, gültiges Store-Handle zu erhalten. (Dabei stürzt MFCMAPI manchmal ab. Outlook scheint damit besser umzugehen und läuft weiter.)
