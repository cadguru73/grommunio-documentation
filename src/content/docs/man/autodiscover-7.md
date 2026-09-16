---
title: "autodiscover(7)"
description: "autodiscover — AutoDiscover protocols"
sidebar:
  order: 50
---

## Name

autodiscover — AutoDiscover protocols

## Description

AutoDiscover is a HTTP-based discovery protocol, originally introduced for Exchange 2007, that helps users configure their email client settings automatically. The MS-OXDSCLI specification speaks about locating such AutoDiscover service, the MS-OXDISCO specification speaks about the XML exchange between such a service and a client. These terms are herein used to avoid ambiguity in the "AD" acronym (ActiveDirectory).

Autodiscover V2 is not an improved version, it is an extra layer that warrants a disgruntled remark about questionable protocol design. Locating the AutoDiscover server still happens via DNS or AD-SCP (Service Connection Points in Active Directory) query. The V2 request contains the user identity and the name of a next-level protocol that the client seeks, e.g. "ActiveSync", "EWS" or "AutoDiscoverV1". The response is now a JSON document and generally contains just one URL, namely for the service sought. Indeed there is no way to obtain MAPI, IMAP or SMTP information in Autodiscover V2.

Note that Autodiscover is not used exclusively by Microsoft Outlook, Autodiscover is the main discovery protocol for any EAS-enabled device and application, such as Apple iOS, Android and other applications.

## OXDSCLI summary

The MS-OXDSCLI document is about how clients can collect one or more AutoDiscover URLs/endpoints that, in a second step (OXDISCO), they can make HTTP POST requests to to retrieve server configuration. Behaviors that have been specified in MS-OXDSCLI or have been observed in practice:

- Using an URL from a previous successful run.

- Performing a DNS TXT lookup on the domain name to check for the presence of a Microsoft 365 account identifier and, if found, using the URL \<<strong>https://outlook.office365.com/autodiscover/autodiscover.xml</strong>\>.

- When joined to an NT Domain/ActiveDirectory, performing an LDAP lookup for service connection points (SCP), i.e. objects matching `(&(objectClass=serviceConnectionPoint) (serviceClassName=ms-Exchange-AutoDiscover-Service))`, and using the URLs obtained from "serviceBindingInformation" attributes.

- "Root domain" method: Constructing a string based on the user's e-mail address (e.g. u@example.com), \<<strong>https://</strong><em>example.com</em><strong>/autodiscover/autodiscover.xml</strong>\>.

- "AutoDiscover domain" method: Constructing a string based on the user identity, \<<strong>https://autodiscover.</strong><em>example.com</em><strong>/autodiscover/autodiscover.xml</strong>\>.

- Performing a DNS lookup of the name <strong>\_autodiscover.\_tcp.</strong><em>domain</em> of record type SRV, and from the response data, constructing the string <strong>https://</strong><em>rdata</em>\[<strong>:</strong><em>port</em>\]<strong>/autodiscover/autodiscover.xml</strong>.

- Utilizing an unspecified "local mechanism" method. (might be the same as using lastrun URL?)

- "Redirect" method: Performing an unauthenticated HTTP GET request to \<<strong>http://autodiscover.</strong><em>domain</em><strong>/autodiscover/autodiscover.xml</strong>, and upon receiving a HTTP 302 response, using the URL in the "Location:" response header for AutoDiscover.

Gromox recommends that administrators employ the AutoDiscover Domain method, i.e. add a <strong>autodiscover.</strong><em>domain.com</em> entry to their DNS zones. This is beneficial over the root domain method, because the host serving up e.g. a company's website need not be taught about autodiscover paths. For <strong>autodiscover.</strong><em>domain.com</em>, either an AAAA/A pair <strong>or</strong> CNAME resource record can be used. Split-horizon DNS systems <strong>must</strong> publish the autodiscover DNS record(s) in the publicly visible set. The AutoDiscover URL must equally be reachable from any network segment where access is expected from — if need be, set up HTTP reverse proxies.

## OXDISCO summary

The MS-OXDISCO document specifies what clients should do once they have an URL collection obtained from the OXDSCLI mechanism(s).

