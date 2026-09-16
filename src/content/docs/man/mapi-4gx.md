---
title: "mapi(4gx)"
description: "mapi.so — PHP module providing MAPI functions"
sidebar:
  order: 50
---

## Name

mapi.so — PHP module providing MAPI functions

## Description

mapi.so is a PHP module that makes available a number of functions to PHP for connecting to Gromox services. In particular, the PHP module will regularly invoke RPCs to [zcore(8gx)](/man/zcore-8gx/).

## Configuration

The PHP ini fragment, mapi.ini, may look like this:

    extension=mapi.so
    [mapi]
    zcore_socket=/run/gromox/zcore.sock

## See also

<strong>gromox</strong>(7), <strong>zcore</strong>(8gx)
