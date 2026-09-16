---
title: "Downgrading"
description: "Running older Gromox version requires extra hoops, documented herein."
sidebar:
  order: 140
---

Running older Gromox version requires extra hoops, documented herein.

Windows must not run in CP_UTF8 mode if going earlier than gromox-2.18.

`/usr/share/gromox/data/http/php/ews` needs to contain the old AutoDiscover implementation.

``` sh
mkdir data/http
ln -s ~/gromox/exch/http/ews data/http/ews
ln -s ~/gromox/data /usr/share/gromox
```

`/etc/gromox/autodiscover.ini` needs to be re-populated:

``` text
[database]
host=localhost
username=root
password=
dbname=grommunio
[exchange]
hostname=a4.inai.de
mapihttp=0
[system]
[http-proxy]
/var/lib/gromox/user/ = a4.inai.de
/var/lib/gromox/domain/ = a4.inai.de
```

`/etc/gromox/http.cfg` needs additional lines:

``` text
listen_ssl_port=443
http_support_ssl=on
```
