---
title: "Suche"
description: "Outlook und g-web verwenden unter verschiedenen Umständen unterschiedliche Suchfilter (Einschränkungen bei MAPI), sodass es möglich ist, dass sie unterschiedliche Ergebnisse liefern."
sidebar:
  order: 140
---

## Unterschiedliche Suchergebnisse

Outlook und g-web verwenden unter verschiedenen Umständen unterschiedliche Suchfilter (Einschränkungen bei MAPI), sodass es möglich ist, dass sie unterschiedliche Ergebnisse liefern.

Standardmäßige Einschränkung von Outlook (Online-Modus) bei Verwendung der Schnellsuche (DE:Sofortsuche) im Posteingang (22 Bedingungen, verknüpft mit „ODER“):

- 19 Eigenschaften wurden anhand der benutzerdefinierten Suchbegriffe geprüft:  
  - 0037001fh PR_SUBJECT
  - 0042001fh PR_SENT_REPRESENTING_NAME
  - 0065001fh PR_SENT_REPRESENTING_EMAIL_ADDRESS
  - 0c1a001fh PR_SENDER_NAME
  - 0c1f001fh PR_SENDER_EMAIL_ADDRESS
  - 0e02001fh PR_DISPLAY_BCC
  - 0e03001fh PR_DISPLAY_CC
  - 0e04001fh PR_DISPLAY_TO
  - 1000001fh PR_BODY
  - PSETID_Appointment,LID=8208h PidLidLocation
  - PSETID_Common,LID=85a4h PidLidToDoTitle
  - PSETID_Sharing,LID=8a04h PidLidSharingRemotePath
  - PSETID_Sharing,LID=8a05h PidLidSharingRemoteName
  - PSETID_Sharing,LID=8a07h PidLidSharingInitiatorName
  - PSETID_Sharing,LID=8a0fh PidLidSharingLocalName
  - PSETID_Sharing,LID=8a2fh PidLidSharingRemoteComment
  - PSETID_Sharing,LID=8a51h PidLidSharingBrowseUrl
  - PS_PUBLIC_STRINGS,NAME=Schlüsselwörter (Kategorien)
  - PSETID_UnifiedMessaging,NAME=UMAudioNotes

- 3 Fälle einer widersprüchlichen (unsinnigen) Bedingung: `RES_AND{RES_EXIST{PR_LAST_MODIFCATION_TIME}, RES_NOT{RES_EXIST{PR_LAST_MODIFICATION_TIME}}}`

Standardmäßige Einschränkung von Outlook (Online-Modus) für die Schnellsuche im Papierkorb (44 Bedingungen):

- 19+3 aus dem obigen Abschnitt sowie 22 weitere Eigenschaften:  
  - 3001001fh PR_DISPLAY_NAME
  - 3a08001fh PR_BUSINESS_TELEPHONE_NUMBER
  - 3a09001fh PR_HOME_TELEPHONE_NUMBER
  - 3a16001fh PR_COMPANY_NAME
  - 3a17001fh PR_COMPANY_NAME
  - 3a18001fh PR_DEPARTMENT_NAME
  - 3a1b001fh PR_BUSINESS2_TELEPHONE_NUMBER
  - 3a1c001fh PR_MOBILE_TELEPHONE_NUMBER
  - PSETID_Address,LID=8005h PidLidFileUnder
  - PSETID_Address,LID=801ah PidLidHomeAddress
  - PSETID_Address,LID=801bh PidLidWorkAddress
  - PSETID_Address,LID=801ch PidLidOtherAddress
  - PSETID_Address,LID=802ch PidLidYomiFirstName
  - PSETID_Address,LID=802dh PidLidYomiLastName
  - PSETID_Address,LID=802eh PidLidYomiCompanyName
  - PSETID_Address,LID=8083h PidLidEmail1E-Mail-Adresse
  - PSETID_Address,LID=8093h PidLidEmail2E-Mail-Adresse
  - PSETID_Address,LID=80a3h PidLidEmail3EmailAddress
  - PSETID_Task,LID=811fh PidLidTaskOwner
  - PSETID_Common,LID=8539h PidLidCompanies
  - PSETID_Common,LID=853ah PidLidContacts
  - PSETID_Log,LID=8700h PidLidLogType

Wenn OL im Speicher den Wert „PR_CI_SEARCH_ENABLED“ erkennt, verwendet es stattdessen:

- 1 Eigenschaft wurde anhand der benutzerdefinierten Suchbegriffe geprüft  
  - 0eaf001fh PR_SEARCH_ALL_INDEXED_PROPS

