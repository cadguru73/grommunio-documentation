---
title: "ddbg(1gx)"
description: "ddbg — MAPI data debugger"
sidebar:
  order: 50
---

## Name

ddbg — MAPI data debugger

## Synopsis

<strong>/usr/libexec/gromox/ddbg</strong> \[options...\] command \[args...\]

## Description

ddbg can be used to analyze various binary blobs. If no arguments are given, input is read from stdin. If arguments are given, they are treated as immediate values (i.e. content, never the name of a file to read).

## Options

<dfn class="gx-param">-p</dfn>, <strong>--pack</strong>  
Employ hex2bin before main action.

<dfn class="gx-param">-X</dfn>  
When converting RTF to HTML, transform images not into \<img\> tags with in-line image data using a `data:` URI, but into external references utilizing a `cid:` URI. ddbg will not emit the image in this case.

## Commands

<dfn class="gx-param">--bin2hex</dfn>  
Convert all bytes to hexnibble representation.

<dfn class="gx-param">--bin2txt</dfn>  
Convert all bytes to a textual representation. The environment variable BIN2TXT_MODE can be used to influence the output. Possible values are <strong>cstr</strong> (output as a C string literal without surrounding quotes), <strong>hex</strong> (hex nibbles like bin2hex), <strong>txt</strong> (custom compact encoding).

<dfn class="gx-param">-d</dfn>, <strong>--decode</strong>  
Try all decoders.

<dfn class="gx-param">-A</dfn>, <strong>--decode-action</strong>  
Decode rule action blob.

<dfn class="gx-param">-e</dfn>, <strong>--decode-entryid</strong>  
Decode entryid.

<dfn class="gx-param">--decode-guid</dfn>  
Lookup GUID.

<dfn class="gx-param">--decode-nttime</dfn>  
Decode an NT timestamp and show the equivalent Unix time and calendar-based date.

<dfn class="gx-param">--decode-restrict</dfn>  
Decode restriction blob (e.g. rule condition).

<dfn class="gx-param">--decode-unixtime</dfn>  
Decode an Unix timestamp and show the equivalent NT time and calendar-based date.

<dfn class="gx-param">--htmltortf</dfn>  
Convert a HTML document to RTF.

<dfn class="gx-param">--htmltotext</dfn>  
Convert a HTML document to plaintext.

<dfn class="gx-param">--lzxdec</dfn>  
Uncompress an lzxpress data stream.

<dfn class="gx-param">--lzxenc</dfn>  
Compress data stream with lzxpress.

<dfn class="gx-param">--qpdecode</dfn>  
Decode some Quoted-Printable text.

<dfn class="gx-param">--qpencode</dfn>  
Encode some text as Quoted-Printable (with line wrapping).

<dfn class="gx-param">--rtfcp</dfn>  
Convert RTF to the RTFCP format, particularly the uncompressed "MELA" subformat.

<dfn class="gx-param">--rtftohtml</dfn>  
Convert RTF to HTML.

<dfn class="gx-param">--texttohtml</dfn>  
Convert plaintext to HTML.

<dfn class="gx-param">--unrtfcp</dfn>  
Decompress RTFCP (either "MELA" or "LZFU") to RTF.

## Environment variables

GROMOX_HTMLTOPLAIN can be set to "chawan", "pandoc", "w3m", "internal" to pick one particular htmltoplain implementation. If unset or set to "auto", all of these converters are tried until a working one is found.

GROMOX_HTMLTORTF can be set to "pandoc" or "internal" to pick a particular htmltortf implementation. If unset or set to "auto", all of these converters are tried until a working one is found.

GROMOX_RTFTOHTML can be set to "pandoc", "internal" or "internal.asi" to pick a particular htmltortf implementation. If unset or set to "auto", all of these converters are tried until a working one is found.

## Examples

- ddbg -p --decode-guid 38a1bb1005e5101aa1bb08002b2a56c2

- ddbg --unrtfcp \<body.bin \>body.rtf

## See also

<strong>gromox</strong>(7)
