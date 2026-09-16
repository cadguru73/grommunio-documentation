---
title: "Speicherverbrauch"
description: "$ ps auwwx | grep gromox"
sidebar:
  order: 100
---

``` text
$ ps auwwx | grep gromox
USER       PID %CPU %MEM     VSZ     RSS COMMAND
gromox    2273  0.0  0.1  226612   68804 /usr/libexec/gromox/delivery-queue
gromox    2274  0.0  0.0  753708   46168 /usr/libexec/gromox/pop3
gromox    2275  0.0  0.0 4294568   10652 /usr/libexec/gromox/timer
gromox    2329  0.0  0.3 2757436  239096 /usr/libexec/gromox/midb
gromox    2551  0.0  1.7 2476752 1123772 /usr/libexec/gromox/imap
gromox    2575  0.0  0.0 4425996   14016 /usr/libexec/gromox/event
gromox    2744  0.0  0.0  134888   12348 php-fpm: pool gromox
gromox    3017 53.5  2.3 6187236 1570196 /usr/libexec/gromox/http
gromox    3170  3.0  0.7 2169468  525840 /usr/libexec/gromox/zcore
gromox    3191  0.0  0.1  701932   97788 /usr/libexec/gromox/delivery
```

Die `malloc`-Funktion von glibc verfolgt eine besondere Reservierungsstrategie. Der erste Aufruf von `malloc()` innerhalb eines beliebigen Threads reserviert einen großen virtuellen Speicherblock ([128 MB](https://github.com/bminor/glibc/blob/master/malloc/arena.c#L414) auf x86_64), der als Standard-Heap für diesen Thread dient. Je höher die Anzahl der Threads, desto höher ist der VSS/VSZ-Wert.

Da der Heap im Normalbetrieb zudem nie wirklich an das Betriebssystem zurückgegeben wird, werden letztendlich alle einzelnen Heaps beansprucht, wenn jeder Thread (selbst im besten Fall einer seriellen Ausführung) mit ausreichend großen Datensätzen arbeitet. Auf Systemen, auf denen Memory Overcommit aktiviert ist, steigt der RSS-Wert, sobald Speicher zum ersten Mal genutzt wird; ist Overcommit deaktiviert, wird der RSS-Wert bereits bei der Zuweisung von Speicherblöcken berücksichtigt.

Diese Verschwendung wurde bereits zuvor von anderen Seiten festgestellt, z. B.

- <https://sourceware.org/bugzilla/show_bug.cgi?id=11261>
- <https://bugs.openjdk.org/browse/JDK-8193521>
- <https://github.com/JuliaLang/julia/issues/42566>

Die Umstellung von Gromox auf jemalloc oder tcmalloc hat bislang zu keiner nennenswerten Reduzierung geführt. Wenn Sie experimentieren möchten, können Sie dies tun, indem Sie einen oder mehrere Gromox-Dienste starten und dabei die Umgebungsvariablen `LD_PRELOAD=/usr/lib64/libjemalloc.so.2` oder `LD_PRELOAD=/usr/lib64/libtcmalloc.so.4` setzen, um diese alternativen Allokatoren zu nutzen. (Auf dem grommunio Appliance müssen Sie zuvor die Pakete `libjemalloc2` und/oder `libtcmalloc4` installieren.)

``` text
# systemctl edit gromox-http

-- add to edit field --

[Service]
Environment=LD_PRELOAD=/usr/lib64/libjemalloc.so.2
```
