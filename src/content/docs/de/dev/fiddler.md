---
title: "Fiddler"
description: "Fiddler richtet sich selbst als Systemproxy ein, d. h., wenn Fiddler so konfiguriert ist, dass es den Datenverkehr erfasst, wird die Einstellung des Systemproxys so geändert, dass sie auf 127.0.0.1:8888 verweist.…"
sidebar:
  order: 30
---

Fiddler richtet sich selbst als Systemproxy ein, d. h., wenn Fiddler so konfiguriert ist, dass es den Datenverkehr erfasst, wird die Einstellung des Systemproxys so geändert, dass sie auf 127.0.0.1:8888 verweist. Daher ist Fiddler nicht vollständig transparent.

Wenn die Aufzeichnung gerade erst aktiviert wurde, kann es einige HTTPS-Verbindungsversuche dauern, bis alles tatsächlich funktioniert. Sollte das Öffnen eines MAPI-Profils also fehlschlagen, versuchen Sie es bitte noch ein paar Mal.

Bitte beachten Sie, dass Warnmeldungen zu TLS-Zertifikaten (die unter diesen Umständen normal sind) möglicherweise *unter* anderen Fenstern erscheinen und unbemerkt bleiben.

Der MAPI Inspector für Fiddler unterstützt sowohl EMSMDB als auch NSP.

Fiddler kann RPCH-Anfragen überhaupt nicht verarbeiten, und eine Verbindung zu EXC in diesem Modus schlägt fehl. Nur MAPIHTTP funktioniert. Die EAC-Shell-Befehle *Get-OrganizationConfig* und *Set-OrganizationConfig -MapiHttpEnabled \$true* können zum Lesen bzw. Schreiben der Einstellung verwendet werden. Eine Änderung scheint einen Neustart zu erfordern, um wirksam zu werden.
