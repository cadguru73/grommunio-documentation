---
title: "Fehler bei Outlook"
description: "Wenn beim Hinzufügen eines neuen persönlichen Kontakts die Adresse im Feld „E-Mail“ nicht unterstrichen ist, enthält die Eigenschaft „PidLidAddressBookProviderArray“ …"
sidebar:
  order: 10
---

Wenn beim Hinzufügen eines neuen persönlichen Kontakts die Adresse im Feld „E-Mail“ <em>nicht</em> unterstrichen ist, hat die Eigenschaft `PidLidAddressBookProviderArray` den Wert `0`. Der Kontakt wird nicht im Ordner „AB Hierarchy Root (CONTAB.DLL) ► Outlook Adressbuch ► Kontakte“ angezeigt, da dort eine Einschränkung von `PR_MESSAGE_CLASS == IPM.DistList || (PR_MESSAGE_CLASS == IPM.Contact && PidLid..Array != 0)` für das PAB gilt.

## AB-Hierarchie

Der AB-Stammcontainer hat keine Eintrags-ID. Untergeordnete Elemente des Stamms:

- contab.dll stellt das „Outlook-Adressbuch“ bereit; dieser Ordner und seine Unterobjekte haben die PR_AB_PROVIDER_ID = `FD42AA0A18C71A10E8850B651C240000` (interessanterweise entspricht dies muidContab minus einem Bit)
- emsmdb.dll stellt die „Globale Adressliste“ sowie weitere Container (aus NSPI) bereit. PR_AB_PROVIDER_ID ist muidEMSAB, die Provider-UID in der entryid ist zufällig (möglicherweise profilabhängig).

Untergeordnete Elemente von OAB in der Hierarchie:

- Eigentlich sollte es für jeden `IPF.Contact`, der in einem Geschäft gefunden wird, einen Ordner geben, aber das ist nicht der Fall. Meistens ist es nur `Contacts`. Die Eintrags-ID lautet FE42…, daher werden der Ordner und sein Inhalt tatsächlich von CONTAB generiert.

Inhaltliche Unterordnungen von OABContacts:

- CONTAB greift auf den Speicher „Contacts“ zu, wendet eine Tabelleneinschränkung `(PR_MESSAGE_CLASS = "IPM.DistList" || (PR_MESSAGE_CLASS = "IPM.Contact" && PidLid… != 0))` an und verwendet das Ergebnis für OABContacts. Die „Entryids“ der Mitglieder lauten `00000000FE42AA0A18C71A10E8850B651C2400000300000004000000FF0000004600000000000000D13…` und enthalten einen Verweis auf den eigentlichen Speicher (D13…), ähnlich wie MUIDZCSAB den Hauptspeicher und dessen EID umschließt.

Inhaltliche Untereinheiten von GAL:

- von NSPI bereitgestellt, ohne Schnickschnack
