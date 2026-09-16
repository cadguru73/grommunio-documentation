---
title: "OXVCARD"
description: "MS-OXVCARD Abschnitt 2.1.3.7.7 Typ: UID: „Der UID-Typ wird bei der Erstellung einer vCard weder in das Kontakt-Objekt importiert noch exportiert.“ Dies scheint …"
sidebar:
  order: 70
---

MS-OXVCARD Abschnitt 2.1.3.7.7 Typ: UID: „Der UID-Typ wird weder in das Kontakt-Objekt importiert noch bei der Erstellung einer vCard exportiert.“ Dies scheint ein Problem für Evolution zu sein; daher überträgt Gromox beim Import und Export die Daten des UID-Feldes jeweils in die bzw. aus der Eigenschaft {PSETID_Gromox,MNID_STRING,"vcarduid",PT_UNICODE}.
