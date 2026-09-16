---
title: "MAPI und Aliase verstehen"
description: "Standardmäßig ist es bei grommunio-Modellen wie dem Microsoft Exchange (On-Premises und Exchange Online) nicht möglich, dass Benutzer Nachrichten von einem ihrer sekundären (al…"
sidebar:
  order: 30
---

Standardmäßig erlaubt grommunio, wie beispielsweise Microsoft Exchange (lokal und Exchange Online), den Benutzern nicht, Nachrichten von einer ihrer sekundären (Alias-)E-Mail-Adressen zu versenden. Stattdessen verlangt Exchange in der Regel, dass E-Mails entweder von der primären SMTP-Adresse eines Postfachs oder von einem anderen Postfach bzw. einer anderen Adresse gesendet werden, für die der Benutzer ausdrücklich über die Berechtigungen „Als … senden“ oder „Im Namen von … senden“ verfügt. Hier sind die wichtigsten Gründe, warum das „Senden als Alias“ problematisch sein kann, und wie Microsoft diese Einschränkung gelöst hat:

## Verhalten in grommunio (und Exchange)

\- Primäre SMTP-Adresse: In herkömmlichen Exchange-Umgebungen (und standardmäßig in Exchange Online) verfügt jedes Benutzerpostfach über eine „primäre“ SMTP-Adresse. Diese Adresse wird beim Versenden einer E-Mail verwendet.

\- Alias-Adressen: Postfächer können mehrere „Proxy“- oder „Alias“-Adressen haben, doch diese Aliase dienen in erster Linie dem Empfang von E-Mails. Standardmäßig erlaubt Exchange das Versenden von E-Mails über einen Alias nicht.

Aus Sicht von Microsoft dienen Alias-Adressen dazu, sicherzustellen, dass ein Postfach E-Mails empfangen kann, die an mehrere Adressen oder Domänen gesendet werden. Dabei spielen auch Sicherheits- und Verwaltungsaspekte eine Rolle: Exchange möchte eindeutig festlegen, unter welcher Identität ein Benutzer eine E-Mail versendet. Zudem gibt es viele weitere technische Gründe; einer davon ist, dass bei Besprechungsanfragen (MRs) die Teilnehmer ebenfalls über SMTP-Adressen identifizierbar sind. Die Verwendung unterschiedlicher Aliase bei Besprechungsanfragen würde daher zu Fehlern beim Abgleich dieser Objekte über die momentane Sicht hinaus führen (beispielsweise durch den Wechsel von Aliasen zu unterschiedlichen Zeitpunkten).

## Alternative Lösungen

Wenn Sie eine lokale Bereitstellung von Exchange (2016, 2019 usw.) verwenden, wird die Standardfunktion „Von Alias senden“ derzeit ebenfalls nicht unterstützt, genau wie bei grommunio.

Mögliche Abhilfemaßnahmen sind unter anderem:

- Gemeinsames Postfach/Ressourcenpostfach: Erstellen Sie ein separates oder gemeinsames Postfach, dessen primäre Adresse der gewünschte Alias ist, und erteilen Sie Ihrem Benutzer anschließend die Berechtigung „Als … senden“. Anschließend können Sie dieses Postfach als Absenderadresse auswählen.
- Tools von Drittanbietern oder Transportregeln: Einige Unternehmen verwenden benutzerdefinierte Transportregeln oder Dienstprogramme von Drittanbietern, die den „Von“-Header so umschreiben, dass er als Alias erscheint. Dies ist komplexer, kann schwierig zu warten sein und möglicherweise zu Nebenwirkungen im E-Mail-Fluss führen.

Bei grommunio verwenden wir üblicherweise Postfix als unser Haupt-MTA (das in jedem appliance integriert ist) und als empfohlenes MTA. Auf dieser Grundlage lassen sich Transportregeln erstellen, wie Sie am folgenden Beispiel mit einem festen Empfänger sehen können.

## Alias-Transportregel in Postfix

:::caution
Bitte achten Sie darauf, Ihre Transportzuordnungen sorgfältig zu überprüfen, da diese Ihre MTA-Konfiguration direkt beeinflussen. Überprüfen Sie sorgfältig, ob sowohl das Mail-Routing mit als auch ohne Umschreibung wie erwartet funktioniert.
:::

In `/etc/postfix/main.cf` können Sie die Header-Prüfung wie folgt aktivieren:

``` text
header_checks = pcre:/etc/postfix/header_checks
```

und verwenden Sie die entsprechende header_checks-Datei mit (Beispiel):

``` text
/^(From:.*myuser@mydomain\.at)(\r?\n(.*\r?\n)*?^To:.*special@destination\.com)/m
    REPLACE From: alias@mydomain.at
```

Vergessen Sie anschließend nicht, die entsprechende Postfix-Zuordnung anzulegen:

``` text
postmap /etc/postfix/header_checks
```

So funktioniert es: Wenn Postfix die Kopfzeilen einer ausgehenden E-Mail verarbeitet, prüft es, ob die „From“-Zeile mit <myuser@mydomain.at> übereinstimmt. Anschließend sucht es in den folgenden Zeilen nach einer „To“-Zeile, die mit <special@destination.com> übereinstimmt. Sind beide Bedingungen in diesem einzelnen Nachrichten-Header erfüllt, wird der „Von“-Header in <alias@mydomain.at> umgeschrieben. Wird die Nachricht an einen anderen Empfänger gesendet, findet keine Umschreibung statt.

Das ist natürlich nur ein Beispiel; es gibt viele Möglichkeiten, dies zu erweitern, indem man beispielsweise den Absender oder den/die Empfänger auf allgemeinere Weise ersetzt.

## Zusammenfassung

Standardmäßig verhält sich der grommunio in diesem Fall genauso wie der Microsoft Exchange. Der Hauptgrund dafür ist die MAPI-Kerntechnologie, die beiden Modellen zugrunde liegt.

In der Vergangenheit dienten Aliase ausschließlich dem Empfang von E-Mails, und Microsoft hat das Versandverhalten aus Gründen der Übersichtlichkeit, Sicherheit und Nachvollziehbarkeit eingeschränkt. Die neuere Online-Funktion „Send from Alias“ (Von Alias senden) in Microsoft 365 und Exchange kann jedoch von einem Administrator aktiviert werden, um diese Einschränkung in der Cloud zu umgehen. Dies geschieht durch das Umschreiben von Adressen in der E-Mail-Transportwarteschlange in M366. Bei lokal installierten Exchange-Systemen müssen Administratoren in der Regel auf Workarounds zurückgreifen (wie gemeinsam genutzte Postfächer oder Verteilergruppen mit „Als … senden“-Berechtigungen). Mit grommunio können Sie unser bereitgestelltes Postfix nutzen, um allgemeine Alias-Transporte zu definieren, oder die gleichen Methoden anwenden, wie sie bei Microsoft Exchange (und vielen anderen Lösungen) üblich sind.
