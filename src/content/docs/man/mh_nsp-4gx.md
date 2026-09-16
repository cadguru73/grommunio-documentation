---
title: "mh_nsp(4gx)"
description: "mh_nsp — Handler for MAPIHTTP-wrapped NSPI requests"
sidebar:
  order: 50
---

## Name

mh_nsp — Handler for MAPIHTTP-wrapped NSPI requests

## Description

mh_nsp is a component for [http(8gx)](/man/http-8gx/) which reacts to URIs starting with <strong>/mapi/nspi/</strong>. The ROP stream inside the HTTP request bodies is handed off to [exchange_nsp(4gx)](/man/exchange_nsp-4gx/) for subsequent processing.

## Configuration directives

This component has no config directives of its own.

## Normative references

- MS-OXCMAPIHTTP: Messaging Application Programming Interface (MAPI) Extensions for HTTP

## See also

<strong>gromox</strong>(7), <strong>http</strong>(8gx), <strong>exchange_nsp</strong>(4gx)
