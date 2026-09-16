---
title: "LDA-Verarbeitung"
description: "Welche Bedeutungen wollen wir damit verbinden? … Welche Anwendungsfälle müssen wir überhaupt abdecken?"
sidebar:
  order: 20
---

<em>gromox-delivery</em> verfügt über ein <em>alias_resolve</em>-Plugin. (Dieses ist <em>immer</em> aktiv.) Siehe die <em>alias_resolve(4gx)</em>-Manpage. Bei Envelope-FROM- und Envelope-RCPT-Zeilen, die mit einem in SQL definierten Alias übereinstimmen, wird der Umschlag umgeschrieben, was zur Zustellung an ein anderes Postfach führt. Stand 17.11.2022 unterstützt <em>alias_resolve</em> nur vollständige Adressen (<span class="title-ref">a@b.de</span>) und exakte Zeichenfolgenübereinstimmungen.

### Vorschläge zur Syntax

> aliasname = "@hurrdurr.de"; mainname = "info@hurrdurr.de";
>
> aliasname = "@hurrdurr.de"; mainname = "info@domain.de";
>
> aliasname = "\*@hurrdurr.de"; mainname = "\*@domain.de";
>
> aliasname = "%@hurrdurr.de"; mainname = "%@domain.de";

Welche Bedeutungen wollen wir damit verbinden? … Welche Anwendungsfälle müssen wir überhaupt abdecken?

### Ausweichadressen

„Fallback-Adressen“ bedeutet, dass E-Mails für Empfängeradressen angenommen werden, die <em>tatsächlich nicht</em> existieren.

Vorgeschlagene Syntax:

    @hurrdurr.de -> info@hurrdurr.de

Zusammenfassung des bestehenden Codes:

    std::string repl = xa_alias_lookup(rcpt_to);
    if (repl.size() > 0)
 new_envelope.write(repl);
    else
 new_envelope.write(rcpt_to);

Zusammenfassung des neuen Codes:

    auto dompart = strchr(rcpt_to, '@');
    std::string repl = xa_alias_lookup(rcpt_to);
    if (repl.size() > 0) {
 new_envelope.write(repl);
 continue;
    }
    repl = xa_alias_lookup(dompart);
    if (repl.size() > 0) {
 new_envelope.write(repl);
 continue;
    }
    new_envelope.write(rcpt_to);

Hinweise für Implementierer:

> - Die Fallback-Adressauflösung soll nur für „Envelope-RCPT“ erfolgen, nicht für „Envelope-FROM“

Fragen:

> - Schließt das Vorhandensein einer „@domain.de“-Regel die Verwendung von Domain-Aliasen aus?

### Domain-Aliase

„Domain-Aliase“ bezeichnet die Zuordnung von Domains, unabhängig davon, ob E-Mails für nicht existierende Empfängeradressen angenommen werden oder nicht.

Vorgeschlagene Syntax:

    <em>@hurrdurr.de -> </em>@domain.de

Wir überlegen derzeit, was erforderlich ist, um Domain-Aliase zu unterstützen.

## Status ISO

Mit der aktuellen Version grommunio ISO (2022-11) wurde festgelegt, dass Postfix für die Alias-Auflösung zuständig ist. Dies hat Auswirkungen auf die Syntax und die Verarbeitung (es handelt sich immer um „Fallback Addr“ und niemals um „DomAlias“, nicht wahr?)

    virtual_alias_maps="mysql:/etc/postfix/grommunio-virtual-mailbox-alias-maps.cf

## Es folgt der alte Text

## Definition

„Domain-Aliase“ bezeichnet eine Art „Ersetzungsregel“ (die jedoch unabhängig von den vom Benutzer konfigurierbaren „Posteingangsregeln“ ist), die SMTP-Umschlagadressen bereits in einer frühen Phase des E-Mail-Empfangs umschreibt. Dabei wird der Domain-Teil der E-Mail-Adresse durch einen neuen Wert ersetzt, während der lokale Teil der Adresse unverändert bleibt. Im Endeffekt werden alle Benutzer innerhalb dieser Domain als Aliase behandelt, und diese Umschreibung erfolgt möglicherweise sogar noch vor etwaigen Prüfungen hinsichtlich der Existenz (und damit der Zustellbarkeit) eines bestimmten Benutzers.

> <aa@company.com> -\> <aa@companyholdingsinc.com>, <bb@comapny.com> -\> <bb@companyholdingsinc.com> usw.

## Bestehende Lösungen

In größeren Umgebungen ist häufig ein LDAP-Server vorhanden, der als maßgebliche Datenbank für verfügbare Benutzer fungiert. Sowohl bei Active Directory als auch beim OpenLDAP-Schema RFC2307bis ist es gängige Praxis, dass die Alias-Funktionalität nicht dadurch dargestellt wird, dass irgendwo ein Attribut für einen Domänenalias hinzugefügt wird, sondern indem jedem Benutzerobjekt, das Teil dieser E-Mail-Domäne ist, ein Alias hinzugefügt wird. Das bedeutet konkret: Wenn man 60.000 Benutzerobjekte hat und einen Domänenalias hinzufügen möchte, wird der LDAP-Baum insgesamt um 60.000 Attribute anwachsen.

## Einrichtung

Auch wenn grammm/Gromox nicht von einem LDAP-Server abhängig ist, hat uns das von diesen LDAP-Umgebungen vorgegebene Datenmodell dazu veranlasst, die Groupware-Software so zu konzipieren, dass sie auf ähnliche Weise funktioniert, d. h., es gibt kein Konzept von Domänenaliasen, sondern lediglich Benutzeraliase.

Um einen Domain-Alias in grammm/Gromox erfolgreich einzurichten, sind folgende Schritte erforderlich:

1.  Die Alias-Domäne muss im Verwaltungs-Webinterface als Domäne zu „gramm“ hinzugefügt werden. Die Domänenliste ist die umfassende Datenbank der Zieldomänen, die der MTA (in der Regel Postfix) akzeptieren soll.
2.  Definieren Sie Aliase für die bereits vorhandenen Benutzerobjekte. Es spielt keine Rolle, ob ein Benutzerobjekt unter der einen oder der anderen Domäne angesiedelt ist, Sie müssen jedoch keinen Benutzer doppelt anlegen. Wenn Sie Benutzer aus einer LDAP-Struktur synchronisieren, richten Sie die Aliase natürlich in der LDAP-Struktur ein und nicht manuell über die Weboberfläche.
