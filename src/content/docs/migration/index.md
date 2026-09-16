---
title: "grommunio Migration Docs"
description: "grommunio is a comprehensive communication and collaboration solution that includes e-mail, calendaring, contacts, tasks, notes, video meetings, chat an…"
sidebar:
  label: "Overview"
  order: 0
---

grommunio is a comprehensive communication and collaboration solution that includes e-mail, calendaring, contacts, tasks, notes, video meetings, chat and file management.

## Audience

This document is for administrators working with grommunio. It helps them to execute migrations from various sources to grommunio. This document is primarily focused on the migration in the sense of data migration from other sources, rather than migration in terms of configuration.

## Choose a migration path

| Source | Recommended path | What moves |
| --- | --- | --- |
| Microsoft Exchange / Outlook (PST, EDB) | [Exchange migration](/migration/ms_exchange/) — `gromox-pff2mt`, `exchange2grommunio.ps1` | Mail, calendar, contacts, tasks, notes, folder structure |
| Kopano / Zarafa | [Kopano migration](/migration/kopano/) — `gromox-kdb2mt` | Complete mailboxes including MAPI properties |
| Any IMAP server (Dovecot, Cyrus, hosted mailboxes) | [IMAP migration with imapsync](/migration/imap/) | Mail and folders with flags; no calendar or contacts |
| Individual files (EML, ICS, VCF) | [Generic migration](/migration/generic/) — `gromox-eml2mt`, `gromox-ical2mt`, `gromox-vcf2mt` | Single items or exports |

Whichever path you take, create the target domains and mailboxes first (see
[Administration](/admin/administration/) or the [grommunio-admin CLI](/cli/)),
and plan a final delta run after the DNS/MX switch so that nothing received
during the cut-over is lost.

## Offline reading

This section is also available to download for offline use:

- [Download as PDF](/pdf/grommunio-migration.pdf)
- [Download as EPUB](/epub/grommunio-migration.epub)
