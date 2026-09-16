---
title: "Verbindung von Outlook und anderen Clients herstellen"
description: "Richten Sie Ihr grommunio-Konto in Microsoft, Outlook, Android und iOS sowie in Microsoft Mail und Mozilla Thunderbird ein – unter Verwendung der nativen Protokolle von grommunio."
sidebar:
  label: "Andere Clients"
  order: 30
---

Neben [grommunio Web](/web/) und [grommunio Desk](/user/desk/) können Sie
Ihr grommunio-Konto mit einem Client verbinden, den Sie bereits nutzen. grommunio unterstützt die
nativen Protokolle – Exchange/MAPI für Outlook, Exchange ActiveSync (EAS) für
mobile Geräte sowie IMAP/SMTP mit CalDAV/CardDAV für Clients wie
Thunderbird – die Einrichtung beschränkt sich daher in der Regel auf die Eingabe Ihrer E-Mail-Adresse und Ihres
Passworts.

:::note
Nicht jeder Client unterstützt alle Funktionen des grommunio. Für den vollständigen Funktionsumfang
verwenden Sie [grommunio Web](/web/).
:::

## Microsoft Outlook

grommunio-Konten können für Microsoft und Outlook konfiguriert werden, da grommunio die von Microsoft und Outlook verwendeten Protokolle nativ unterstützt (RPC-over-HTTP und MAPI-HTTP).

Bei dieser Konfiguration wird davon ausgegangen, dass bisher noch keine Profile eingerichtet wurden. Falls bereits MAPI-Profile auf dem System vorhanden sind, können neue Profile und Konten durch Ausführung von `outlook /profiles` hinzugefügt werden.

1.  Wählen Sie einen Namen für das neue Profil aus und bestätigen Sie die Eingabe.

![Outlook: New profile](/img/user_outlook_1.png)

2.  Im folgenden Dialogfeld fragt der Outlook-Profilassistent nach Ihrer E-Mail-Adresse. Es wird empfohlen, die Option „Ich möchte mein Konto manuell einrichten“ zu aktivieren, um sicherzustellen, dass das richtige Protokoll ausgewählt wird, da einige Outlook-Versionen andernfalls ein nicht natives Protokoll wie IMAP wählen, was zu Funktionseinschränkungen führen würde.

![Outlook: Account email address](/img/user_outlook_2.png)

3.  Das Dialogfeld zur Auswahl des Kontotyps bzw. des Protokolls. Wählen Sie für grommunio die Option „Exchange“ aus.

![Outlook: Exchange account type](/img/user_outlook_4.png)

4.  Der folgende Fortschrittsdialog kann einige Sekunden dauern, da Outlook nun zum ersten Mal versucht, eine Verbindung zum Postfach herzustellen und das Outlook-Profil zu füllen. Dabei werden Sie zur Eingabe Ihrer Anmeldedaten aufgefordert. Wählen Sie „Anmeldedaten speichern“, um das Passwort für diese Benutzeridentität im Windows-System zu speichern. Wenn Outlook den Zugriff auf das Postfach anfordert, kann dies fortan ohne erneute Abfrage erfolgen.

![Outlook: Account setup in progress / Entry of credentials](/img/user_outlook_5.png)

5.  Im Rahmen der manuellen Einrichtung zeigt der Assistent eine weitere Seite mit den Offline-Einstellungen an. Hier können Sie zwischen dem Online-Modus und dem Cache-/Offline-Modus wechseln. Wenn der Offline-Modus aktiviert ist, speichert Outlook eine Kopie des Postfachs lokal und nutzt eine bidirektionale Synchronisation. Es wird ein Schieberegler angezeigt, mit dem der Zeitraum der zu synchronisierenden Nachrichten festgelegt werden kann. Ältere Versionen von Outlook bieten eine Auswahl aus einer Handvoll Optionen für den Zeitraum, z. B. 1 Tag, 1 Woche, 2 Wochen, … 3 Monate und „Alle“. Aktuelle Versionen von Outlook (ab ca. 2019) weisen jedoch einen Fehler auf: Der Schieberegler ist ausgegraut, sodass für den Offline-Modus nur noch die vollständige Synchronisation zur Verfügung steht.

![Outlook: Settings for offline mode](/img/user_outlook_6.png)

7.  Das Profil ist nun eingerichtet und einsatzbereit.

![Outlook: Account setup complete](/img/user_outlook_7.png)

