---
title: "grommunio-admin shell"
description: "grommunio-admin shell — Start interactive shell"
sidebar:
  label: "shell"
  order: 10
---

### Name

grommunio-admin shell — Start interactive shell

### Synopsis

<strong>grommunio-admin shell</strong> \[<em>-d</em>\] \[<em>-n</em>\] \[<em>-x</em>\]

### Description

The interactive shell mode allows execution of multiple (new line separated) commands in a single session. Command syntax is identical to the CLI arguments, with addition of the <em>exit</em> command which ends the interactive shell.

If possible, typed history will be saved in <em>~/.grommunio-admin.history</em>.

### Options

`-d`, `--debug`  
Enable more verbose debug output

`-n`, `--no-history`  
Disable loading/saving of the typed history

`-x`, `--exit`  
Exit immediately if a command results in a non-zero exit code

### See Also

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-connect</strong>(1)
