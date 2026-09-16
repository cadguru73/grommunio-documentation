---
title: "grommunio DAV"
description: "carddavs.tcp 86400 IN SRV 10 20 443 my.example.com."
sidebar:
  order: 40
---

> Sourced from the [grommunio-dav](https://github.com/grommunio/grommunio-dav) README.

## grommunio DAV

<strong>grommunio DAV is an open-source application to provide CalDAV and CardDAV to compatible applications and devices such as macOS Calendar, macOS Contacts, Thunderbird/Lightning and others.</strong>

   

## At a glance

- Provides standardized CalDAV and CardDAV interfaces to groupware data (contacts, calendar and tasks).
- Multi-platform supports various CalDAV and CardDAV clients, such as macOS Calendar, macOS Contacts, Thunderbird/Lightning, Evolution and many other CalDAV/CardDAV clients as well as other applications used, such as [Dash](https://get-dash.com).
- Compatible, works with various web servers such as nginx, apache and others; usage of nginx is recommended.
- Highly efficient, averaging at 4MB per connection, per device of memory usage (using nginx with php-fpm).
- Distributable, compatible with load balancers such as haproxy, apisix, KEMP and others.
- Scalable, enabling multi-server and multi-location deployments.
- High-performance, allowing nearly wire speeds for store synchronization.
- Secure, with certifications through independent security research and validation.

## Built with

- PHP 8.x
- PHP modules: ctype, curl, dom, iconv, mbstring, sqlite, xml, xmlreader, xmlwriter
- PHP backend module: mapi

## Getting started

### Prerequisites

- A working <strong>web server</strong> (nginx is recommended), with a working TLS configuration
- <strong>PHP</strong>, preferably available as fpm pool
- <strong>Zcore</strong> MAPI transport (provided by [Gromox](https://github.com/grommunio/gromox))

### Installation

- Deploy grommunio-dav at a location of your choice, such as `/usr/share/grommunio-dav-dev`.

- Adapt `version.php` with the adequate version string, see [/build/version.php.in](https://github.com/grommunio/grommunio-dav/blob/master/build/version.php.in).

- Provide a default configuration file as config.php, see [/config.php](https://github.com/grommunio/grommunio-dav/blob/master/config.php).

- Adapt web server configuration according to your needs, [/build](https://github.com/grommunio/grommunio-dav/blob/master/build) provides some examples.

- Prepare PHP configuration according to your needs, [/build](https://github.com/grommunio/grommunio-dav/blob/master/build) provides some examples.

- (Optional) Setup of DNS SRV records for simplified account configuration is recommended:

  ``` text
  _carddavs._tcp 86400 IN SRV 10 20 443 my.example.com.
  _caldavs._tcp  86400 IN SRV 10 20 443 my.example.com.
  _caldavs._tcp  86400 IN TXT path=/dav
  _carddavs._tcp 86400 IN TXT path=/dav
  ```

### Logging

grommunio DAV uses [monolog](https://seldaek.github.io/monolog/) for logging. Adjust [/glogger.ini](https://github.com/grommunio/grommunio-dav/blob/master/glogger.ini) to match your needs.

### Usage

- You can use your webbrowser to point to `https://my.example.com/dav/`, or alternatively directly to your calendar URL `https://my.example.com/dav/calendars/<user>/Calendar/`
- Enter your account credentials (username and password)

## Support

Support is available through grommunio GmbH and its partners. See <https://grommunio.com/> for details. A community forum is at <https://community.grommunio.com/>.

For direct contact and supplying information about a security-related responsible disclosure, contact [dev@grommunio.com](mailto:dev@grommunio.com).

## Contributing

- <https://docs.github.com/en/get-started/quickstart/contributing-to-projects>
- Alternatively, upload commits to a git store of your choosing, or export the series as a patchset using [git format-patch](https://git-scm.com/docs/git-format-patch), then convey the git link/patches through our direct contact address (above).

### Coding style

This repository follows a custom coding style, which can be validated anytime using the repository's provided [configuration file](https://github.com/grommunio/grommunio-dav/blob/master/.phpcs).
