---
title: "Reloading"
sidebar:
  order: 90
---

## Reload

### Impetus 

- When authentication parameters have changed, preferably reload <em>gromox-http</em>, <em>gromox-zcore</em>, <em>gromox-imap</em>, <em>gromox-pop3</em>
- When the user list or aliases have changed, preferably reload the Global Address Book (GAB) component present in <em>gromox-http</em> and <em>gromox-zcore</em>
- When the domain list has changed, reload <em>gromox-adaptor</em> [may change in future!]

### Program reaction

- When <em>gromox-http</em> is reloaded,
  <em> all service plugins, all HPM plugins and all PDU processors are reloaded, specifically </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em>, </em>exchange_emsmdb<em>, </em>exchange_nsp<em>, </em>exmdb_provider<em></em>
- When <em>gromox-imap</em> is reloaded,
  <em> all service plugins are reloaded, specifically </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em></em>
- When <em>gromox-pop3</em> is reloaded,
  <em> all service plugins are reloaded, specifically </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em></em>
- When <em>gromox-midb</em> is reloaded,
  <em> all service plugins are reloaded</em>
- When <em>gromox-zcore</em> is reloaded,
  <em> part of the configuration file is reread (`zrpc_debug` directive)</em>
  <em> GAB cache is invalidated</em>
  <em> all service plugins are reloaded, specifically </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em></em>
- When <em>gromox-delivery</em> is reloaded,
  <em> all service plugins are reloaded</em>
- When <em>gromox-delivery-queue</em> is reloaded,
  <em> all service plugins are reloaded</em>

### Plugins

- <em>authmgr</em>:
  <em> re-reads config file and applies desired auth mechanism (`always_ldap`/`always_mysql`/`externid`)</em>
- <em>exchange_emsmdb</em>:
  <em> re-reads part of the configuration file (`rop_debug` directive)</em>
- <em>exchange_nsp</em>:
  <em> invalidates Global Address Book cache</em>
- <em>exmdb_provider</em>:
  <em> re-reads part of the configuration file (`exrpc_debug` directive)</em>
- <em>ldap_adaptor</em>:
  <em> re-reads config file (LDAP connection parameters)</em>
- <em>logthru</em>:
  <em> cycles the logfile (close&open) to facilitate external logrotation</em>
- <em>mysql_adaptor</em>:
  <em> re-reads config file (SQL connection parameters)</em>
