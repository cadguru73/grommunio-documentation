---
title: "kdb-uidextract-limited(8)"
description: "<strong>kdb-uidextract-limited</strong> — Helper for creating a gromox-kdb2mt ACL map"
sidebar:
  order: 50
---

## Name

<strong>kdb-uidextract-limited</strong> — Helper for creating a gromox-kdb2mt ACL map

## Synopsis

<dfn class="gx-param">perl /usr/libexec/gromox/kdb-uidextract-limited</dfn>

## Description

kdb-uidextract-limited is a Perl script utilizing just the Kopano command line interface of the kopano-admin(8) and kopano-stats(8) programs to read user object descriptions off a Kopano installation and produce an ACL map for use with the gromox-kdb2mt --user-map option.

This script is meant to be executed on a Kopano system and does not rely on Gromox at all.

Unlike kdb-uidextract, kdb-uidextract-limited also does not rely on the presence of python-kopano bindings (e.g. for when installing those is considered infeasible). However, kdb-uidextract-limited can only evaluate the host it is executed on and has no automatic multi-server capability. This is because kopano-stats(8) never loads a TLS certificate needed to make the -h option work. To produce a complete map, you need to manually execute kdb-uidextract-limited on all Kopano server instances in a cluster and then join the results in accordance with the JSON syntax, e.g. by use of jq(1).

kopano-server need not be set up for TLS.

The resulting map for kdb2mt is printed to stdout.

## Options

This program offers no command-line options.

## See also

<strong>gromox</strong>(7), <strong>gromox-kdb2mt</strong>(8), <strong>kdb-uidextract</strong>(8)
