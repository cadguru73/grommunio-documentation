---
title: "autoconfig(7)"
description: "autoconfig — Thunderbird AutoConfig protocol"
sidebar:
  order: 50
---

## Name

autoconfig — Thunderbird AutoConfig protocol

## Description

AutoConfig is a HTTP-based discovery protocol, originally introduced for Mozilla Thunderbird (TB) 3.0 in 2009. It is quite similar to [autodiscover(7)](/man/autodiscover-7/). This manual page is not normative.

TB tries a bunch of URLs, with HTTP GET:

- `https://autoconfig.example.com/mail/config-v1.1.xml?emailaddress=user@example.com`
- `http://autoconfig.example.com/mail/config-v1.1.xml?emailaddress=user@example.com`
- `https://example.com/.well-known/autoconfig/mail/config-v1.1.xml?emailaddress=user@example.com`
- `http://example.com/.well-known/autoconfig/mail/config-v1.1.xml?emailaddress=user@example.com`
- DNS SRV lookups are not performed.

Note that TLS wildcard certificates do not extend to more than one level; for example, if the e-mail address is `foo@m1.example.com`, and the m1 host presents a server certificates for `CN=example.com, subjAltName=*.example.com`, clients that are trying to download `autoconfig.m1.example.com/mail/config-v1.1.xml` may fail TLS verification. The Thunderbird setup wizard (circa version 140) does not show TLS failures, and silently treats it as an unavailable resource.

TB <em>also</em> performs AutoDiscover.

## config-v1.1.xml

The Thunderbird wiki at <https://wiki.mozilla.org/Thunderbird:Autoconfiguration> is quite lacking as of 2026-07-01. It has neither formal ABNF syntax, nor does it mention possible values for certain XML attributes. One has to resort to looking at source code, <https://github.com/mozilla/releases-comm-central/blob/master/mail/components/accountcreation/modules/readFromXML.sys.mjs#L78>.

In Thunderbird 140, incomingServers may be of type "imap", "pop3", "nntp", "exchange". The comm-central master has some more values.

## See also

<strong>gromox</strong>(7), <strong>autodiscover</strong>(7)
