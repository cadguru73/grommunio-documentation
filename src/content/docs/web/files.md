---
title: "Files"
description: "Enable and configure the Files plugin to access and manage files from one or more accounts directly within grommunio Web."
sidebar:
  order: 100
---

The **Files** feature integrates grommunio Files into grommunio Web, allowing you to access and manage files from one or more accounts directly within the web interface.

## Enabling the Files Plugin

To activate the Files feature:

1. Log in to **grommunio Web** with administrative privileges.
2. Navigate to **Settings**.
3. Open the *Plugins* section.
4. Enable the plugin by selecting the **Files** checkbox.
5. Click **Apply** to save the configuration.
6. Reload the grommunio Web interface.

After the reload, the Files functionality becomes available.

Once enabled, a new **Files** entry appears in the *Main Interface Area* of grommunio Web.

## Initial Files Access

When you open the Files feature for the first time:

1. Click **Files** in the *Main Interface Area*.
2. The **Files tab** opens.

![The Files tab without any account configured, showing the message that no accounts have been added](/img/web/web-p101-1.png)

If no account is configured, the following message is displayed:

> *There are no accounts added. Go to settings, Files tab and add an account.*

This indicates that no account has been linked yet.

## Adding a Files Account

To add an account:

1. Open **Settings** in grommunio Web.
2. Navigate to the **Files** tab.
3. Add a new **account** by providing the required connection details.
4. Save the configuration.

![The Files tab in Settings with the Manage Accounts area for adding or removing Files accounts](/img/web/web-p102-1.png)

You may add **one or multiple accounts**.

## Result

![The Files tab displaying a connected account after configuration](/img/web/web-p102-2.png)

After at least one account is configured:

- The Files tab displays the connected account(s).
- You can access and manage files directly from grommunio Web.
- Multiple accounts can be used in parallel within the same interface.

## See also

- [grommunio Files and Office: file sync and online editing](/guides/files-office/) — server-side installation, connecting Files to the grommunio user base and to Office, and the grommunio Web plugin settings (`PLUGIN_FILES_USER_DEFAULT_ENABLE` explains why the plugin may already be enabled for everyone).