Wenn OL das gesamte Postfach durchsuchen soll, werden weitere Bedingungen hinzugefügt:

- Die Nachrichtenklasse muss einer der folgenden Werte sein: `IPM.Document`, `IPM.Note`, `IPM.Post`, `IPM.Recall`, `IPM.Schedule`, `IPM.Sharing`, `IPM.TaskRequest` `REPORT`

Bei Verwendung des Dialogfelds „Erweiterte Suche“ (DE:Erweiterte Suche) in OL wird PR_SEARCH_ALL_INDEXED_PROPS nicht verwendet.

Outlook (Cached Mode) verwendet möglicherweise noch einen weiteren Filter.

Standardfilter des grommunio-web:

- 41 Eigenschaften in 8 Klassen:  
  - 37001fh PR_SUBJECT
  - 42001fh PR_SENT_REPRESENTING_NAME
  - 65001fh PR_SENT_REPRESENTING_EMAIL_ADDRESS
  - c1a001fh PR_SENDER_NAME
  - c1f001fh PR_SENDER_EMAIL_ADDRESS
  - e03001fh PR_DISPLAY_CC
  - e04001fh PR_DISPLAY_TO
  - 1000001fh PR_BODY
  - 3001001fh PR_DISPLAY_NAME
  - 3a02001fh PR_CALLBACK_TELEPHONE_NUMBER
  - 3a05001fh PR_GENERATION
  - 3a08001fh PR_BUSINESS_TELEPHONE_NUMBER
  - 3a09001fh PR_PRIVAT_TELEFONNUMMER
  - 3a16001fh PR_FIRMENNAME
  - 3a1a001fh PR_HAUPT-TELEFONNUMMER
  - 3a1b001fh PR_BUSINESS2_TELEPHONE_NUMBER
  - 3a1c001fh PR_MOBILE_TELEPHONE_NUMBER
  - 3a1d001fh PR_FUNKNUMMER
  - 3a1e001fh PR_AUTOTELEFONNUMMER
  - 3a1f001fh PR_SONSTIGE_TELEFONNUMMER
  - 3a21001fh PR_PAGER-NUMMER
  - 3a23001fh PR_PRIMÄRE_FAXNUMMER
  - 3a24001fh PR_GESCHÄFTS-FAXNUMMER
  - 3a25001fh PR_PRIVAT-FAXNUMMER
  - 3a2c001fh PR_TELEX-NUMMER
  - 3a2e001fh PR_TELEFONNUMMER_ASSISTENT
  - 3a2f001fh PR_PRIVAT2_TELEFONNUMMER
  - 3a45001fh PR_ANZEIGENAME_PRÄFIX
  - 3a4b001fh PR_TTYTDD_TELEFONNUMMER
  - 3a57001fh PR_HAUPT-TELEFONNUMMER_DES_UNTERNEHMENS
  - PSETID_Address,LID=8005h PidLidFileUnder
  - PSETID_Address,LID=801ah PidLidHomeAddress
  - PSETID_Address,LID=801bh PidLidWorkAddress
  - PSETID_Address,LID=801ch PidLidOtherAddress
  - PSETID_Address,LID=8083h PidLidEmail1EmailAddress
  - PSETID_Address,LID=8093h PidLidEmail2EmailAddress
  - PSETID_Address,LID=80a3h PidLidEmail3EmailAddress
  - PSETID_Task,LID=33055 PidLidTaskOwner
  - PSETID_Appointment,LID=33288 PidLidLocation
  - PSETID_Common,LID=34105 PidLidCompanies
  - PS_PUBLIC_STRINGS,NAME=Schlüsselwörter (Kategorien)

- Klassen:  
  - IPM.Appointment, IPM.Contact, IPM.DistList, IPM.Note (Standardnachricht), IPM.Schedule, IPM.StickyNote, IPM.Task, REPORT.IPM.Note

- Bei der Klassenauswahl werden somit beispielsweise folgende Elemente übersprungen (nicht erschöpfende Liste):  
  - IPM.Activity (Journal), IPM.Post (Beitrag im öffentlichen Ordner), SMIME-Nachrichten

- Da BCC nicht in der Liste aufgeführt ist, würden Entwürfe mit einem ansonsten übereinstimmenden BCC-Eintrag übersprungen werden

Mit dem Dienstprogramm MFCMAPI lassen sich die Suchkriterien (Filter) überprüfen.

![](/img/mfcmapi_searchcrit.png)
