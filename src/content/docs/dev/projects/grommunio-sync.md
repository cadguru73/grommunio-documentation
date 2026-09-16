---
title: "grommunio Sync (EAS)"
description: "Support is available through grommunio GmbH and its partners. See for details. A community forum is at ."
sidebar:
  order: 30
---

> Sourced from the [grommunio-sync](https://github.com/grommunio/grommunio-sync) README.

## grommunio Sync

<strong>grommunio Sync is an open-source application to synchronize Exchange ActiveSync (EAS) compatible devices such as mobile phones and tablets.</strong>

<em>While Microsoft Outlook supports EAS, it is not recommended to use grommunio Sync due to a very small subset of features only supported. For Microsoft Outlook, users should rather use the native MAPI/HTTP and MAPI/RPC protocols, available through \`grommunio Gromox \<https://github.com/grommunio/gromox\>\`.</em>

   

## At a glance

- Provides native groupware (emails, contacts, calendar, tasks and notes) connectivity for mobile devices, such as phones and tablets.
- Delivers Exchange ActiveSync (EAS) 2.5, 12.0, 12.1, 14.0, 14.1, 16.0 and 16.1 protocol compatibility.
- Multi-platform support for most recent Android, Apple (iOS powered iPhones and iPads) and even outdated Windows Mobile, Nokia and Blackberry devices.
- Supports device management policies such as remote-wipe, password-strength, lockout after invalid authentication after definable amount of times.
- Compatible, works with various web servers such as nginx and apache and others; usage of nginx is recommended.
- Highly efficient, averaging at 2MB per sync thread per device of memory usage (using nginx with php-fpm).
- Distributable, compatible with load balancers such as haproxy, apisix, KEMP and others.
- Scalable, enabling multi-server and multi-location deployments.
- Failover-safe, storing device and sync states in user stores.
- High-performance, allowing nearly wire speeds for store synchronization.
- Secure, with certifications through independent security research and validation.

## Built with

- PHP 7.4+, 8.x
- PHP modules: soap, mbstring, posix, pcntl, pdo, xml, redis
- PHP backend module: mapi

## Getting started

### Prerequisites

- A working <strong>web server</strong> (nginx is recommended), with a working <strong>TLS</strong> configuration.
- <strong>PHP</strong>, preferably available as fpm pool.
- <strong>Redis</strong> for high-performance interprocess communication states.
- <strong>Zcore</strong> MAPI transport (provided by [Gromox](https://github.com/grommunio/gromox)).
- Working <strong>AutoDiscover</strong> setup (recommended, provided by [Gromox](https://github.com/grommunio/gromox)).

### Installation

- Deploy grommunio-sync at a location of your choice, such as `/usr/share/grommunio-sync`.
- Adapt `version.php` with the adequate version string, see [/build/version.php.in](https://github.com/grommunio/grommunio-sync/blob/master/build/version.php.in).
- Provide a default configuration file as config.php, see [/config.php](https://github.com/grommunio/grommunio-sync/blob/master/config.php).
- Adapt web server configuration according to your needs, [/build](https://github.com/grommunio/grommunio-sync/blob/master/build) provides some examples.
- Prepare PHP configuration according to your needs, [/build](https://github.com/grommunio/grommunio-sync/blob/master/build) provides some examples.
- Installation and configuration of redis service.
- (Optional) setup AutoDiscover accordingly for account discovery and configuration.

### Usage

- Point your EAS client of choice with the <strong>"Microsoft Exchange"</strong> mail account type made available.
- With AutoDiscover, only your account credentials (username and password) are required for device setup.
- Use `grommunio-sync-top.php` or grommunio Admin UI to view connections.

## Support

Support is available through grommunio GmbH and its partners. See <https://grommunio.com/> for details. A community forum is at <https://community.grommunio.com/>.

For direct contact and supplying information about a security-related responsible disclosure, contact [dev@grommunio.com](mailto:dev@grommunio.com).

## Contributing

- <https://docs.github.com/en/get-started/quickstart/contributing-to-projects>
- Alternatively, upload commits to a git store of your choosing, or export the series as a patchset using [git format-patch](https://git-scm.com/docs/git-format-patch), then convey the git link/patches through our direct contact address (above).

### Coding style

This repository follows a custom coding style, which can be validated anytime using the repository's provided [configuration file](https://github.com/grommunio/grommunio-sync/blob/master/.phpcs).
