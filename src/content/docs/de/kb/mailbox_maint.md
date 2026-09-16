---
title: "Wartung des Postfachs"
description: "Um den Papierkorb aller Postfächer automatisch zu leeren, können Sie die Cleaner-Serviceeinheit um die folgende Übersteuerung erweitern (syst…"
sidebar:
  order: 80
---

## Regelmäßige Leere des Papierkorbs

Um den Papierkorb aller Postfächer automatisch zu leeren, können Sie die Cleaner-Serviceeinheit um die folgende Übersteuerung (`systemctl edit gromox-cleaner.service`) erweitern:

``` 
# /etc/systemd/system/gromox-cleaner.service.d/override.conf
[Service]
Environment=softdelete_purgetime=30d trashbin_purgetime=7d
EnvironmentFile=
EnvironmentFile=-/etc/gromox/gromox.cfg
ExecStart=
ExecStart=/usr/sbin/gromox-mbop foreach.here.mb ( purge-softdelete -t ${softdelete_purgetime} -r / ) ( purge-datafiles ) ( emptyfld -R --delempty -t ${trashbin_purgetime} DELETED )
```
