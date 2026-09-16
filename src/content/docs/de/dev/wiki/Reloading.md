---
title: "Neu laden"
sidebar:
  order: 90
---

## Neu laden

### Impuls 

- Wenn sich die Authentifizierungsparameter geändert haben, laden Sie vorzugsweise <em>gromox-http</em>, <em>gromox-zcore</em>, <em>gromox-imap</em>, <em>gromox-pop3</em>
- Wenn sich die Benutzerliste oder die Aliase geändert haben, laden Sie vorzugsweise die Komponente „Globales Adressbuch“ (GAB) neu, die sich in <em>gromox-http</em> und <em>gromox-zcore</em>
- Wenn sich die Domänenliste geändert hat, laden Sie <em>gromox-adaptor</em> neu [kann sich in Zukunft ändern!]

### Reaktionen auf die Sendung

- Wenn <em>gromox-http</em> neu geladen wird,
  <em> werden alle Service-Plugins, alle HPM-Plugins und alle PDU-Prozessoren neu geladen, insbesondere </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em>, </em>exchange_emsmdb<em>, </em>exchange_nsp<em>, </em>exmdb_provider<em></em>
- Wenn <em>gromox-imap</em> neu geladen wird,
  <em> werden alle Service-Plugins neu geladen, insbesondere </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em></em>
- Wenn <em>gromox-pop3</em> neu geladen wird,
  <em> werden alle Service-Plugins neu geladen, insbesondere </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em></em>
- Wenn <em>gromox-midb</em> neu geladen wird,
  <em> werden alle Service-Plugins neu geladen</em>
- Wenn <em>gromox-zcore</em> neu geladen wird,
  wird ein Teil der Konfigurationsdatei erneut gelesen (Anweisung `zrpc_debug`)</em>
  <em> Der GAB-Cache wird ungültig gemacht</em>
  <em> Alle Service-Plugins werden neu geladen, insbesondere </em>authmgr<em>, </em>ldap_adaptor<em>, </em>mysql_adaptor<em></em>
- Wenn <em>gromox-delivery</em> neu geladen wird,
  <em> werden alle Service-Plugins neu geladen</em>
- Wenn <em>gromox-delivery-queue</em> neu geladen wird,
  <em> werden alle Service-Plugins neu geladen</em>

### Plugins

- <em>authmgr</em>:
  <em> liest die Konfigurationsdatei erneut ein und wendet den gewünschten Authentifizierungsmechanismus an (`always_ldap`/`always_mysql`/`externid`)</em>
- <em>exchange_emsmdb</em>:
  <em> liest einen Teil der Konfigurationsdatei erneut ein (`rop_debug`-Direktive)</em>
- <em>exchange_nsp</em>:
  <em> macht den Cache des globalen Adressbuchs ungültig</em>
- <em>exmdb_provider</em>:
  <em> liest einen Teil der Konfigurationsdatei erneut ein (Anweisung `exrpc_debug`)</em>
- <em>ldap_adaptor</em>:
  <em> liest die Konfigurationsdatei erneut ein (LDAP-Verbindungsparameter)</em>
- <em>logthru</em>:
  <em> wechselt die Protokolldatei (schließen & öffnen), um die externe Protokollrotation zu ermöglichen</em>
- <em>mysql_adaptor</em>:
  <em> liest die Konfigurationsdatei erneut ein (SQL-Verbindungsparameter)</em>
