---
title: "event_proxy(4gx)"
description: "event_proxy — Event sender"
sidebar:
  order: 50
---

## Name

event_proxy — Event sender

## Description

event_proxy connects to the [event(8gx)](/man/event-8gx/) daemon and sets itself up so as to be able to send notifications.

event_proxy installs three service functions, "broadcast_event", "broadcast_select" and "broadcast_unselect", though the latter two are just convenience functions for broadcast_event. broadcast_event is for synchronously sending a notification into the event distribution system. Arbitrary notifications and commands can be sent this way. The return value (i.e. in the eventd network protocol) is ignored.

In practice, [midb(8gx)](/man/midb-8gx/), [imap(8gx)](/man/imap-8gx/) and [pop3(8gx)](/man/pop3-8gx/) issue FOLDER-TOUCH notifications. Only [imap(8gx)](/man/imap-8gx/) issues MESSAGE-FLAG and MESSAGE-EXPUNGE notifications.

## See also

<strong>event</strong>(8gx), <strong>event_stub</strong>(4gx)
