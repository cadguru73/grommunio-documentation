---
title: "mod_rewrite(4gx)"
description: "mod_rewrite — [http(8gx)](/man/http-8gx/) handler for altering HTTP request URIs before processing"
sidebar:
  order: 50
---

## Name

mod_rewrite — [http(8gx)](/man/http-8gx/) handler for altering HTTP request URIs before processing

## Description

mod_rewrite can alter request URIs. It runs before any of the other built-in or HTTP processing modules.

## Configuration directives

This component shares <strong>http.cfg</strong>. See [http(8gx)](/man/http-8gx/).

## Rewrite map

The filemap that specifies which URIs to handle is <strong>rewrite.txt</strong>, which is searched for in <em>config_file_path</em>. The usual location is /etc/gromox/rewrite.txt.

Each line in this file consists of 3 columns separated by whitespace:

- A POSIX Basic Regular Expression (cf. regcomp(3)) for matching the original URI. For safety, this should always be anchored with the beginning-of-line metacharacter (^; circumflex).

- The fixed sequence "=\>".

- Replacement string. Captures can be spliced using <strong>\1</strong>, <strong>\2</strong>, etc. The sequence <strong>\0</strong> splices the entire string (equivalent of Perl's <strong>\$&</strong>). If a particular pattern has successfully matched, no other rewrite rules are processed.

If the file has no lines, no paths will be rewritten. If the file is absent however, a set of default entries will be used.

## Default rules

    ^/Microsoft-Server-ActiveSync(/\|$) => /sync/index.php

## Examples

    ^/([a-z+])/([a-z]+).txt$ => /\2/\1.txt

## Files

- <em>config_file_path</em>/rewrite.txt: Map specifying how to rewrite URIs

## See also

<strong>gromox</strong>(7), <strong>http</strong>(8gx)
