---
title: "Nachrichtenregeln"
description: "MAPI ermöglicht es, Regeln für jeden einzelnen Ordner festzulegen (vgl. MS-OXORULE §1.3), doch die Art und Weise, wie dies von den Clients in ihrer Benutzeroberfläche dargestellt wird, variiert."
sidebar:
  order: 110
---

## Regeln verwalten

MAPI ermöglicht es, Regeln für *jeden einzelnen Ordner* festzulegen (vgl. MS-OXORULE §1.3), doch die Art und Weise, wie dies von den Clients in ihrer Benutzeroberfläche dargestellt wird, variiert.

- Outlook (Stand: 2021) unterstützt nur die Bearbeitung von Regeln für den Posteingang des standardmäßigen privaten Speichers sowie für öffentliche Ordner.
  - Um die Regeltabelle des Ordners „Posteingang“ des standardmäßigen privaten Speichers in Outlook zu bearbeiten, wählen Sie „Datei“ » „Regeln und Benachrichtigungen verwalten“.
  - Um die Regeltabelle von Ordnern in öffentlichen Speichern in Outlook zu bearbeiten, wählen Sie den Ordner in der Ordnerhierarchieansicht aus, rufen Sie das Kontextmenü auf und wählen Sie „Eigenschaften“. Der Eigenschaften-Dialog enthält die Schaltfläche „Ordner-Assistent“.
  - „Ordnerassistent“ ist bei Exchange-Servern (2019) ausgegraut und bei Gromox-Servern aktiviert.
- grommunio-web unterstützt nur die Bearbeitung von Regeln für den Posteingang des Standard-Privatspeichers. (Einstellungen » Regeln)
- Um die Regeltabelle eines beliebigen Ordners in MFCMAPI anzuzeigen, wählen Sie den Ordner in der Hierarchieansicht aus, rufen Sie das Kontextmenü auf und wählen Sie „Weitere Tabellen » Regeltabelle“. MFCMAPI unterstützt das Hinzufügen von Regeln nicht und kann auch die Eigenschaft PR_RULE_ACTIONS nicht bearbeiten.

## Auslöser für Regelprozessoren

- Wenn eine Nachricht zum ersten Mal über einen öffentlichen Speicherordner gespeichert wird, werden die für diesen Ordner definierten Regeln auf die Nachricht angewendet. (vgl. OXORULE §1.3) Dies fehlt in gromox-zcore 2.3 und ist nur in gromox-emsmdb (OL/MSMAPI) implementiert.
- Wenn eine Nachricht in einen privaten Speicherordner **zugestellt** wird, werden die für diesen Ordner definierten Regeln auf die Nachricht angewendet. „Zustellung“ ist eine Aktion, die „Nachricht speichern“ impliziert, sich jedoch davon unterscheidet. Die Zustellung wird nur durch `gromox-delivery` oder `gromox-mt2exm -D` ausgelöst.

## Hinweise zur Regelausführung

- OXORULE §1.3, S. 11, Abs. 4 legt fest, dass „die verbleibenden Regeln weiterhin auf die verschobene Nachricht angewendet werden“.
  - Exchange 2019 verstößt gegen diese OXORULE-Anforderung. `OP_MOVE`-Aktion kopiert die Nachricht in den gewünschten Zielordner und plant anschließend die Löschung der Originalnachricht ein. (Eine Nachricht, die an einen privaten Speicher-Posteingang gesendet wird, dessen Regeltabelle drei OP_MOVE-Regeln enthält, erzeugt drei statt einer E-Mail.)
  - Gromox 2.3: (ebenso)
- OXORULE §1.3, S. 11, Abs. 5 legt fest, dass „der Server die Regeln des Zielordners auf die verschobene Nachricht anwendet, nachdem er die verbleibenden Regeln im ursprünglichen Ordner ausgewertet hat“
  - Gromox 2.3: Die Regeln des Zielordners werden für die neue Nachricht unmittelbar nach der Erstellung der Kopie ausgewertet (siehe oben). Die verbleibenden Regeln im ursprünglichen Ordner werden später fortgesetzt (und auf die ursprüngliche Nachricht angewendet, nicht auf die Kopie).
- Ausführungsreihenfolge
  - Gromox 2.3: Verarbeitet zuerst die Standardregeln (sortiert nach Sequenznummer), dann die erweiterten Regeln (sortiert nach Sequenznummer).
  - OXORULE gibt zwar eine gewisse Orientierung, ist aber vage: „Es gelten dieselben syntaktischen Einschränkungen und semantischen Bedeutungen der Werte wie bei der jeweiligen Eigenschaft, die \[für Standardregeln\] definiert ist“ (§2.2.4)
- Verfügbarkeit von MOVE/COPY für Regeln für öffentliche Ordner: OXORULE §2.2.5.1 besagt, dass sie nicht verwendet werden dürfen, doch dies ist eine seltsame, willkürliche Einschränkung; Gromox erlaubt es ohnehin. (Dennoch sollte dies aufgrund von Schleifen mit Vorsicht verwendet werden. Gromox verfügt über eine Schleifenerkennung.)