:::note
Standardmäßig wird bei der Kontoeinrichtung der Kontotyp „Microsoft Exchange“ angezeigt. Die Einrichtungsprozedur für Microsoft und Outlook mit der grommunio-Groupware unterscheidet sich nicht von der Einrichtung mit Microsoft Exchange. Wie bei Microsoft Exchange ist das Standardprofil für den Offline-/Cache-Modus eingerichtet, der das Postfach für die Offline-Nutzung synchronisiert. Die grommunio-Groupware unterstützt den Offline-/Cache-Modus. In einigen Anwendungsfällen ist dies jedoch möglicherweise nicht wünschenswert und sollte deaktiviert werden, z. B. in den meisten Remote-Desktop-Server-Umgebungen.
:::

:::caution
Für die Groupware-Funktionen von grommunio muss keine separate Software installiert werden. Die genaue Vorgehensweise bei der Einrichtung von Microsoft und Outlook kann jedoch je nach verwendeter Version von der oben beschriebenen abweichen. Wenn Sie das Outlook-Konto bei Verwendung der grommunio-Groupware einrichten, führen Sie die Client-Installation so durch, als würde es mit Microsoft Exchange konfiguriert. Zu Automatisierungszwecken kann Software von Drittanbietern zur Erstellung von Konten und Profilen verwendet werden, sofern die Kompatibilität dieser Software Microsoft Exchange umfasst.
:::

## Android

grommunio-Konten lassen sich problemlos zu Android-Geräten hinzufügen, da diese das Microsoft-Exchange ActiveSync-Protokoll (EAS) nativ unterstützen.

1.  Um Ihr grommunio-Konto zu Ihrem Android-Gerät hinzuzufügen, rufen Sie die Seite `Settings -> Accounts` auf und wählen Sie `Exchange` aus.

![Android: Add Exchange account](/img/user_exchange_android_1.png)

2.  Geben Sie im folgenden Einrichtungsdialog Ihre E-Mail-Adresse ein und wählen Sie `Next` aus

![Android: Configure account email address](/img/user_exchange_android_2.png)

3.  Geben Sie im folgenden Einrichtungsdialog Ihr Passwort ein und wählen Sie `Next` aus.

![Android: Configure account password](/img/user_exchange_android_3.png)

4.  Nach Abschluss der Kontoeinrichtung werden Ihre Daten im Hintergrund synchronisiert.

Je nach Konfiguration des grommunio-Backends werden Sie möglicherweise aufgefordert, eine Unternehmensrichtlinie zu akzeptieren, um die Konfiguration abzuschließen und zu bestätigen. Beachten Sie, dass dies (abhängig von Ihrer Konfiguration) Systemadministratoren (und Ihnen selbst über das grommunio-Web) ermöglichen könnte, bestimmte Richtlinien festzulegen oder das Gerät über die Verwaltung mobiler Geräte zu verwalten. Die Rechte, die Sie im Rahmen dieses sogenannten Provisioning-Schritts gewähren, werden im folgenden Dialogfeld angezeigt. Die Möglichkeiten der Profileinstellungen variieren je nach Android-Version und OEM-Konfiguration (Marke des Mobilgeräts).

Nachdem Sie das Gerät eingerichtet haben, wird Ihr neues Konto unter `Settings -> Accounts` angezeigt. Dort haben Sie die Möglichkeit, weitere Konfigurationsoptionen in Ihrem Profil festzulegen (z. B. Signaturen, Synchronisierungsintervalle und mehr). Die verfügbaren Konfigurationsoptionen variieren je nach Android-Version und OEM-Konfiguration (Marke des Mobilgeräts).

Durch die Konfiguration Ihres Mobilgeräts mit einem Exchange-Konto hat Ihr Mobilgerät über die PIM-Schnittstelle (Personal Information Manager) Zugriff auf die Daten Ihres Kontos. Dadurch können Sie Ihr grommunio-Postfach mit einer Vielzahl von Anwendungen Ihrer Wahl nutzen, beispielsweise mit einer E-Mail- oder Kalender-App Ihrer Wahl.

## Apple iOS

grommunio-Konten lassen sich problemlos zu iOS-Geräten (wie iPhone oder iPad) hinzufügen, da diese das Microsoft-Exchange ActiveSync-Protokoll (EAS) nativ unterstützen.

1.  Um Ihr grommunio-Konto zu Ihrem iOS-Gerät hinzuzufügen, rufen Sie die Seite `Settings` auf und wählen Sie `Mail` aus.

