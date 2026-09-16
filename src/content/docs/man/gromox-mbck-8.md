---
title: "gromox-mbck(8)"
description: "<strong>gromox-mbck</strong> — Mailbox check and repair utility"
sidebar:
  order: 50
---

## Name

<strong>gromox-mbck</strong> — Mailbox check and repair utility

## Synopsis

<strong>gromox-mbck</strong> \[<strong>-p</strong>\] x.sqlite

## Description

mbck can be used to check one or more mailboxes for problems, and optionally repairing them.

mbck directly operates on the filesystem, which is not ideal, but it is believed it is "mostly fine":

It is technically safe to run gromox-mbck while gromox-http has a mailbox open, provided Gromox is version \>= 2.30. HOWEVER, gromox-http (still as of Gromox 2.36) does not anticipate databases being write-locked by another process for undue amounts of time (gromox.cfg:sqlite_busy_timeout), and signals an operational error to the caller. For example, mail cannot be delivered to the mailbox while mbck is running in repair/write mode.

## Options

<dfn class="gx-param">-p</dfn>  
Perform repairs / write operations. (Default: just readonly checks)

<dfn class="gx-param">-?</dfn>  
Display option summary.
