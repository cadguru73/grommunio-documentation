---
title: "gromox-abktconv(8)"
description: "gromox-abktconv — Utility for converting between ABKT and JSON"
sidebar:
  order: 50
---

## Name

gromox-abktconv — Utility for converting between ABKT and JSON

## Synopsis

<strong>gromox-abktconv</strong> {<strong>-b</strong>\|<strong>-j</strong>} \[<strong>-gw?</strong>\] \[<strong>-c</strong> <em>cpid</em>\]

## Description

gromox-abktconv can be used to convert between data streams as specified in MS-OXOABKT and a textual representation. It reads and writes to standard input and output, respectively.

## Options

<dfn class="gx-param">-b</dfn>  
Produce type-1 ABKT from JSON.

<dfn class="gx-param">-c</dfn> <em>cpid</em>  
When converting to ABKT (-b), convert strings to the given codepage and emit them as 8-bit strings.

<dfn class="gx-param">-g</dfn>  
When converting to ABKT (-b), emit extraneous gaps in the data stream to mimic what Exchange would do. Without -g, the ABKT stream will have no unnecessary gaps.

<dfn class="gx-param">-j</dfn>  
Produce JSON from ABKT type-1 or type-2.

<dfn class="gx-param">-w</dfn>  
When converting to ABKT (-b), emit strings in UTF-16 form. This is the default.

<dfn class="gx-param">-?</dfn>  
Display option summary.

## Normative references

- MS-OXOABKT: Address Book User Interface Templates Protocol

- oxoabkt.rst: Type-2 ABKT template protocol

## See also

<strong>gromox</strong>(7), <strong>gromox-abktpull</strong>(8gx)