![iOS: Navigate to Mail](/img/user_exchange_iphone_1.png)

2.  Wählen Sie im Feld `Mail settings` die Option `Add Account` aus

![iOS: Add Account](/img/user_exchange_iphone_2.png)

3.  Wählen Sie im folgenden Einstellungsdialog „`Microsoft Exchange`“ als Kontotyp aus

![iOS: Select Microsoft Exchange](/img/user_exchange_iphone_3.png)

4.  Geben Sie im folgenden Einrichtungsdialog Ihre E-Mail-Adresse ein, wählen Sie eine Kontobeschreibung aus und wählen Sie `Next`

![iOS: Enter account information](/img/user_exchange_iphone_4.png)

5.  Nachdem Sie Ihre Kontoinformationen bestätigt haben, werden Sie gefragt, ob Sie sich mit Microsoft anmelden oder Ihre Kontoinformationen manuell konfigurieren möchten. Da grommunio mit der AutoDiscover-Technologie ausgestattet ist, stehen Ihnen beide Möglichkeiten zur Verfügung.

![iOS: Sign in via Microsoft](/img/user_exchange_iphone_5.png)

6.  Im folgenden Dialogfeld wurden Ihre Anmeldedaten (die Sie eingeben müssen) erfolgreich überprüft, und Sie können auswählen, welche Informationen mit Ihrem iOS-Gerät synchronisiert werden sollen, nämlich E-Mail, Kontakte, Kalender, Erinnerungen und Notizen. Nachdem Sie `Save` gedrückt haben, ist die Einrichtung Ihres Kontos abgeschlossen und Ihre Daten werden im Hintergrund synchronisiert.

![iOS: Available synchronization data](/img/user_exchange_iphone_6.png)

7.  Nach Abschluss der Kontoeinrichtung werden Ihre Daten im Hintergrund synchronisiert.

Je nach Konfiguration des grommunio-Backends werden Sie möglicherweise aufgefordert, eine Unternehmensrichtlinie zu akzeptieren, um die Konfiguration abzuschließen und zu bestätigen. Beachten Sie, dass dies (abhängig von Ihrer Konfiguration) Systemadministratoren (und Ihnen selbst über das grommunio-Web) ermöglichen könnte, bestimmte Richtlinien festzulegen oder das Gerät über die Verwaltung mobiler Geräte zu verwalten. Die Möglichkeiten der Profileinstellungen variieren je nach iOS-Version.

Durch die Konfiguration Ihres Mobilgeräts mit einem Exchange-Konto hat Ihr Mobilgerät über die PIM-Schnittstelle (Personal Information Manager) Zugriff auf die Daten Ihres Kontos. Dadurch können Sie Ihr grommunio-Postfach mit einer Vielzahl von Anwendungen Ihrer Wahl nutzen, beispielsweise mit einer E-Mail- oder Kalender-App Ihrer Wahl.

## Microsoft E-Mail

grommunio-Konten lassen sich problemlos zu Microsoft Mail hinzufügen, da grommunio die von Microsoft Mail verwendeten Protokolle nativ unterstützt.

1.  Um Ihr grommunio-Konto zu Microsoft Mail hinzuzufügen, öffnen Sie Microsoft Mail, wählen Sie im linken Menü „`Accounts`“ aus und anschließend im Kontoverwaltungsbereich auf der rechten Seite „`Add account`“.

![Microsoft Mail: New account](/img/user_msmail_1.png)

2.  Wählen Sie im folgenden Dialogfeld des Microsoft-E-Mail-Kontoassistenten den Kontotyp `Office 365` aus der Liste aus.

![Microsoft Mail: Select Office 365 account type](/img/user_msmail_2.png)

3.  Im folgenden Dialogfeld werden Sie zur Eingabe der E-Mail-Adresse aufgefordert. Geben Sie diese hier ein und wählen Sie `Next`, um fortzufahren.

![Microsoft Mail: Account email setup](/img/user_msmail_3.png)

4.  Nach einigen Sekunden erscheint der nächste Dialog, in dem Sie nach dem Passwort des Kontos gefragt werden. Wählen Sie nach der Eingabe `Logon` aus.

![Microsoft Mail: Account password setup](/img/user_msmail_4.png)

5.  Nach Eingabe der Anmeldedaten erkennt Microsoft Mail (auf Basis der AutoDiscover-Technologie) Ihre Einstellungen nach wenigen Sekunden automatisch.

