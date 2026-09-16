---
title: "grommunio Meet: video conferencing"
description: "Install grommunio Meet (Jitsi) on the appliance, verify rooms, media and firewall ports, optionally add Keycloak SSO, and connect grommunio Web."
sidebar:
  label: "Meet"
  order: 40
---

grommunio Meet is the video conferencing component of grommunio. It is built
on the Jitsi stack (Prosody, Jicofo, Jitsi Videobridge and the Jitsi Meet web
application) and is served under `https://mail.example.com/meet/` by the same
nginx that serves grommunio Web. Users start meetings from grommunio Web or
from the calendar, or simply share a room URL.

This guide installs Meet on the openSUSE-based grommunio appliance in three
phases. Phase A makes Meet work without any single sign-on: packages,
`grommunio-meet-setup`, generated configuration, nginx route and browser
tests. Phase B optionally protects rooms with grommunio-auth/Keycloak through
a third-party OIDC adapter. Phase C connects grommunio Web and the calendar
workflow. Finish Phase A completely, including the reboot test, before you
start Phase B; SSO problems are much easier to isolate when the plain
conference path is known to work.

For the user-facing side (enabling the plugin, the Meet tab, adding a Meet
link to an appointment) see [Meet in grommunio Web](/web/meet/). For
camera, microphone and browser permission problems on client devices see
[Troubleshooting Meet, Audio/Video](/kb/meet_av/).

## How it fits together

| Component | Package / unit | Role | Listens on |
|---|---|---|---|
| nginx | `grommunio-common` include `grommunio-meet.conf` (shipped by `jitsi-meet`) | Serves the web app under `/meet/`, proxies signalling and the bridge channel | 443/tcp |
| Prosody | `prosody`, `prosody.service` | XMPP server: rooms (MUC), lobby, breakout rooms, authentication | 127.0.0.1:5280 (BOSH and WebSocket, plain HTTP behind nginx), 5222/tcp (XMPP, used locally by Jicofo and the bridge) |
| Jicofo | `jitsi-jicofo`, `jitsi-jicofo.service` | Conference focus: joins each room, picks a bridge, negotiates sessions with participants | XMPP client only |
| Jitsi Videobridge (JVB) | `jitsi-videobridge`, `jitsi-videobridge.service` | Selective forwarding unit: receives and routes all audio/video | 10000/udp (media), 9090/tcp (bridge WebSocket, proxied as `/colibri-ws`), 127.0.0.1:8081 (private REST API, health) |
| Meet web app | `jitsi-meet`, `jitsi-meet-branding-grommunio`, `jitsi-meet-prosody-plugins` | Static frontend in `/srv/jitsi-meet`, client configuration `config.js`, Prosody modules in `/usr/share/jitsi/meet/prosody-plugins/` | via nginx |
| STUN/TURN | external: the managed relay `turn.grommun.io` (default) or your own coturn | Lets clients behind restrictive firewalls reach the bridge | outbound 3478/udp and 443/tcp |

A browser loads `https://mail.example.com/meet/<room>`, which nginx serves
from `/srv/jitsi-meet`. The web app then opens an XMPP connection over
`/meet/xmpp-websocket` (fallback: BOSH over `/meet/http-bind`), which nginx
forwards to Prosody on `127.0.0.1:5280`. Prosody hosts the room as a MUC on
`conference.mail.example.com`; Jicofo (`focus@auth.mail.example.com`) joins
the room, selects a videobridge from the `JvbBrewery@internal.auth.mail.example.com`
MUC and sets up the media sessions. Media flows directly between each
participant and the videobridge over UDP 10000; the bridge also opens a
control WebSocket (`/colibri-ws/`) through nginx to port 9090. Clients that
cannot send UDP fall back to the TURN relay on 443/tcp, which forwards to the
bridge's public UDP 10000, so that port must be reachable in every case.

### Network requirements

| Direction | Port | Purpose |
|---|---|---|
| Inbound to the appliance | 443/tcp | Web app, XMPP signalling, bridge channel (shared with grommunio Web) |
| Inbound to the appliance | 10000/udp | Videobridge media for all participants; behind NAT forward `<public-ip>:10000/udp` to the appliance |
| Outbound from the appliance | 3478/udp, 443/tcp | STUN/TURN relay (`turn.grommun.io` unless you configure your own) |
| Local only | 5222, 5280, 5281, 8081, 9090 | Prosody, JVB REST and WebSocket; do not expose these |

The videobridge is a selective forwarding unit: all participants share the
single UDP port, so a 50-person meeting needs the same ports as a two-person
one. The packaged file
`/usr/share/doc/packages/jitsi-meet/grommunio-meet-network.md` summarises
these requirements and contains an external reachability check (see step 5).

### Files you will work with

