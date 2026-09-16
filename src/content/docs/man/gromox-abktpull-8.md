---
title: "gromox-abktpull(8)"
description: "gromox-abktpull — Utility to extract ABKT templates from LDIF"
sidebar:
  order: 50
---

## Name

gromox-abktpull — Utility to extract ABKT templates from LDIF

## Synopsis

<strong>ldapsearch</strong> <em>...</em> <strong>\| gromox-abktpull</strong>

## Description

gromox-abktpull reads LDIF from standard input and extracts the values from attributes matching /DisplayTable/ — i.e. generally originalDisplayTable, originalDisplayTableMSDOS, addressEntryDisplayTable and addressEntryDisplayTableMSDOS — and saves them in separate files in the current working directory.

## Normative references

- RFC 2849: LDAP Data Interchange Format

## See also

<strong>gromox</strong>(7), <strong>gromox-abktconv</strong>(8gx)