![Microsoft Mail: Account discovery](/img/user_msmail_5.png)

6.  Nach Abschluss der Kontoeinrichtung bestätigt Microsoft Mail die erfolgreiche Kontoerstellung und synchronisiert alle Daten mit Ihrem Microsoft- bzw. Windows-Gerät.

![Microsoft Mail: Account setup complete](/img/user_msmail_6.png)

![Microsoft Mail: Account available for use](/img/user_msmail_7.png)

:::note
Microsoft Mail speichert die Anmeldedaten automatisch, ohne dass diese Funktion deaktiviert werden kann. Das Passwort wird dabei in dem Benutzerprofil „Microsoft Windows“ gespeichert, das bei der Kontoerstellung verwendet wurde.
:::

:::caution
Bei der Kontoerstellung in Microsoft Mail erhalten die Standard-Apps `People` und `Calendar` von Windows automatisch Zugriff auf dieselben Kontoinformationen und synchronisieren Ihr grommunio-Konto automatisch mit dem Microsoft- und Windows-Gerät.
:::

## Mozilla Thunderbird

Mozilla ist ein kostenloser und quelloffener, plattformübergreifender E-Mail- und Kontaktmanager. grommunio unterstützt Mozilla Thunderbird vollständig mit dessen Hauptprotokollen IMAP(s), POP3(s), SMTP(s) sowie CalDAV(s). Da grommunio zudem CardDAV(s) vollständig unterstützt, kann das offizielle Mozilla Thunderbird-Plugin namens „CardBook“ zur Synchronisierung von Kontakten verwendet werden.

### Thunderbird: E-Mail

1.  Um ein E-Mail-Konto bei Mozilla Thunderbird einzurichten, wählen Sie `File -> New -> Existing Mail Account...` und geben Sie die Einstellungen Ihres persönlichen E-Mail-Kontos ein:

![Thunderbird: Set Up your existing Email Address](/img/add-account-1.png)

Wenn Sie möchten, dass Ihre Anmeldedaten auf Ihrem System gespeichert werden, verwenden Sie die Option `Remember password`, damit Sie beim nächsten Öffnen von Mozilla Thunderbird nicht erneut zur Eingabe aufgefordert werden.

Drücken Sie `Continue`, sobald Sie sich vergewissert haben, dass Ihre Angaben korrekt sind.

![Thunderbird: Set Up your existing Email Address, detailed information automatically detected.](/img/add-account-2.png)

2.  Auf der Übersichtsseite werden Ihnen die für Mozilla Thunderbird verfügbaren Funktionen angezeigt. Während der Konfiguration wird möglicherweise die Warnung `Configuration found, but no addons known to handle the config` angezeigt. Sie können diesen Hinweis getrost ignorieren, da Mozilla Thunderbird nicht alle von grommunio unterstützten Protokolle versteht, was der Grund für die Anzeige dieser Warnung ist. Mozilla Thunderbird ermittelt automatisch die richtigen Mailserver-Daten für Sie und richtet die Protokollverschlüsselung für Sie ein. Wählen Sie Ihr bevorzugtes Protokoll aus (`Done`), und schon ist Ihr Konto eingerichtet.

### Thunderbird: Kalender

1.  Um ein Kalenderkonto bei Mozilla Thunderbird einzurichten, wählen Sie `File -> New -> Calendar...` und geben Sie `On the Network` als Speicherort für Ihren Kalender an.

![Thunderbird: Setup your remote calendar account (CalDAV)](/img/caldav-add-account-1.png)

2.  Wählen Sie im folgenden Dialogfeld als Format „`CalDAV`“ aus, geben Sie Ihren Benutzernamen ein und legen Sie den Speicherort entsprechend fest. Standardmäßig ist Ihr persönlicher Kalender unter „https://\2/dav/calendars/\3/\4".“ erreichbar. Falls Ihnen diese Informationen nicht vorliegen, wenden Sie sich bitte an Ihren Administrator, damit er Ihnen die entsprechenden Angaben zur Verfügung stellt. In den meisten Fällen entspricht die Server-URL Ihrer grommunio Web-URL. Durch Aktivieren des Kontrollkästchens `Offline Support` stellen Sie sicher, dass Sie auch ohne aktive Verbindung zu Ihrem Provider auf Ihre Kalenderdaten zugreifen können.

![Thunderbird: Setup remote calendar information](/img/caldav-add-account-2.png)

