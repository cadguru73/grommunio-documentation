---
title: "mod_cache(4gx)"
description: "mod_cache — HTTP handler for serving objects from a local filesystem"
sidebar:
  order: 50
---

## Name

mod_cache — HTTP handler for serving objects from a local filesystem

## Description

mod_cache serves local files when certain URIs are requested. Note that [mod_fastcgi(4gx)](/man/mod_fastcgi-4gx/) has a table of its own and higher precedence.

## Configuration directives

This component shares <strong>http.cfg</strong>. See [http(8gx)](/man/http-8gx/).

## URI map

The filemap that specifies which URIs to handle is <strong>cache.txt</strong>, which is searched for in <em>config_file_path</em>. The usual location is /etc/gromox/cache.txt.

Each line in this file consists of 3 columns separated by whitespace:

- Domain or wildcard to match the HTTP Host: header with.

- URI path (prefix) to match

- Target file/directory within the filesystem

If the file has no lines, no documents will be served this way. If the file is absent however, a set of default entries will be used.

### Default entries

    <em> /web /usr/share/grommunio-web</em>
    <em> /EWS/Messages.xsd /usr/share/gromox/Messages.xsd</em>
    <em> /EWS/Services.wsdl /usr/share/gromox/Services.wsdl</em>
    <em> /EWS/Types.xsd /usr/share/gromox/Types.xsd</em>

## Files

- <em>config_file_path</em>/cache.txt: URI map specifying which paths are served

## See also

<strong>gromox</strong>(7), <strong>http</strong>(8gx)
