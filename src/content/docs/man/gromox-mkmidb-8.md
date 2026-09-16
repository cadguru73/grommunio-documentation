---
title: "gromox-mkmidb(8)"
description: "gromox-mkmidb — Tool for creating a blank message index database"
sidebar:
  order: 50
---

## Name

gromox-mkmidb — Tool for creating a blank message index database

## Synopsis

<strong>gromox-mkmidb</strong> \[<strong>-Uv</strong>\] \[<strong>-c</strong> <em>config</em>\] \[<strong>-fP</strong>\] <em>username</em>

## Description

mkmidb is used to generate the midb.sqlite3 file for a private or public store, which is used by [midb(8gx)](/man/midb-8gx/) to keep additional IMAP/POP3-specific state about the mailbox and its contents. mkmidb directly operates on the filesystem, which has implications. First, the program ought to be executed on the correct homeserver in case a multi-server Gromox installation is used. Second, there is no coordination with [midb(8gx)](/man/midb-8gx/), and midb might continue using file descriptors opened earlier, working with the old copy of the mailbox, or get confused because e.g. a WAL file no longer matches the sqlite db. Ideally, you would use something like `gromox-mbop -u ... midb-unload` to make midb close the mailbox before resetting it.

## Options

<dfn class="gx-param">-U</dfn>  
Rather than creating the SQLite file, upgrade it. (The -f option has no effect.) mkmidb does not coordinate with [midb(8gx)](/man/midb-8gx/) and data corruption is possible if both try to edit the file at the same time. You should let [midb(8gx)](/man/midb-8gx/) do upgrades instead, via the "midb_schema_upgrades" directive, or at the very least, stop midb when using mkmidb -U.

<dfn class="gx-param">-c</dfn> <em>config</em>  
Read configuration directives from the given file. If this option is not specified, /etc/gromox/mysql_adaptor.cfg will be read for MySQL connection parameters if that file exists.

<dfn class="gx-param">-f</dfn>  
Force overwrite when an existing SQLite database is detected for the user. By default, mkmidb will not touch midb.sqlite3.

<dfn class="gx-param">-v</dfn>  
Turn on verbose mode for -U.

<dfn class="gx-param">--create-old</dfn>  
Create blank initial database using version 0. (This can be used for testing the upgrade procedure.)

<dfn class="gx-param">--integrity</dfn>  
Perform SQLite integrity check, either standalone or, if -U is also given, as part of an upgrade.

<dfn class="gx-param">-?</dfn>  
Display option summary.

## Files

- <em>/var/lib/gromox/...</em>/exmdb/midb.sqlite3: Message index database for IMAP.

## See also

<strong>gromox</strong>(7), <strong>gromox-mkprivate</strong>(8), <strong>midb</strong>(8gx), <strong>mysql_adaptor</strong>(4gx)
