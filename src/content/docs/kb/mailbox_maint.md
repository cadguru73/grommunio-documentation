---
title: "Mailbox maintenance"
description: "To automatically empty the trash folder (a.k.a. wastebasket) of all mailboxes, you can extend the cleaner service unit with the following override (syst…"
sidebar:
  order: 80
---

## Enabling the cleaner

`gromox-cleaner.timer` runs the cleaner daily, but it is not enabled after installation. Check and enable it once retention and backup requirements are settled (see the [post-installation checklist](/guides/post-install/#mailbox-maintenance-with-gromox-cleaner) and [gromox-cleaner.service(8)](/man/gromox-cleaner-service-8/)):

```bash
systemctl status gromox-cleaner.timer
systemctl enable --now gromox-cleaner.timer
```

## Periodic clearing of Trash folder

To automatically empty the trash folder (a.k.a. wastebasket) of all mailboxes, you can extend the cleaner service unit with the following override (`systemctl edit gromox-cleaner.service`):

``` 
# /etc/systemd/system/gromox-cleaner.service.d/override.conf
[Service]
Environment=softdelete_purgetime=30d trashbin_purgetime=7d
EnvironmentFile=
EnvironmentFile=-/etc/gromox/gromox.cfg
ExecStart=
ExecStart=/usr/sbin/gromox-mbop foreach.here.mb ( purge-softdelete -t ${softdelete_purgetime} -r / ) ( purge-datafiles ) ( emptyfld -R --delempty -t ${trashbin_purgetime} DELETED )
```
