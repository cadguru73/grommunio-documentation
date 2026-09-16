---
title: "Generic Migration"
description: "This chapter covers overall migration to grommunio with generic and standardized protocols. These instructions are intentionally named generic, as these…"
sidebar:
  order: 30
---

This chapter covers overall migration to grommunio with generic and standardized protocols. These instructions are intentionally named `generic`, as these migration scenarios apply to multiple providers, installations and other communication software installations.

## Individual emails

With the [gromox-eml2mt](/man/gromox-eml2mt-8/), gromox-ical2mt, gromox-vcf2mt and [gromox-mt2exm](/man/gromox-mt2exm-8/) command-line utilities, grommunio has utilities with which individual emails, calendars or contact card files can be read and imported. Tend to the linked manual pages to read about the invocation syntax.

## Migration via IMAP

Mailboxes on any IMAP-capable server can be transferred to grommunio over IMAP. For a handful of accounts this can be done interactively with a mail client such as Thunderbird or Alpine that has both the source account and the grommunio account configured, by moving the folders across. For anything larger, use the *imapsync* command-line tool, which is packaged for the grommunio Appliance and supports repeatable initial and delta syncs, folder mapping and bulk runs; the full procedure, including target preparation, cutover planning and troubleshooting, is described in [IMAP migration with imapsync](/migration/imap/). IMAP carries mail only; calendars, contacts and tasks need the `gromox-*2mt` tools above or a PST-based import.