When a user sets up a new email account or changes their existing email client settings, the email client sends an authenticated HTTP POST request to an Autodiscover URL and conveying the user's email address in the request body. The server then responds with an XML document that contains the necessary configuration settings.

The response contains information such as

- the list of supported mail protocols and transports (e.g. MSRPC/RPCH/MAPIHTTP, IMAP, SMTP, etc.)

- the connection parameters for those (e.g. name of the home server, HTTP endpoint URLs)

- for MAPI, any extra mailboxes that should be opened unconditionally (e.g. delegators, public folder)

The email client uses this information to configure the user's email account automatically.

## gromox-dscli notes

The [gromox-dscli(8)](/man/gromox-dscli-8/) utility can be used to diagnose problems with AutoDiscover from a command line prompt.

gromox-dscli performs the following probes and in this order: RootDomain, AutoDiscoverDomain, SRV.

## Outlook notes

When Outlook is running, there is an Outlook icon in the Windows taskbar's notification area. By pressing Ctrl+RightMouseBtn, a service menu can be brought up, which offers a "Test AutoDiscover" command for diagnosing problems from Windows. Known bugs: The dialog may ignore the contents of the password field and instead use a saved password or SSO, leading to potentially unanticipated authentication successes or failures. If in doubt, use gromox-dscli.

When an AutoDiscover response contains broken information (e.g. unreachable endpoints due to a faulty oxdisco_exonym setting on the server), Outlook may refuse to open mailboxes and the application may exit prematurely. AutoDiscover responses are cached on disk under `%LOCALAPPDATA%/Microsoft/Outlook/* - Autodiscover.xml` and/or `%LOCALAPPDATA%/Microsoft/Outlook/16/AutoD.*.xml` and can be deleted/diagnosed as needed.

Outlook performs the following probes in this primary order: TXT, LDAP-SCP, RootDomain, AutoDiscoverDomain, SRV, Local, Redirect. Secondary order that was observed: TXT, LDAP-SCP, RootDomain, AutoDiscoverDomain, Local, Redirect, SRV.

Individual probes can be disabled via Windows Registry in

- HKEY_CURRENT_USER\Software\Microsoft\Office\16.0\Outlook\AutoDiscover

and/or

- HKEY_CURRENT_USER\Software\Policies\Microsoft\Office\16.0\Outlook\AutoDiscover,

by setting one or more of

- ExcludeLastKnownGoodURL=DWORD:1

- ExcludeExplicitO365Endpoint=DWORD:1

- EnableOffice365ConfigService=DWORD:0

- ExcludeScpLookup=DWORD:1

- ExcludeHttpsRootDomain=DWORD:1

- ExcludeHttpsAutoDiscoverDomain=DWORD:1

- ExcludeSrvRecord=DWORD:1

- ExcludeHttpRedirect=DWORD:1

as desired. For the Group Policy editor, ADMX template and ADML language packs are available from <https://www.microsoft.com/en-us/download/details.aspx?id=49030>.

When a DNS zone is M365-enabled, Outlook opens a mini browser window for authenticating with M365. To prevent this, you can set ExcludeExplicitO365Endpoint=1 as described.

Outlook stops probing after the first successful AutoDiscover HTTP POST request. A non-responsive AutoDiscovery server (firewall DROP policy, or TCP RST) is treated the same as a 404 Not Found response.

Known bugs: Outlook ignores the port number in the DNS SRV response. Outlook and/or the Windows HTTP libraries also erroneously show a warning popup whenever the hostname in the SRV result does not match the e-mail domain (even under MS Exchange). Redirection is the key idea of an SRV record and, as far as security considerations go, is no more significant than following a CNAME-typed autodiscover.example.com record.

Outlook re-runs AutoDiscover periodically in the background. This can cause popups such as re-authentication or SRV warnings (particularly after a temporary outage).

## Testing scenarios

To force using a particular Autodiscover server in Windows, such as when Gromox is run in a development environment with a fake domain, c:\windows\system32\drivers\etc\hosts can be populated with a static entry for <strong>autodiscover.</strong><em>example.com</em> to get that particular scenario working.

## See also

<strong>gromox</strong>(7), <strong>autoconfig</strong>(7), <strong>autodiscover</strong>(4gx)
