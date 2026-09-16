---
title: "LDA Processing"
description: "What meanings do we want to associate?... What use cases do we need to cover, anyway?"
sidebar:
  order: 20
---

<em>gromox-delivery</em> has an <em>alias_resolve</em> plugin. (This is <em>always</em> active.) Confer with the <em>alias_resolve(4gx)</em> manpage. Envelope-FROM and Envelope-RCPT lines that match an alias as defined in SQL will have their envelope rewritten, causing delivery to a different mailbox. As of 2022-11-17, <em>alias_resolve</em> supports only complete addresses (<span class="title-ref">a@b.de</span>) and exact string matches.

### Syntax proposals

> aliasname = "@hurrdurr.de"; mainname = "info@hurrdurr.de";
>
> aliasname = "@hurrdurr.de"; mainname = "info@domain.de";
>
> aliasname = "\*@hurrdurr.de"; mainname = "\*@domain.de";
>
> aliasname = "%@hurrdurr.de"; mainname = "%@domain.de";

What meanings do we want to associate?... What use cases do we need to cover, anyway?

### Fallback addresses

"Fallback addresses" means mail is accepted for recipient addresses that <em>don't</em> actually exist.

Proposed syntax:

    @hurrdurr.de -> info@hurrdurr.de

Summary of existing code:

    std::string repl = xa_alias_lookup(rcpt_to);
    if (repl.size() > 0)
        new_envelope.write(repl);
    else
        new_envelope.write(rcpt_to);

Summary of new code:

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

Notes to implementors:

> - fallback addr resolution only to be done for Envelope-RCPT, not Envelope-FROM

Questions:

> - Does the presence of a '@domain.de' rule preclude the use of domain aliases?

### Domain aliases

"Domain aliases" means domain mapping; with or without accepting mail for recipient addresses that do not exist.

Proposed syntax:

    <em>@hurrdurr.de -> </em>@domain.de

We are contemplating what is necessary to support domain aliases

## ISO status

Current grommunio ISO (2022-11) has made it such that Postfix is in charge of alias resolution. This will impact the syntax and processing (it's always Fallback Addr and never DomAlias, eh?)

    virtual_alias_maps="mysql:/etc/postfix/grommunio-virtual-mailbox-alias-maps.cf

## old text follows

## Definition

"Domain aliases" refers to a kind of substitution "rule" (but which is extern to any user-configurable "Inbox rules") that rewrites SMTP Envelope Addresses at an early stage in the mail reception. In this process, the domain part of the e-mail address is replaced by a new value, leaving the local part of the address unmodified. Effectively, all users within that domain are aliased, and this rewrite is perhaps even performed ahead of any checks regarding the existence (and hence deliverability) of any given user.

> <aa@company.com> -\> <aa@companyholdingsinc.com>, <bb@comapny.com> -\> <bb@companyholdingsinc.com>, etc.

## Existing solutions

In larger environments, there may often be an LDAP server which acts as an authoritative database of available users. It is accepted standard practice with both ActiveDirectory and the OpenLDAP RFC2307bis schema that alias functionality is represented not by adding one attribute for a domain alias somewhere, but by adding an alias to every user object that is part of that e-mail domain. Indeed this means that, if one has 60000 user objects and wishes to add one domain alias, the LDAP tree will, as a whole, grow by 60000 attributes.

## Setup

Even though grammm/Gromox is not dependent upon an LDAP server, the data model imposed by these LDAP environments made us design the groupware software to operate in like fashion, i.e. there is no concept of domain aliases, just user aliases.

To effectively set up a domain alias in grammm/Gromox, these steps are needed:

1.  The alias domain needs to be added to gramm as a domain in the Administration Web Interface. The domain list is the ultimate database of target domains that the MTA (usually Postfix) will be made to accept.
2.  Define aliases on the existing user objects you already have. It does not matter whether a user object is under one domain or another, but you need not duplicate any user. Of course, if you synchronize users from an LDAP tree, naturally you set up the aliases in the LDAP tree rather than manually through the web interface.
