---
title: "Spamschutz"
description: "Wenn Sie das ursprüngliche Passwort vergessen haben oder einfach nur ein neues Passwort festlegen möchten, können Sie dies mit den folgenden Befehlen tun:"
sidebar:
  order: 10
---

## Passwort zurücksetzen

Wenn Sie das ursprüngliche Passwort vergessen haben oder einfach nur ein neues Passwort festlegen möchten, können Sie dies mit den folgenden Befehlen tun:

``` 
PASSWORD="YourNewPassword"
NEWPASS=$(printf 'password = "%s";\n' $(rspamadm pw -p "${PASSWORD}"))
sed -i -n -e '/^password/!p;$a \'"$NEWPASS" /etc/grommunio-antispam/local.d/worker-controller.inc
```