:::note
Da grommunio mehrere Kalender in einem Postfach unterstützt, muss „\<Calendar Name\>“ explizit angegeben werden. Beachten Sie, dass diese URL groß- und kleinschreibungsabhängig ist, was bedeutet, dass der Kalender im Postfach eines Benutzers beispielsweise auf Deutsch höchstwahrscheinlich „`Kalender`“ heißt.
:::

3.  Im nächsten Dialogfenster der CalDAV-Kontoeinrichtung haben Sie die Möglichkeit, Ihr Kalenderkonto einzurichten, z. B. einen bestimmten Namen und eine Farbe festzulegen sowie Erinnerungen zu aktivieren. Es wird empfohlen, das entsprechende E-Mail-Konto korrekt auszuwählen – so wird sichergestellt, dass Termine der richtigen Kalender-/Postfach-Kombination zugeordnet werden.

![Thunderbird: Personal configuration of remote calendar](/img/caldav-add-account-3.png)

4.  Im abschließenden Dialogfeld werden Sie aufgefordert, Ihre Anmeldedaten einzugeben, um auf Ihren Kalender zugreifen zu können. An der Eingabeaufforderung „`The site says: "grommunio dav"`“ können Sie erkennen, dass Sie mit der richtigen Server-URL verbunden sind. Verwenden Sie dieselben Anmeldedaten wie für Ihr E-Mail-Konto, um auf Ihre Kalenderdaten zuzugreifen.

![Thunderbird: Authentication for remote calendar](/img/caldav-add-account-4.png)

### Thunderbird: Kontakte

1.  Um ein Kontaktkonto mit Mozilla Thunderbird einzurichten, muss zunächst ein Plugin für Mozilla Thunderbird installiert werden. Das bekannte Plugin „CardBook“ wurde mit grommunio umfassend getestet und wird von diesem unterstützt; es ist unter folgendem Link verfügbar: <https://addons.thunderbird.net/de/thunderbird/addon/cardbook/>. Laden Sie das Plugin herunter und installieren Sie es, damit Ihre Mozilla Thunderbird-Installation die Kontaktverwaltung auf Basis des vCARD-Standards unterstützt. Zur Installation müssen Sie das Plugin (ein XPI-Archiv) herunterladen und installieren oder es direkt in Mozilla Thunderbird über `File -> Add-Ons` herunterladen, nach dem Add-on `CardBook` suchen und `Add to Thunderbird` auswählen. Es wird automatisch installiert, und während der Installation werden Sie um die erforderlichen Berechtigungen gebeten, die für den ordnungsgemäßen Betrieb des Plugins akzeptiert werden müssen.

![Thunderbird: Installation of CardBook plugin](/img/carddav-add-account-1.png)

2.  Wählen Sie nach der Installation in Mozilla Thunderbird die Registerkarte „CardBook“ aus. Wählen Sie dort „`Addressbook -> New Adressbook`“ aus, legen Sie als Speicherort für das Adressbuch „`Remote`“ fest und wählen Sie „`Next >`“ aus.

![Thunderbird: Selection of remote address book](/img/carddav-add-account-2.png)

3.  Um Ihren grommunio-Ordner „Kontakte“ einzurichten, wählen Sie `CardDAV` als Typ für Ihr externes Adressbuch. Standardmäßig ist Ihr persönlicher Kalender unter „https://\2".“ erreichbar. In den meisten Fällen entspricht die Server-URL Ihrer grommunio Web-URL. Nachdem Sie Ihre Anmeldedaten (Benutzername und Passwort) eingegeben haben, können Sie die korrekte Konfiguration mit der Schaltfläche `Validate` überprüfen.

![Thunderbird: Setup of remote address book (CardDAV)](/img/carddav-add-account-3.png)

4.  Wählen Sie nach erfolgreicher Überprüfung „`Next >`“, um mit der Konfiguration Ihres Adressbuchs fortzufahren.

![Thunderbird: Validation of remote address book configuration](/img/carddav-add-account-4.png)

5.  Im abschließenden Dialogfeld haben Sie verschiedene Optionen zur Einrichtung Ihres Adressbuchkontos, beispielsweise die Vergabe eines bestimmten Namens und einer bestimmten Farbe. Wenn Sie das Kontrollkästchen `Work Offline` aktivieren, stellen Sie sicher, dass Sie auch ohne aktive Verbindung zu Ihrem Anbieter auf Ihre Kalenderdaten zugreifen können.

![Thunderbird: Personal configuration of remote address book](/img/carddav-add-account-5.png)
