---
title: "Chat"
description: "Enable and use the grommunio Web Chat plugin for real-time messaging with teams, channels, and direct messages."
sidebar:
  order: 80
---

Grommunio also offers a **Chat** feature to make communication easier.

The **Chat** feature in grommunio Web provides real-time messaging and collaboration directly within the web interface.

## Prerequisites

- grommunio Web is installed and accessible
- Initial system setup has been completed
- Administrator credentials are available

## Enabling the Chat Feature

1. Log in to **grommunio Web**.
2. Navigate to **Settings**.
3. Open the *Plugins* section.
4. Enable the plugin by checking the **Chat** checkbox.
5. Click **Apply** to save the configuration.
6. Reload the grommunio Web interface.

After reloading, the **Chat** entry appears in the *Main Interface Area*.

## First-Time Chat Access and Initialization

![grommunio Web Chat tab showing the "Log in to your account" prompt for the chat system](/img/web/web-p095-1.png)

1. Click on **Chat** in the *Main Interface Area*.
2. A new **Chat tab** opens, displaying the login prompt.
3. Log in using the administrator credentials that were created during the initial system setup.

:::note
These credentials are required for the initial configuration of the chat system.
:::

## Team Creation

After the first successful login:

1. Create a **Team** when prompted.
   - The team represents an organizational unit within the chat system.
2. Once the team is created, proceed to manage team members.

## Inviting Users

1. Within the team interface, click **+ Invite Members**.
2. Copy the generated **invitation link**.
3. Share the link with users:
   - Paste it into a browser, or
   - Send it directly to users (e.g., via email).

The invitation link directs the user to the **Account Creation** page.

![Chat account creation page where an invited user enters their email address, username, and password to create a grommunio chat account](/img/web/web-p096-1.png)

## User Management and Roles

After a user has created their account:

1. The administrator can add the user to the team.
2. Assign one of the following roles:
   - **Team Member**
   - **Team Admin**

Once assigned, the user can:

- Log in successfully to the Chat feature
- Access and participate in the assigned team

## Further Info

You can either send private messages to individual users or post in channels where all members of the channel receive the message.

On the left-hand side, under Find Channels, you can search for existing channels. By clicking the plus (+) icon, you can add channels or even create a new channel yourself.

Further down on the left-hand side, under Direct Messages, you can use the plus (+) icon to search for people, or use Invite Members at the bottom to invite people to the chat.

In the chat itself, you also have the option to send attachments by selecting the paperclip icon. A new window will open where you can choose the file you want to send.

## See also

- [grommunio Chat: teams, channels and users](/guides/chat/) — server-side installation, Admin API provisioning of teams and users per domain, single sign-on and multi-tenancy. The plugin defaults (`PLUGIN_CHAT_USER_DEFAULT_ENABLE`, `PLUGIN_CHAT_AUTOSTART`, `PLUGIN_CHAT_URL`) live in `/etc/grommunio-web/config-chat.php`.