| Path | Content |
|---|---|
| `/usr/sbin/grommunio-meet-setup` | Configures Prosody, Jicofo and the videobridge for the appliance; safe to re-run |
| `/etc/prosody/prosody.cfg.lua`, `/etc/prosody/conf.d/mail.example.com.cfg.lua` | Prosody global and host configuration (generated) |
| `/etc/prosody/certs/` | Prosody TLS certificates (Let's Encrypt copy or self-signed) |
| `/etc/jitsi/jicofo/jicofo.conf`, `/etc/jitsi/jicofo/config` | Jicofo HOCON configuration and Java system properties |
| `/etc/jitsi/videobridge/jvb.conf`, `/etc/jitsi/videobridge/sip-communicator.properties` | Videobridge configuration and NAT address mapping |
| `/etc/systemd/system/jitsi-videobridge.service.d/10-grommunio-config.conf` | Drop-in that makes the bridge load `jvb.conf` |
| `/etc/jitsi/.meet-secrets` | Generated XMPP passwords and bridge nickname (root only) |
| `/srv/jitsi-meet/config.js` | Client configuration served to browsers |
| `/usr/share/grommunio-common/nginx/locations.d/grommunio-meet.conf` | Packaged nginx locations for `/meet/` and `/colibri-ws/` |
| `/etc/grommunio-common/nginx/locations.d/` | Directory for your own additional nginx locations (used in Phase B) |
| `/etc/grommunio-web/config-meet.php` | grommunio Web Meet plugin defaults (Phase C) |

## Prerequisites

- A working grommunio appliance with grommunio Web reachable at
  `https://mail.example.com/web/` (see [Installation](/admin/installation/)
  and [Quickstart](/admin/quickstart/)).
- `hostname -f` returns the public name users will type
  (`mail.example.com`), and the TLS certificate covers that name.
  `grommunio-meet-setup` reuses a Let's Encrypt certificate from
  `/etc/letsencrypt/live/mail.example.com/` when present.
- UDP 10000 is reachable from the client networks (open it on perimeter and
  cloud firewalls, forward it if the appliance is behind NAT).
- Outbound 3478/udp and 443/tcp to the TURN relay, or your own coturn.
- For Phase B: a working grommunio-auth/Keycloak installation, see
  [Single sign-on with Keycloak](/guides/sso-keycloak/).
- Root shell access to the appliance.

## 1. Install the Meet packages

Meet is an optional role of `grommunio-setup`. If you did not select it
during the initial setup, either re-run `grommunio-setup` and add the role
`meet`, or install the packages directly:

```bash
zypper install jitsi-meet jitsi-jicofo jitsi-videobridge jitsi-meet-prosody-plugins jitsi-meet-branding-grommunio prosody
rpm -q jitsi-meet jitsi-jicofo jitsi-videobridge jitsi-meet-prosody-plugins jitsi-meet-branding-grommunio prosody
```

The `jitsi-meet` package installs the web application into
`/srv/jitsi-meet`, the nginx include
`/usr/share/grommunio-common/nginx/locations.d/grommunio-meet.conf`, the
`grommunio-meet-setup` tool and the network requirements document. Its
post-install script writes the host name into `/srv/jitsi-meet/config.js`
and pins the `meet/` sub-directory used for the BOSH and WebSocket URLs.
`jitsi-meet-branding-grommunio` adds the grommunio look
(`index.html`, `custom.css`, `interface_config.js`, images).

## 2. Run grommunio-meet-setup

`grommunio-meet-setup` generates all service configuration for the FQDN you
pass (default: `hostname -f`). It is idempotent: secrets are kept in
`/etc/jitsi/.meet-secrets` and reused on every run, so you can re-run it
after changing the host name, the public IP or the TURN settings.

```bash
grommunio-meet-setup mail.example.com
```

The tool performs these steps:

1. Writes the Prosody host configuration
   `/etc/prosody/conf.d/mail.example.com.cfg.lua` (virtual hosts,
   MUC components, lobby and breakout rooms, TURN `external_services`) and
   makes sure `/etc/prosody/prosody.cfg.lua` includes `conf.d/*.cfg.lua`.
2. Creates TLS certificates in `/etc/prosody/certs/` (copies Let's Encrypt
   files when present, otherwise self-signed) and adds the self-signed
   ones to the system trust store as `/etc/pki/trust/anchors/prosody-*.crt`.
3. Registers the XMPP accounts `focus@auth.mail.example.com` (Jicofo) and
   `jvb@auth.mail.example.com` (videobridge) with generated passwords.
4. Writes `/etc/jitsi/jicofo/jicofo.conf` and `/etc/jitsi/jicofo/config`.
5. Fills the bridge password and a unique bridge nickname into the packaged
   `/etc/jitsi/videobridge/jvb.conf` and installs the systemd drop-in
   that passes `-Dconfig.file=/etc/jitsi/videobridge/jvb.conf` to the bridge.
6. Detects the public IP via STUN and, if it differs from the local address,
   writes the NAT mapping into
   `/etc/jitsi/videobridge/sip-communicator.properties`.
7. Replaces the domain in `/srv/jitsi-meet/config.js`.
8. Opens `10000/udp` in firewalld when firewalld is active.
9. Enables and restarts `prosody`, `jitsi-videobridge`, `jitsi-jicofo` and
   reloads nginx.

Environment variables override the detection:

| Variable | Effect |
|---|---|
| `JVB_PUBLIC_ADDRESS=203.0.113.10` | Advertise this public IP for media instead of the STUN-discovered one |
| `TURN_HOST=turn.example.com` | Use your own STUN/TURN server instead of the managed relay |
| `TURN_SECRET=<strong-password>` | Shared secret of your own coturn (`external_service_secret`) |

Example for an appliance behind NAT with its own coturn:

```bash
JVB_PUBLIC_ADDRESS=203.0.113.10 TURN_HOST=turn.example.com TURN_SECRET=<strong-password> grommunio-meet-setup mail.example.com
```

Expected result: the last lines print `grommunio-meet-setup: done. Meet is
at https://mail.example.com/meet` followed by the network summary. Then check
the services:

```bash
systemctl is-active prosody jitsi-jicofo jitsi-videobridge nginx
```

All four must report `active` before you continue.

:::caution[Re-runs restart the Meet services]
`grommunio-meet-setup` restarts Prosody, the videobridge and Jicofo, which
ends running conferences. Run it in a maintenance window on a production
system.
:::

## 3. Review the generated configuration

You normally do not edit these files by hand; knowing their structure is what
makes troubleshooting possible. Values shown as `<...>` are placeholders for
the generated secrets, which must stay on the appliance.

### 3.1 Prosody

`/etc/prosody/conf.d/mail.example.com.cfg.lua` defines:

- `VirtualHost "mail.example.com"` with `authentication = "anonymous"`,
  the modules `bosh`, `websocket`, `external_services`, `ping`,
  `conference_duration`, `muc_lobby_rooms`, `muc_breakout_rooms` (plus
  `smacks` when the Prosody version provides it), and
  `main_muc = "conference.mail.example.com"`,
  `lobby_muc = "lobby.mail.example.com"`,
  `breakout_rooms_muc = "breakout.mail.example.com"`.
- `VirtualHost "auth.mail.example.com"` with
  `authentication = "internal_hashed"`, the login domain of `focus` and `jvb`.
- MUC components `conference.`, `breakout.`, `lobby.` and
  `internal.auth.mail.example.com` (the bridge brewery), plus the
  `focus.mail.example.com` `client_proxy` component and the helper
  components for speaker stats, A/V moderation, end conference and room
  metadata.
- `plugin_paths = { "/usr/share/jitsi/meet/prosody-plugins" }`.
- `external_services` with the STUN (3478/udp), TURN (3478/udp) and TURNS
  (443/tcp) entries of the relay, authenticated with `external_service_secret`.
- `cross_domain_websocket = { "https://mail.example.com" }`. Prosody
  serves plain HTTP on 5280 behind nginx; this entry allows the HTTPS origin
  of the browser. It must match the host name users open.

Anonymous authentication means anyone who knows a room URL can create and
join that room. Rooms are protected by their names (and, optionally, by
lobby or room password set by a moderator). Phase B replaces this with token
authentication.

### 3.2 Jicofo

`/etc/jitsi/jicofo/jicofo.conf` (HOCON):

```plaintext title="/etc/jitsi/jicofo/jicofo.conf"
jicofo {
  xmpp {
    client {
      client-proxy = "focus.mail.example.com"
      xmpp-domain = "mail.example.com"
      domain = "auth.mail.example.com"
      username = "focus"
      password = "<focus-password>"
      disable-certificate-verification = true
    }
  }
  bridge { brewery-jid = "JvbBrewery@internal.auth.mail.example.com" }
}
```

The unit `jitsi-jicofo.service` reads `EnvironmentFile=-/etc/jitsi/jicofo/config`
(Java system properties, log directory `/var/log/jitsi`) and starts
`/usr/share/jitsi/jicofo/jicofo.sh`, which adds
`-Dconfig.file=/etc/jitsi/jicofo/jicofo.conf` automatically when that file
exists. If `jicofo.conf` is missing, Jicofo exits with "To run jicofo you
need a configuration file". The legacy environment file
`/etc/jitsi/jicofo/jitsi-jicofo.conf` from older setups is not read by the
current unit.

### 3.3 Videobridge

`/etc/jitsi/videobridge/jvb.conf` (HOCON) is shipped by the package; the setup
tool only fills in the password and nickname:

```plaintext title="/etc/jitsi/videobridge/jvb.conf"
videobridge {
  http-servers {
    public {
      host = 0.0.0.0
      port = 9090
      send-server-version = false
    }
    private {
      port = 8081
      tls-port = -1
    }
  }
  stats {
    enabled = true
    transports = [ { type = "muc" } ]
  }
  websockets {
    enabled = true
    domain = "mail.example.com:443"
    tls = true
  }
  apis.xmpp-client.configs {
    shard {
      hostname = "localhost"
      domain = "auth.mail.example.com"
      username = "jvb"
      password = "<jvb-password>"
      muc_jids = "JvbBrewery@internal.auth.mail.example.com"
      muc_nickname = "<unique-uuid>"
      disable-certificate-verification = true
    }
  }
}
ice4j {
  harvest {
    mapping {
      aws.enabled = false
    }
  }
}
```

Points worth knowing:

- The private REST port is 8081, not the Jitsi default 8080, because 8080 is
  already used by nginx for grommunio Web on the appliance. The health check
  is `http://127.0.0.1:8081/about/health`.
- `websockets.domain` must be the host name and port the browsers use;
  nginx forwards `/colibri-ws/` and `/meet/colibri-ws/` to port 9090.
- `muc_jids` must equal Jicofo's `bridge.brewery-jid`, and `muc_nickname`
  must be unique per bridge.
- `/usr/share/jitsi/videobridge/jvb.sh` does not add `-Dconfig.file` by
  itself, so the drop-in
  `/etc/systemd/system/jitsi-videobridge.service.d/10-grommunio-config.conf`
  with `Environment=JAVA_SYS_PROPS=-Dconfig.file=/etc/jitsi/videobridge/jvb.conf`
  is required. Without it the bridge falls back to defaults (port 8080,
  no brewery) and Jicofo never finds a bridge. Check with:

```bash
systemctl show -p Environment jitsi-videobridge
```

Expected result: the output contains `-Dconfig.file=/etc/jitsi/videobridge/jvb.conf`.

**Public address behind NAT.** When the STUN-discovered public IP differs
from the local one, the setup tool writes
`org.ice4j.ice.harvest.NAT_HARVESTER_LOCAL_ADDRESS` and
`org.ice4j.ice.harvest.NAT_HARVESTER_PUBLIC_ADDRESS` to
`/etc/jitsi/videobridge/sip-communicator.properties`. Re-run the tool with
`JVB_PUBLIC_ADDRESS=<public-ip>` if the detection is wrong. If your
environment translates the port as well (for example a lab that maps
`<public-ip>:11001/udp` to the appliance's 10000/udp), use an explicit
static mapping in `jvb.conf` instead:

```plaintext title="/etc/jitsi/videobridge/jvb.conf (excerpt)"
ice4j {
  harvest {
    mapping {
      aws.enabled = false
      stun.enabled = false
      static-mappings = [
        {
          local-address = "10.0.0.15"
          public-address = "203.0.113.10"
          local-port = 10000
          public-port = 11001
        }
      ]
    }
  }
}
```

In a lab whose appliance only has private (RFC 1918) addresses, the bridge
health check fails by default; set
`videobridge.health.require-valid-address = false` in `jvb.conf` for such
test environments only.

### 3.4 Client configuration

`/srv/jitsi-meet/config.js` is served to every browser. The relevant keys:

```js title="/srv/jitsi-meet/config.js (excerpt)"
var subdir = 'meet/';
var config = {
    hosts: {
        domain: 'mail.example.com',
        focus: 'focus.mail.example.com',
        muc: 'conference.mail.example.com'
    },
    bosh: '//mail.example.com/meet/http-bind',
    websocket: 'wss://mail.example.com/meet/xmpp-websocket',
    requireDisplayName: true,
    enableWelcomePage: true,
    prejoinConfig: {
        enabled: true,
    },
    p2p: {
        enabled: true,
        stunServers: [
        ]
    },
};
```

`hosts.domain`, `bosh` and `websocket` must use exactly the host name users
open in the browser; otherwise the XMPP connection fails while the page
itself still loads. `config.js` is an rpm configuration file, so package
updates leave your version in place and write `config.js.rpmnew` next to it.

## 4. Verify the nginx route and the client files

The `/meet/` locations come from the packaged include, which nginx loads
through `/usr/share/grommunio-common/nginx.conf`. After installing the
packages nginx must have been reloaded (the setup tool does this).

```bash
nginx -t
nginx -T | grep -n "grommunio-meet.conf"
curl -kI https://mail.example.com/meet/
curl -kI https://mail.example.com/meet/config.js
curl -kI https://mail.example.com/meet/external_api.js
curl -sS -i http://127.0.0.1:8081/about/health
ss -lunp | grep ':10000 '
```

Expected results: `nginx -t` reports the configuration as valid; `nginx -T`
lists the include; the three `curl -kI` calls return `HTTP/2 200` (or
`HTTP/1.1 200 OK`); the health check returns `HTTP/1.1 200 OK` with an empty
body; `ss` shows Java sockets bound to UDP 10000.

The include also proxies `/meet/http-bind` and `/meet/xmpp-websocket` to
`127.0.0.1:5280` and `/colibri-ws/` to `127.0.0.1:9090`, and logs to
`/var/log/nginx/nginx-meet-access.log` and
`/var/log/nginx/nginx-meet-error.log`.

## 5. Test in the browser

Run the tests from a client network, not from the appliance itself.

1. **Single participant.** In a fresh browser profile open
   `https://mail.example.com/meet/standalone-test-room`. Expected result: the
   grommunio-branded pre-join screen appears, camera and microphone previews
   work, a display name is requested, and after joining you are the only
   participant in the room. In the browser's developer tools (Network tab)
   the WebSocket to `/meet/xmpp-websocket` is open.
2. **Two participants.** Join the same room from a second browser profile or
   device. Expected result: both participants see and hear each other; the
   connection indicator shows a bridge connection (not only P2P) once a third
   participant joins.
3. **Three participants.** Join from a third context. Expected result: all
   three tiles show live video; the participant list is stable.
4. **Stability.** Keep the session running for at least 120 seconds.
   Expected result: nobody is dropped and audio/video do not stall.
5. **Media path from outside.** From a machine outside your network,
   confirm that UDP 10000 answers STUN (`203.0.113.10` is the public IP of
   the appliance):

```bash
python3 - <<'PY'
import socket, struct, os
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.settimeout(4)
s.sendto(struct.pack(">HHI12s", 1, 0, 0x2112A442, os.urandom(12)), ("203.0.113.10", 10000))
print("reachable:", len(s.recvfrom(1024)[0]), "bytes")
PY
```

   Expected result: `reachable: <n> bytes`. A timeout means UDP 10000 is
   blocked or not forwarded.

6. **Reboot.** Reboot the appliance and repeat the service check from step 2,
   the checks from step 4 and the single-participant test. Expected result:
   identical results without manual intervention.

Phase A is complete when all six tests pass.

## 6. Optional: single sign-on for protected rooms

By default anyone who knows a room URL can join. To require a grommunio
login, Meet must be switched to token (JWT) authentication: Prosody and the
web app accept a signed token, and something has to turn a Keycloak login
into such a token. Jitsi does not ship that piece.

:::note[Third-party component]
This section uses the **Jitsi Keycloak Adapter v2** by Nordeck
(<https://github.com/nordeck/jitsi-keycloak-adapter-v2>), a small Deno
service that is not part of grommunio and not covered by grommunio support.
Its authors point to `jitsi-oidc-adapter` (jitsi-contrib) as the successor
project; other adapters exist. Treat the adapter installation as your own
integration, pin a release, and review its source before deploying it.
Everything in 6.3 that touches Prosody and `config.js` is standard Jitsi
token authentication and applies to any adapter.
:::

The flow is: browser opens a room, Meet redirects to the adapter's
`/oidc/auth`, the adapter redirects to Keycloak (realm `grommunio`), the user
logs in (optionally with MFA), Keycloak redirects back to the adapter's
`/oidc/tokenize`, the adapter mints a Jitsi JWT (`app_id`/`app_secret` shared
with Prosody) and sends the browser back into the room with `?jwt=...`.

The adapter builds its own Keycloak redirect URI as
`https://<Host header>/oidc/tokenize` and serves only `/oidc/auth`,
`/oidc/tokenize` and `/oidc/health`. Publish these paths under `/oidc/` on
the grommunio host exactly as shown; do not move them under `/meet/`.

### 6.1 Create the Keycloak client

In the Keycloak admin console of grommunio-auth, in the realm `grommunio`
(not `master`), create an OpenID Connect client:

```plaintext
Client ID:              grommunio-meet
Client authentication:  On
Standard flow:          On
Valid redirect URIs:    https://mail.example.com/oidc/tokenize
Web origins:            https://mail.example.com
```

Copy the client secret from the client's *Credentials* tab; it becomes
`KEYCLOAK_CLIENT_SECRET` below. (The adapter also supports a public client
with client authentication off and an empty secret.)

Check that the realm's discovery document is reachable from the appliance:

```bash
curl -sS https://mail.example.com/auth/realms/grommunio/.well-known/openid-configuration | head -c 300
```

Expected result: JSON starting with `{"issuer":"https://mail.example.com/auth/realms/grommunio", ...`.

### 6.2 Install the adapter as a system service

The adapter needs the Deno runtime, which is not packaged for the appliance;
install it from the upstream release archive into `/usr/local/bin` (see the
adapter's `docs/setup-standalone.md`). Then install the adapter under its own
unprivileged user with a root-owned environment file. Replace
`<pinned-release-or-commit>` with the tag you reviewed.

```bash
deno --version
install -d -o root -g root -m 0755 /opt/jitsi-keycloak-adapter-v2
git clone https://github.com/nordeck/jitsi-keycloak-adapter-v2.git /opt/jitsi-keycloak-adapter-v2
git -C /opt/jitsi-keycloak-adapter-v2 checkout <pinned-release-or-commit>
groupadd --system jitsi-oidc-adapter
useradd --system --gid jitsi-oidc-adapter --home-dir /var/lib/jitsi-oidc-adapter --shell /usr/sbin/nologin jitsi-oidc-adapter
install -d -o jitsi-oidc-adapter -g jitsi-oidc-adapter -m 0750 /var/lib/jitsi-oidc-adapter
install -d -o root -g jitsi-oidc-adapter -m 0750 /etc/jitsi/meet/oidc-adapter
```

Generate a long random string for `JWT_APP_SECRET` (for example
`openssl rand -hex 32`); it is shared between the adapter and Prosody only.

```properties title="/etc/jitsi/meet/oidc-adapter/environment"
KEYCLOAK_ORIGIN=https://mail.example.com/auth
KEYCLOAK_ORIGIN_INTERNAL=https://mail.example.com/auth
KEYCLOAK_REALM=grommunio
KEYCLOAK_CLIENT_ID=grommunio-meet
KEYCLOAK_CLIENT_SECRET=<keycloak-client-secret>
KEYCLOAK_MODE=query
JWT_ALG=HS256
JWT_HASH=SHA-256
JWT_APP_ID=grommunio-meet
JWT_APP_SECRET=<jitsi-jwt-app-secret>
JWT_EXP_SECOND=3600
HOSTNAME=127.0.0.1
PORT=9000
```

`KEYCLOAK_ORIGIN` is the base under which grommunio-auth publishes Keycloak;
the adapter appends `/realms/<realm>/protocol/openid-connect/...`, so give
it without a trailing slash. `KEYCLOAK_ORIGIN_INTERNAL` may point to an
internal address if the public one is not reachable from the appliance.

```bash
chown root:jitsi-oidc-adapter /etc/jitsi/meet/oidc-adapter/environment
chmod 0640 /etc/jitsi/meet/oidc-adapter/environment
```

```ini title="/etc/systemd/system/oidc-adapter.service"
[Unit]
Description=grommunio Meet Keycloak OIDC adapter (Nordeck v2)
Documentation=https://github.com/nordeck/jitsi-keycloak-adapter-v2
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=jitsi-oidc-adapter
Group=jitsi-oidc-adapter
WorkingDirectory=/opt/jitsi-keycloak-adapter-v2
EnvironmentFile=/etc/jitsi/meet/oidc-adapter/environment
ExecStart=/usr/local/bin/deno run --allow-net --allow-env /opt/jitsi-keycloak-adapter-v2/src/adapter.ts
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
systemctl daemon-reload
systemctl enable --now oidc-adapter.service
systemctl is-active oidc-adapter.service
curl -sS -i http://127.0.0.1:9000/oidc/health
journalctl -u oidc-adapter -n 20 --no-pager
```

Expected result: the service is `active`, the health call returns
`HTTP/1.1 200 OK` with body `healthy`, and the journal shows the adapter's
start-up summary of its settings (secrets masked). The adapter only needs
network access to Keycloak; if grommunio-auth uses a certificate the
appliance does not trust, fix the trust store rather than disabling
certificate checks.

### 6.3 Wire nginx, the web app and Prosody

**nginx.** Add a location for the adapter in the admin drop-in directory,
which the grommunio nginx configuration includes alongside the packaged
locations:

```nginx title="/etc/grommunio-common/nginx/locations.d/meet-oidc.conf"
location ~ ^/oidc/ {
    proxy_pass http://127.0.0.1:9000;
    proxy_http_version 1.1;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header Host $http_host;
}
```

**Web app.** Point Meet at the adapter by appending to
`/srv/jitsi-meet/config.js` (after the `var config = {...};` block):

```js title="/srv/jitsi-meet/config.js (append)"
config.tokenAuthUrl = 'https://mail.example.com/oidc/auth?state={state}';
config.tokenAuthUrlAutoRedirect = true;
```

`{state}` is filled in by the web app with the room name, tenant and client
type; the adapter uses it to send the user back to the right room.
`tokenAuthUrlAutoRedirect` (from the adapter's documentation) makes the
redirect happen without an extra login button; if your Meet version ignores
it, users get a login button on the pre-join screen instead.

**Prosody.** In `/etc/prosody/conf.d/mail.example.com.cfg.lua` switch the
main virtual host from anonymous to token authentication and enable token
verification on the conference MUC. The `app_id`/`app_secret` pair must be
identical to `JWT_APP_ID`/`JWT_APP_SECRET` of the adapter.

```lua title="/etc/prosody/conf.d/mail.example.com.cfg.lua (changes)"
VirtualHost "mail.example.com"
    authentication = "token"
    app_id = "grommunio-meet"
    app_secret = "<jitsi-jwt-app-secret>"
    allow_empty_token = false
    asap_accepted_issuers = { "grommunio-meet" }
    asap_accepted_audiences = { "grommunio-meet" }
    -- keep ssl, modules_enabled, main_muc, lobby_muc, breakout_rooms_muc as generated

Component "conference.mail.example.com" "muc"
    -- add to the existing modules_enabled list:
    modules_enabled = { "muc_hide_all"; "muc_meeting_id"; "muc_domain_mapper"; "muc_rate_limit"; "muc_password_whitelist"; "token_verification"; }
```

The modules `mod_auth_token.lua` and `mod_token_verification.lua` are part
of `jitsi-meet-prosody-plugins` and already on the plugin path.

Apply everything:

```bash
prosodyctl check config
nginx -t
systemctl restart prosody jitsi-jicofo jitsi-videobridge
systemctl reload nginx
systemctl is-active prosody jitsi-jicofo jitsi-videobridge oidc-adapter nginx
curl -kI https://mail.example.com/meet/
curl -ks https://mail.example.com/meet/config.js | grep -n tokenAuth
```

Expected result: all services active, `/meet/` still answers 200, and the
delivered `config.js` contains both `tokenAuth` lines.

:::caution[Re-running grommunio-meet-setup reverts the Prosody changes]
`grommunio-meet-setup` rewrites `/etc/prosody/conf.d/mail.example.com.cfg.lua`
with `authentication = "anonymous"`. After any re-run, re-apply the token
settings above. The nginx drop-in, the adapter service and the `config.js`
additions are not touched by the tool, but a `jitsi-meet` package update may
ship a new `config.js.rpmnew` to merge.
:::

The adapter issues tokens with `iss` and `aud` set to `JWT_APP_ID`, `room`
set to the room the user opened, and `sub` set to the Jitsi tenant (the path
segment before the room name) or, without a tenant, to the host name.

:::note[Meet under /meet/ and the token tenant]
Because Meet is served under `/meet/`, the web app reports the tenant `meet`
and the adapter writes `sub = "meet"` into the token. Prosody's token module
verifies that claim against the room's domain by default
(`enable_domain_verification`, default `true`). If joining a protected room
fails after a successful Keycloak login and `/var/log/prosody/prosody.err`
reports a room or domain mismatch from the token module, add
`enable_domain_verification = false` to the `VirtualHost "mail.example.com"`
block as a diagnostic step; the token is then checked for signature,
issuer, audience, expiry and room name only.
:::

### 6.4 Optional: allow guests into rooms opened by a logged-in host

Token authentication as configured above requires every participant to log
in. To let external guests join once a grommunio user has opened the room,
follow the "Guest users" section of the adapter's standalone guide: it adds
`allow_empty_token = true`, the modules `persistent_lobby` and
`muc_wait_for_host` (both shipped in `jitsi-meet-prosody-plugins`), a
`VirtualHost "guest.mail.example.com"` with `authentication = "jitsi-anonymous"`
and `config.hosts.anonymousdomain = 'guest.mail.example.com'` in
`config.js`. Test this variant separately from the basic SSO flow.

### 6.5 End-to-end SSO test

In a fresh browser profile open
`https://mail.example.com/meet/sso-test-room`. Expected result, in order:

1. Meet redirects to `https://mail.example.com/oidc/auth?state=...`, which
   redirects to the Keycloak login page of the realm `grommunio`.
2. Log in as `alice@example.com` (complete MFA if configured).
3. Keycloak redirects to `https://mail.example.com/oidc/tokenize?...`, and
   the browser lands back in `/meet/sso-test-room` with a `jwt` parameter,
   showing the display name from the account.
4. A second logged-in user (`bob@example.com`) joins the same room; audio and
   video work as in Phase A.
5. An anonymous browser profile opening the room is sent to Keycloak instead
   of joining (unless you configured guest access in 6.4).

Only when all five points hold is SSO complete. If step 1 or 3 shows a
Keycloak error page, read the *Events* view of the realm and the adapter
journal; see the troubleshooting table.

## 7. Connect grommunio Web and the calendar

Users create and join meetings from grommunio Web; the steps for end users
are described in [Meet in grommunio Web](/web/meet/). On the server side
three settings matter.

**Plugin defaults.** `/etc/grommunio-web/config-meet.php` (linked from
`/usr/share/grommunio-web/plugins/meet/config.php`) defines the array
`MEET_DEFAULTS`. The `server` entry is the Meet base URL; by default it is
derived from the host the user is logged in to:

```php title="/etc/grommunio-web/config-meet.php (excerpt)"
define('MEET_DEFAULTS', [
	// Base URL of your Meet installation:
	'server' => 'https://' . $_SERVER['HTTP_HOST'] . '/meet/',

	// Uncomment to enable the plugin by default
	// 'enable' => true,

	// Uncomment to change default meeting opening behaviour, possible values: web browser popup
	'openin' => 'web',
	// ...
]);
```

Set `'server'` explicitly (`'https://mail.example.com/meet/'`) when Meet runs
on a different host than grommunio Web, and uncomment `'enable' => true` if
every user should get the Meet tab without enabling the plugin themselves.
The other keys (`hidetabbarbutton`, `locationoverride`, `nolocationfix`,
`noinvitation`, `invitationmessage`, `invitationhtml`) control the toolbar
button, how the link is written into the appointment's location, and the
invitation text template inserted into the appointment body. These are
administrator defaults; they take effect for a user after the next login.

**Per-user permission.** In the Admin UI, each user has an
*Allow Chat/Meet/Files/Archive* setting under the user's account
properties (see [Administration](/admin/administration/)). grommunio Web
asks the Admin API which plugins are disabled for a user, so the Meet plugin
is unavailable to users without this permission.

**App launcher.** The Admin UI's application switcher reads
`/etc/grommunio-admin-common/config.json`; make sure `videoWebAddress` points
to your Meet URL (see [Manual installation](/admin/manual_core/)):

```json title="/etc/grommunio-admin-common/config.json (excerpt)"
{
  "mailWebAddress": "https://mail.example.com/web",
  "videoWebAddress": "https://mail.example.com/meet"
}
```

**Calendar workflow test.** Log in to grommunio Web as `alice@example.com`,
enable the Meet plugin in *Settings > Plugins* if it is not enabled by
default, create a meeting request with `bob@example.com` as attendee, click
*Add Meeting*, and save. Expected result: the Location field and the body
contain `https://mail.example.com/meet/<room>`; both users can open the link
(with Phase B, both are sent through Keycloak first) and meet in the same
room. Room names generated by Web are random and not guessable; if users
type their own keywords, advise them to choose names that are not easy to
guess.

## Verification checklist

| Area | Check | Expected result |
|---|---|---|
| Packages | `rpm -q jitsi-meet jitsi-jicofo jitsi-videobridge jitsi-meet-prosody-plugins jitsi-meet-branding-grommunio prosody` | All six installed |
| Services | `systemctl is-active prosody jitsi-jicofo jitsi-videobridge nginx` | `active` for all |
| Bridge config loaded | `systemctl show -p Environment jitsi-videobridge` | Contains `-Dconfig.file=/etc/jitsi/videobridge/jvb.conf` |
| Bridge health | `curl -sS -i http://127.0.0.1:8081/about/health` | `HTTP/1.1 200 OK` |
| Bridge registered | `journalctl -u jitsi-jicofo -n 200 --no-pager` | No "no bridge available" errors after a room was joined |
| Web route | `curl -kI https://mail.example.com/meet/` and `/meet/config.js` | `200` |
| Media port | `ss -lunp \| grep ':10000 '` and the external STUN check | Socket bound; STUN answer from outside |
| Firewall | perimeter and cloud firewall rules | 443/tcp and 10000/udp inbound, 3478/udp and 443/tcp outbound |
| Single participant | Pre-join, camera, microphone, join | Joined; WebSocket to `/meet/xmpp-websocket` open |
| Multi-user | Two, then three browser contexts | All participants see and hear each other for 120 s |
| Reboot | Reboot the appliance, repeat service and URL checks | Identical results |
| Logs | `journalctl -u jitsi-jicofo -u jitsi-videobridge -p warning -n 50`, `/var/log/prosody/prosody.err` | No repeating errors |
| SSO (optional) | Fresh browser to a room | Keycloak login in realm `grommunio`, redirect back into the room, A/V works |
| grommunio Web | Meeting request with *Add Meeting* | Link in Location and body; attendees reach the room |

## Troubleshooting

| Symptom | Likely cause | What to check / fix |
|---|---|---|
| `https://mail.example.com/meet/` returns 404 or the grommunio Web page | nginx include not loaded or nginx not reloaded after installation | `nginx -T \| grep grommunio-meet.conf`; `nginx -t && systemctl reload nginx` |
| Page loads, but joining hangs at "connecting" | XMPP connection fails: wrong host in `config.js`, Prosody down, or WebSocket origin not allowed | Browser dev tools (WebSocket to `/meet/xmpp-websocket`); `systemctl status prosody`; `/var/log/prosody/prosody.err`; `hosts.domain`/`bosh`/`websocket` in `config.js` and `cross_domain_websocket` must use the host users type; re-run `grommunio-meet-setup <fqdn>` |
| Participants join but see "bridge unavailable" or never get video | Videobridge did not join the brewery: drop-in missing, password mismatch, `muc_jids` differs from `brewery-jid` | `systemctl show -p Environment jitsi-videobridge`; `journalctl -u jitsi-videobridge -u jitsi-jicofo -n 200`; compare `jvb.conf` and `jicofo.conf`; re-run `grommunio-meet-setup` |
| Two participants work, three or more do not, or media dies after a few seconds | UDP 10000 blocked, not forwarded, or wrong advertised address (P2P works, bridge does not) | Perimeter/NAT rules; external STUN check; `NAT_HARVESTER_*` in `sip-communicator.properties`; re-run with `JVB_PUBLIC_ADDRESS=<public-ip>` |
| Health check on 8081 returns 500 or "unhealthy" | Only private addresses available for ICE (lab) or mapping harvester failing | Fix public address mapping; in labs set `videobridge.health.require-valid-address = false` |
| `jitsi-jicofo` exits immediately | `/etc/jitsi/jicofo/jicofo.conf` missing | `journalctl -u jitsi-jicofo`; run `grommunio-meet-setup` |
| Bridge listens on 8080 instead of 8081, or fails to bind | `jvb.conf` not loaded (see above) or port 8080 already used by nginx | Restore the systemd drop-in; `ss -ltnp \| grep -E ':(8080\|8081) '` |
| Meet broke after a package update | `config.js`, `jvb.conf` or `prosody.cfg.lua` replaced or `.rpmnew` not merged | `ls /srv/jitsi-meet/*.rpm* /etc/jitsi/*/*.rpm* /etc/prosody/*.rpm*`; merge, re-run `grommunio-meet-setup`, re-apply Phase B changes |
| Clients cannot get camera or microphone | Browser or OS permissions on the client | See [Troubleshooting Meet, Audio/Video](/kb/meet_av/) |
| SSO: Keycloak shows "Invalid parameter: redirect_uri" | Redirect URI not registered; adapter uses `https://<host>/oidc/tokenize` | Add exactly that URI to the client's *Valid redirect URIs*; check realm *Events* |
| SSO: adapter logs "unauthorized" at `/oidc/tokenize` | Wrong `KEYCLOAK_CLIENT_SECRET`, realm or client ID | Copy the secret from the *Credentials* tab; compare `KEYCLOAK_REALM`, `KEYCLOAK_CLIENT_ID`; `systemctl restart oidc-adapter` |
| SSO: adapter cannot reach Keycloak | DNS, TLS trust or firewall between appliance and Keycloak | `curl https://mail.example.com/auth/realms/grommunio/.well-known/openid-configuration` from the appliance; `KEYCLOAK_ORIGIN_INTERNAL` |
| SSO: `oidc-adapter.service` fails to start | Deno missing, wrong path in `ExecStart`, unreadable environment file, port 9000 in use | `journalctl -u oidc-adapter`; `deno --version`; file mode `0640 root:jitsi-oidc-adapter`; `ss -ltnp \| grep 9000` (change `PORT` and `proxy_pass` together) |
| SSO: `/oidc/auth` returns 404 from nginx | Drop-in location missing or shadowed | `nginx -T \| grep -n oidc`; the file must be in `/etc/grommunio-common/nginx/locations.d/` |
| SSO: login loop between Meet and Keycloak | `tokenAuthUrl` wrong or `config.js` not delivering it; cookies/`SameSite` blocked | `curl -ks https://mail.example.com/meet/config.js \| grep tokenAuth`; browser network log |
| SSO: login succeeds but Meet rejects the token | `app_id`/`app_secret` differ between adapter and Prosody; issuer or audience not accepted; virtual host still `anonymous` | Compare `JWT_APP_ID`/`JWT_APP_SECRET` with `app_id`/`app_secret`; `asap_accepted_issuers`/`asap_accepted_audiences`; `authentication = "token"`; `prosodyctl check config`; `/var/log/prosody/prosody.err` |
| SSO: Keycloak login succeeds, token is valid, but the room refuses the user with a room or domain mismatch | `sub` claim (`meet` tenant) does not match what Prosody's domain verification expects for the room | `/var/log/prosody/prosody.err`; set `enable_domain_verification = false` on the virtual host and retest |
| SSO: Meet loads but never asks for login | `tokenAuthUrl` missing from the delivered `config.js` or web app cached | Check `config.js`; hard-reload the browser |

## Operating notes

- **Logs.** Jicofo and the videobridge log to the journal:
  `journalctl -u jitsi-jicofo`, `journalctl -u jitsi-videobridge`. Prosody
  writes `/var/log/prosody/prosody.log` and `/var/log/prosody/prosody.err`;
  raise its log level in `/etc/prosody/prosody.cfg.lua` (`log = { info = ...}`
  to `debug`) only temporarily. nginx keeps Meet traffic in
  `/var/log/nginx/nginx-meet-access.log` and `nginx-meet-error.log`. The
  adapter (Phase B) logs to `journalctl -u oidc-adapter`.
- **Monitoring.** Poll `http://127.0.0.1:8081/about/health` (expects 200)
  and the four units. `/oidc/health` on the adapter returns `healthy`.
- **Ports.** Keep 5222, 5280, 5281, 8081, 9090 and 9000 unreachable from
  outside; only 443/tcp and 10000/udp are meant to be public.
- **Updates.** Update with `zypper ref && zypper up` as described in
  [Operations](/admin/operations/). `config.js`, `jvb.conf` and
  `prosody.cfg.lua` are rpm configuration files: after an update look for
  `.rpmnew`/`.rpmsave` files, merge them, then re-run
  `grommunio-meet-setup <fqdn>` (which restarts the Meet services) and
  re-apply the Phase B Prosody changes. `zypper ps -s` lists services that
  still run old binaries.
- **Backup.** Include `/etc/jitsi/` (contains `.meet-secrets`),
  `/etc/prosody/`, `/var/lib/prosody/` (registered accounts), `/srv/jitsi-meet/config.js`,
  `/etc/grommunio-common/nginx/locations.d/`, `/etc/grommunio-web/config-meet.php`
  and, for Phase B, `/etc/jitsi/meet/oidc-adapter/` and the adapter
  checkout. Meetings themselves hold no persistent data.
- **Multiple servers.** In distributed setups the HAProxy/nginx front end
  must route `/meet`, `/colibri-ws` and the WebSocket upgrade to the Meet
  node; see the examples in [Architecture](/admin/architecture/).
- **Own TURN server.** Re-run `grommunio-meet-setup` with `TURN_HOST` and
  `TURN_SECRET` to switch from the managed relay to your coturn; the
  settings land in the `external_services` block of the Prosody host
  configuration.

## Related pages

- [Meet in grommunio Web](/web/meet/) - enabling the plugin, Meet tab, calendar links
- [Troubleshooting Meet, Audio/Video](/kb/meet_av/) - client-side device and browser permission problems
- [Single sign-on with Keycloak](/guides/sso-keycloak/) - grommunio-auth/Keycloak setup used in Phase B
- [Administration](/admin/administration/) - per-user Meet permission
- [Operations](/admin/operations/) - updates, certificates, backup
- [Architecture](/admin/architecture/) - HAProxy/nginx routing of `/meet` and `/colibri-ws` in multi-server setups
- [Chat](/guides/chat/) and [Files and Office](/guides/files-office/) - the other collaboration components
