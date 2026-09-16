---
title: grommunio Desk
description: Install and use grommunio Desk, the native desktop client for Windows, macOS and Linux — with server profiles, system-tray background operation and OS-native notifications.
sidebar:
  label: grommunio Desk
  order: 20
---

**grommunio Desk** is the native desktop client for grommunio, available for
**Windows, macOS and Linux**. It gives you grommunio Web in a dedicated
application window — with desktop integration that a browser tab cannot offer:
system-tray background operation, OS-native notifications, and the ability to
manage several grommunio servers from one place.

:::tip[Same features as grommunio Web]
The desktop client renders the full grommunio Web interface, so everything in
the **[grommunio Web](/web/)** guide — Mail, Calendar, Contacts, Chat, Meet and
the rest — applies inside grommunio Desk as well. This page covers only what is
specific to the desktop application.
:::

## Installing

Download the installer for your platform from the grommunio download portal and
run it:

- **[grommunio.com/download](https://grommunio.com/download/)**

Builds are available for Windows, macOS and Linux. After installation, launch
**grommunio Desk** like any other application.

## First start — adding a server

On first launch, grommunio Desk shows a start page where you connect to your
grommunio server:

1. Choose **Add server** (also available later from the **Server** menu).
2. Enter the URL of your grommunio server, for example
   `https://mail.example.com`. The address is validated before it is saved.
3. Confirm. grommunio Desk loads the grommunio Web login for that server; sign
   in with your e-mail address and password.

Your server and session are stored locally, so the next start takes you straight
back in.

## Working with multiple servers

grommunio Desk can hold **several server profiles** at once — useful if you
access more than one grommunio environment (for example a work and a private
mailbox, or several customer systems):

- Add additional servers from the **Server** menu via **Add server**.
- Switch between connected servers from the title bar / **Server** menu.
- Remove a server you no longer need from the **Server** menu (you are asked to
  confirm).

## Application menus

The menu bar provides the usual desktop actions:

| Menu | Contents |
| --- | --- |
| **File** | Application-level actions and quitting grommunio Desk. |
| **Server** | Add, switch and remove server profiles; return to the start page. |
| **View** | Reload and zoom the current view. |
| **Help** | Product and version information. |

## Background operation & the tray icon

grommunio Desk keeps running in the background so you continue to receive
notifications after closing the window:

- Closing the window minimises the application to the **system tray** rather than
  quitting it.
- Use the tray icon's **Open App** entry to bring the window back to the front.
- To exit completely, quit from the **File** menu (or the tray menu).

## Notifications

grommunio Desk raises **OS-native notifications** (Windows, macOS and Linux) for
new mail and other events, so they appear in your operating system's normal
notification area even when the window is in the background. Make sure
notifications are allowed for grommunio Desk in your operating system settings.

## Default mail handler (mailto links)

grommunio Desk can act as your system's handler for `mailto:` links. When you
click an e-mail address in another application, grommunio Desk opens a new
message — asking which connected server to send from if you have more than one.

## Configuration & log files

Application data is stored per user in the OS configuration directory:

| Platform | Configuration | Logs |
| --- | --- | --- |
| **Linux** | `~/.config/grommunio Desk/config.json` | `~/.config/grommunio Desk/logs/` |
| **macOS** | `~/Library/Application Support/grommunio Desk/config.json` | `~/Library/Application Support/grommunio Desk/logs/` |
| **Windows** | `%APPDATA%\grommunio Desk\config.json` | `%APPDATA%\grommunio Desk\logs\` |

File logging is off by default and can be enabled in the configuration when
diagnosing a problem; when enabled, a `main.log` and a `renderer.log` are written
to the `logs` directory above.

:::note
grommunio Desk is open-source (AGPL-3.0). Source code and issue tracking live at
[github.com/grommunio/grommunio-desk](https://github.com/grommunio/grommunio-desk).
:::
