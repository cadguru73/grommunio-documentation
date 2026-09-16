---
title: "authtry(8gx)"
description: "<strong>authtry</strong> — Diagnostic utility for debugging authentication"
sidebar:
  order: 50
---

## Name

<strong>authtry</strong> — Diagnostic utility for debugging authentication

## Synopsis

<strong>PASS='</strong><em>xyz!</em><strong>' /usr/libexec/gromox/authtry -u</strong> <em>abc@example.com</em>

<strong>PASS='</strong><em>xyz!</em><strong>' /usr/libexec/gromox/authtry -L</strong> \[<strong>-Z</strong>\] \[<strong>-H</strong> <em>ldap://localhost/</em>\] <strong>-u</strong> <em>cn=abc,o=example</em>

## Description

<strong>authtry</strong> can be used to debug the user authentication procedure without having to use gdb to attach to, and pause, a running daemon. The password is to be conveyed via an environment variable, PASS. Note that PASS being unset is distinct from PASS being the zero-length string; both modes are supported.

## Options

<dfn class="gx-param">-H</dfn> <em>uri</em>  
LDAP server to connect to, in URI form. If not specified, the libldap default is used.

<dfn class="gx-param">-L</dfn>  
Bypass the normal user lookup via [authmgr(4gx)](/man/authmgr-4gx/), bypass user metadata lookup in MySQL, and only perform an LDAP bind. In this sense, authtry is similar to ldapsearch(1), but without performing any search.

<dfn class="gx-param">-Z</dfn>  
Perform LDAP STARTTLS (only meaningful when combined with -L).

<dfn class="gx-param">-u</dfn> <em>username/dn</em>  
The Gromox username (usually <em>user@domain</em> form), or, in case -H is used, an LDAP Distinguished Name.

## See also

<strong>gromox</strong>(7)
