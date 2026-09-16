---
title: "gromox-dbop(8)"
description: "gromox-dbop — User database maintenance utility"
sidebar:
  order: 50
---

## Name

gromox-dbop — User database maintenance utility

## Synopsis

<strong>gromox-dbop \[-CU</strong>\] \[<strong>--create-old</strong>\] \[<strong>-c</strong> <em>mysql_adaptor.cfg</em>\]

## Options

<dfn class="gx-param">-C</dfn>  
Create the initial set of tables for the user information database (in MySQL).

<dfn class="gx-param">-U</dfn>  
Upgrade the schema of the user information database. The database (MYSQL_DBNAME) should exist and be blank.

<dfn class="gx-param">--create-old</dfn>  
Create blank initial database using version 0. (This can be used for testing the upgrade procedure.)

<dfn class="gx-param">-c</dfn> <em>mysql_adaptor.cfg</em>  
Path to a configuration file that defines MYSQL_HOST, MYSQL_USERNAME, etc. If omitted, gromox-dbop will read /etc/gromox/http.cfg to locate mysql_adaptor.cfg to locate the mysql parameter.

## See also

<strong>gromox</strong>(7), <strong>mysql_adaptor</strong>(4gx)
