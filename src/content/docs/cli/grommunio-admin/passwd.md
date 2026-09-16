---
title: "grommunio-admin passwd"
description: "grommunio-admin passwd — Set user password"
sidebar:
  label: "passwd"
  order: 10
---

### Name

grommunio-admin passwd — Set user password

### Synopsis

<strong>grommunio-admin passwd</strong> \[<em>-a</em>\] \[<em>-l LENGTH</em>\] \[<em>-p PASSWORD</em>\] \[<em>USER</em>\]

### Description

Set user password.  
If no user is specified, the password is set for the <em>admin</em> user, which is created automatically if necessary.  
If neither <em>-a</em> nor <em>-p</em> is provided, the user is prompted for a password.

### Options

`USER`  
User to set password for (default <em>admin</em>)

`-a`, `--auto`  
Automatically generate a password

`-l LENGTH`, `--length LENGTH`  
Length of the automatically generated password (default 16)

`-p PASSWORD`, `--password PASSWORD`  
Password to set (do not prompt)

### See Also

<strong>grommunio-admin</strong>(1), <strong>grommunio-admin-user</strong>(1)
