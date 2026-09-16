---
title: "event_stub(4gx)"
description: "event_stub — Event receiver"
sidebar:
  order: 50
---

## Name

event_stub — Event receiver

## Description

event_stub connects to the [event(8gx)](/man/event-8gx/) daemon and sets itself up to receive notifications asynchronously with the help of an extra thread. (No notifications are sent towards [event(8gx)](/man/event-8gx/) by this component.)

event_stub installs one service function, "install_event_stub", with which [imap(8gx)](/man/imap-8gx/) registers a callback function that, in turn, is invoked whenever a notification is received from the event daemon.

In practice, imap handles FOLDER-TOUCH, MESSAGE-FLAG and MESSAGE-EXPUNGE notifications received through this event channel.

## See also

<strong>event</strong>(8gx), <strong>event_proxy</strong>(4gx)
