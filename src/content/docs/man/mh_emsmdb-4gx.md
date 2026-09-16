---
title: "mh_emsmdb(4gx)"
description: "mh_emsmdb — Handler for MAPIHTTP-wrapped EMSMDB requests"
sidebar:
  order: 50
---

## Name

mh_emsmdb — Handler for MAPIHTTP-wrapped EMSMDB requests

## Description

mh_emsmdb is a component for [http(8gx)](/man/http-8gx/) which reacts to URIs starting in <strong>/mapi/emsmdb/</strong>. The ROP stream inside the HTTP request bodies is handed off to [exchange_emsmdb(4gx)](/man/exchange_emsmdb-4gx/) for subsequent processing.

## Configuration directives

This component has no config directives of its own.

## Normative references

- MS-OXCMAPIHTTP: Messaging Application Programming Interface (MAPI) Extensions for HTTP

## See also

<strong>gromox</strong>(7), <strong>http</strong>(8gx), <strong>exchange_emsmdb</strong>(4gx)
