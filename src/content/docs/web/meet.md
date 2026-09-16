---
title: "Meet"
description: "Enable the Meet plugin to host browser-based video conferences and add Meet links to appointments and meetings in grommunio Web."
sidebar:
  order: 90
---

The Meet feature integrates grommunio Meet into grommunio Web and enables browser-based video conferences using generated or custom meeting URLs.

## Enabling the Meet Plugin

To activate the Meet feature:

1. Log in to **grommunio Web**.
2. Navigate to **Settings**.
3. Open the *Plugins* section.
4. Enable the plugin by selecting the **Meet** checkbox.
5. Click **Apply** to save the configuration.
6. Reload the grommunio Web interface.

After the reload, the Meet functionality becomes available to the user.

Once enabled, a new **Meet** entry appears in the *Shortcut Bar* of the grommunio Web interface.

## Meet Tab Functionality

Clicking the **Meet** entry in the *Shortcut Bar* opens the Meet tab.

![The Meet tab in grommunio Web with a field to enter a meeting name, a Start meeting button, and an empty recent meetings list](/img/web/web-p098-1.png)

The Meet tab provides the following functionality:

### Custom Meeting Creation

- Users can enter a **custom keyword** to create a meeting room.
- The keyword is appended to the Meet base URL to form a unique meeting link:

  `https://mail.domain/meet/<keyword>`
- The generated link can be shared with meeting participants.

### Recent Meetings List

The Meet tab also provides a list of **recent meetings**.

This list contains meetings that were previously joined or created by the user.

Recent meetings enable:

- Fast re-entry into recurring or frequently used meeting rooms
- Reuse of existing meeting links without creating a new keyword

Entries in the meetings list can be deleted manually by the user.

- Deleting an entry removes it from the list only
- The underlying meeting URL remains valid and can still be accessed if shared externally

## Adding a Meet Link to an Appointment or Meeting

Meet links can also be created directly from the calendar.

1. Create a new *Appointment* or *Meeting*.
2. Click **Add Meeting**.
3. grommunio Web automatically generates a Meet link.
4. The link is inserted into:
   - The **Location** field
   - The **Notes** field

![A Calendar meeting with the generated Meet link shown in the Location field and a one-click join link in the Notes field](/img/web/web-p099-1.png)

This allows invited participants to join the meeting with a single click.

:::note
When a calendar entry contains an existing meeting link, the **Join webmeeting** option becomes available. Selecting this option allows direct access to the associated online meeting without the need to manually copy or enter the link.
:::

## See also

- [grommunio Meet: video conferencing](/guides/meet/) — server-side installation with `grommunio-meet-setup`, network requirements (443/tcp and 10000/udp), optional single sign-on and the plugin defaults in `/etc/grommunio-web/config-meet.php` (`'enable' => true` switches the plugin on for every user).

