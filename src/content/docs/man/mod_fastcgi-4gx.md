---
title: "mod_fastcgi(4gx)"
description: "mod_fastcgi — [http(8gx)](/man/http-8gx/) handler for proxying requests to FastCGI servers"
sidebar:
  order: 50
---

## Name

mod_fastcgi — [http(8gx)](/man/http-8gx/) handler for proxying requests to FastCGI servers

## Description

mod_fastcgi can forward HTTP requests to one or more FastCGI servers when certain URIs are requested. Take special note of the file suffix column documented below; in particular, to override an entire directory, you may also need to edit the table for [mod_cache(4gx)](/man/mod_cache-4gx/).

## Configuration directives

This component shares <strong>http.cfg</strong>. See [http(8gx)](/man/http-8gx/).

## URI map

The filemap that specifies which URIs to handle is <strong>fastcgi.txt</strong>, which is searched for in <em>config_file_path</em>. The usual location is /etc/gromox/fastcgi.txt.

Each line in this file consists of 7 columns separated by whitespace:

- Domain or asterisk-based wildcard ("\*", "\*.example.com") to match the HTTP Host: request header with.

- URI path (prefix) to match

- Mapped path that will be passed to the FastCGI executor. Note that the FastCGI process may additionally have a document root setting that could map the path one more time.

- File suffix (without dot) to match on, e.g. <em>php</em>.

- A file to use as the default file for a directory (similar to Apache httpd's DirectoryIndex).

- A set of headers, separated by the pipe symbol <strong>\|</strong>, which should be forwarded to the CGI handler. In absence of any desired extra headers, a single pipe can be used to fill the column.

- An AF_LOCAL socket path to make the FastCGI request to.

If the file has no lines, no documents will be served this way. If the file is absent however, a set of default entries will be used.

### Default entries

    <em> /sync /usr/share/grommunio-sync php index.php | /run/php-fpm/php-grommunio-sync-fpm.sock</em>
    <em> /web /usr/share/grommunio-web php index.php | /run/php-fpm/php-grommunio-web-fpm.sock</em>
    <em> /dav /usr/share/grommunio-dav php index.php | /run/php-fpm/php-grommunio-dav-fpm.sock</em>

<strong>NOTE:</strong> The path designated for FPM sockets varies between distributions, and because some distributions <em>also</em> have security policies that involve path matching (e.g. via AppArmor), we are unable to choose a path that works out-of-the-box on all distro-provided platform configurations without fail. /run/php-fpm is used as the default in line with the Grommunio Appliance.

## Files

- <em>config_file_path</em>/fastcgi.txt: Map specifying with paths mod_fastcgi should react to, and which FastCGI backend to route requests to

## See also

<strong>gromox</strong>(7), <strong>http</strong>(8gx)
