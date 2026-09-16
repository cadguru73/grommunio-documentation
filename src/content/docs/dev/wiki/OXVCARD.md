---
title: "OXVCARD"
description: "MS-OXVCARD section 2.1.3.7.7 Type: UID: \"The UID type is neither imported to the Contact object nor exported when a vCard is created.\" This seems to be …"
sidebar:
  order: 70
---

MS-OXVCARD section 2.1.3.7.7 Type: UID: "The UID type is neither imported to the Contact object nor exported when a vCard is created." This seems to be an issue for Evolution; therefore, on import and export, Gromox will transfer the UID field data to and from property {PSETID_Gromox,MNID_STRING,"vcarduid",PT_UNICODE}, respectively.
