---
title: "Kopano"
description: "Die Migration von Kopano ist ein mehrstufiger Prozess, der auch von der Konfiguration des von Kopano verwendeten Backends abhängt."
sidebar:
  order: 40
---

Die Migration von Kopano ist ein mehrstufiger Prozess, der auch von der Konfiguration des von Kopano verwendeten Backends abhängt.

Wenn Kopano LDAP verwendet, sieht die Migration im Überblick wie folgt aus:

- grommunio entsprechend an LDAP anpassen (Einstellungen für Benutzerfilter usw.)
- Speicherorte in grommunio anlegen
- Benutzerdaten migrieren (worauf sich dieser Artikel hauptsächlich bezieht)
- E-Mail-Weiterleitung umstellen

Diese Migration konzentriert sich hauptsächlich auf die Migration des Datensatzes und beinhaltet keine aktive LDAP-Konfiguration.

:::caution
Diese Anleitung erhebt keinen Anspruch auf Vollständigkeit und dient lediglich der Orientierung. Möglicherweise gibt es Aspekte Ihrer Kopano-Installation, die in diesem Handbuch nicht behandelt werden. Wenden Sie sich bitte an Ihren Partner oder kontaktieren Sie uns – insbesondere unseren Professional Services-Bereich –, falls Sie weitere Fragen haben oder Informationen vermissen, die für Ihre Migration relevant sind.
:::

## Vorbereitung

Bei der Migration von Kopano ist eine gute Vorbereitung entscheidend. Dazu müssen wir sicherstellen, dass die für die Migration relevanten Metadaten bereitstehen, idealerweise in Form einer Liste, anhand derer wir unsere Benutzer in der grommunio-Installation anlegen können:

``` bash
kopano-admin -l | sed -e '1,4d' -e '/^$/d' | awk '{ print $1 }' | sort | while read user; do kopano-admin --details $user; done | egrep '^(Username|Fullname|Emailaddress|Store GUID| Warning| Soft| Hard)' | sed -e 's#^ ##g' -e 's#^Username:\t*##g' -e 's#.*:[\t ]*#;#g' | sed ':a;N;$!ba;s/\n;/;/g' >> kopano-users.txt
```

Dieser (lange) Befehl, der auf dem System Kopano ausgeführt wird, erstellt eine Liste der Benutzer mit den wichtigen Metadaten, die wir benötigen, und zwar in einem Format, das für die weitere Skripterstellung verwendet werden kann.

Mit dieser Liste können wir nun die verwendeten Domänen in grommunio anlegen:

``` bash
MAX_USERS_DOMAIN=250

cat kopano-users.txt | awk -F\; '{ print $3 }' | awk -F@ '{ print $2 }' | sort | uniq | sed '/^$/d' | while read DOMAIN; do
    grommunio-admin domain create -u ${MAX_USERS_DOMAIN} $DOMAIN
done
```

Auf dem grommunio-System können Kopano-Datenbanken über die Befehlszeile mit den Befehlen [gromox-kdb2mt](/man/gromox-kdb2mt-8/) und [gromox-mt2exm](/man/gromox-mt2exm-8/) importiert werden. Es handelt sich hierbei um zwei Befehle, die über eine Pipe miteinander verkettet werden sollen; Informationen zur Aufrufsyntax finden Sie in den verlinkten Handbuchseiten.
