---
title: "Folders & Permissions"
description: "Understand the folder navigation area, folder options, and how to configure and share folder permissions in grommunio Web."
sidebar:
  order: 65
---

## Folder Navigation Area Structure

The Folder Navigation Area in grommunio Web displays all folders available to you in a hierarchical structure.

:::tip[Hint]
The **Show All** option must be selected.
:::

![Folder Navigation Area showing Favourites, the John Doe mailstore with its default subfolders, Public Folders, and the Open Shared Folders + button](/img/web/web-p064-1.png)

### Favourites

The first section contains the Favourites.

This section contains references (shortcuts) to folders that you have marked as favourites. Adding a folder to Favourites does not duplicate the folder; it only creates a reference for quick access.

### Mailstore (User Root Folder)

Below Favourites is your mailstore, which represents the root folder of the mailbox.

It contains the following default subfolders:

- Inbox
- Drafts
- Outbox
- Sent Items
- Deleted Items
- Junk Email
- Calendar
- Contacts
- To-Do List
- Tasks
- Notes
- Journal
- RSS-Feeds
- Sync Issues

These folders are created automatically and are used for storing different types of items such as emails, calendar entries, contacts, and tasks. They are system defaults and cannot be changed or deleted.

### Shared Folders

Below your mailstore, all added shared folders are displayed.

Shared folders belong to other users or resources and must be added manually.

:::note
If a user has store owner privileges for another user's mailbox, that mailbox will be integrated automatically due to grommunio's store hint function. Store owner privileges can be configured by administrators in the Admin UI.
:::

Shared folders can be added using the **Open Shared Folders +** button in the Folder Navigation Area (bottom).

### Public Folders

At the bottom of the Folder Navigation Area, the folder **Public Folder – &lt;domain&gt;** is displayed.

This folder contains public folders that are available to users within the same domain, depending on assigned permissions.

## Folder Options

The following options are available when interacting with a folder by right-clicking it in the folder tree. Available options may vary depending on the folder type and user permissions.

### Basic folder options

- **Open**
  Opens the selected folder and displays its contents in the main view.
- **Rename Folder**
  Allows changing the name of the selected folder.

  :::note
  Renaming of the root folder is only possible via the Admin-UI.
  :::

- **New Folder**
  Creates a new subfolder under the selected folder.
  The new folder inherits permissions from its parent folder by default.
- **Restore items**
  Restores items that were previously deleted from this folder, if applicable.
  This option is typically available for folders that support item recovery.
- **Add to Favorites**
  Adds the selected folder to the Favorites section for quick access.
  Favorites are displayed at the top of the folder tree.
- **Share folder …**
  Allows sharing the folder with other users and defining their access permissions, such as read-only or read/write access.
- **Properties**
  Displays detailed information about the selected folder, including Location, Items, Object ID, Folder Size, and Permissions.

  Selecting the **Folder size…** button displays additional information about all subfolders, including their individual storage usage and overall size distribution.

In addition to the basic folder options, the following options are available for specific folder types:

### Root Folder

- **Reload**
  Refreshes the folder tree and reloads the folder contents to ensure that the most recent changes are displayed.

### Mail Folder

- **Mark All Messages Read**
  Marks all messages in the selected folder as read.
  This action applies only to the current folder and does not affect subfolders.
- **Empty folder**
  Permanently deletes all messages in the selected folder.
  Depending on system configuration, deleted messages may be moved to the Deleted Items folder or removed immediately.
- **Import emails**
  Imports email messages in **EML** format into the selected folder.

### Calendar Folder

- **Select color**
  Assigns a color to the selected calendar.
  The color is used to visually distinguish calendar entries in calendar views and overlays.
- **Import appointments**
  Imports calendar entries in **iCalendar** (`.ics`) or **vCalendar** (`.vcs`) format into the selected calendar.

### Contact Folder

- **Import contacts**
  Imports contact entries into the selected contact folder from an external file.
  Supported formats include **vCard** (`.vcf`).

### Shared Root Folder

The options available in a shared root folder depend on the user's permissions. Users with higher rights see more options, while users with limited rights only see actions they are authorized to perform. However, the **Close store** option is always available, regardless of the user's permissions.

- **Close store**
  Closes the shared mailbox or folder store and removes it from the folder tree.
  This action does not delete the shared data and can be reversed by reopening the shared store.

:::caution[Attention]
Same applies for shared subfolders: Most options may vary depending on user permissions and rights.
:::

## Permissions

This dialog enables the configuration of access rights for different users or groups on the selected folder.

![Permissions tab of the folder properties dialog, showing the user/group list with default and anonymous entries, the Profile dropdown, and the Read, Write, Delete items, and Other permission categories](/img/web/web-p067-1.png)

### Users and Profiles

- **User/Group List**
  Displays users or groups with assigned permissions for the folder.
  - *default*: Applies to all users unless explicitly overridden.
  - *anonymous*: Applies to unauthenticated users.
- **Add / Remove Buttons**
  Used to add new users or groups for permission assignment or to remove existing entries.
- **Profile Dropdown**
  Allows selection of predefined permission profiles for rapid application of standard permission sets.

### Permission Categories

- **Read**
  Determines the level of access granted to read folder contents.
  - **None:** No permission to view folder contents.
  - **Full Details:** Permission to read full details of items, including content and metadata.
- **Write**
  Defines rights to create or modify items within the folder.
  - **Create items:** Permission to create new items such as emails or calendar events.
  - **Create subfolders:** Permission to create subfolders within the current folder.
  - **Edit own:** Permission to edit items created by the user.
  - **Edit all:** Permission to edit all items within the folder, regardless of creator.
- **Delete Items**
  Specifies deletion rights for folder items.
  - **None:** No permission to delete items.
  - **Own:** Permission to delete items created by the user.
  - **All:** Permission to delete any item in the folder.
- **Other**
  Additional folder-related permissions:
  - **Folder owner:** Designates the user as owner of the folder, typically granting full control.
  - **Folder contact:** Assigns the user as a contact for the folder, often for administrative purposes.
  - **Folder visible:** Allows visibility to the folder.

### Recursive Application

- **Apply (copy) changed permissions recursively**
  When selected, applies the configured permissions to the current folder and all subfolders recursively.

### Actions

- **Ok**
  Saves changes and closes the dialog.
- **Cancel**
  Discards changes and closes the dialog.

## Share a Folder Successfully

1. **Select Root Mailstore**

   Begin by selecting the root mailstore in the folder tree. Permissions must be configured at the root level before sharing individual folders.

2. **Open Permissions Dialog**

   There are multiple ways to open the Permissions dialog:

   - Right-click the folder and select **Share folder**.
   - Open the folder's **Properties** and navigate to the **Permissions** tab.

3. **Configure Permissions**

   In the Permissions dialog:

   - Add **Folder visible** for the users or groups intended to have access to the folder.
   - Click **OK** to save and close the dialog.

4. **Share Specific Folder**

   After setting permissions at the root, select the specific folder to be shared and open its **Permissions dialog**. Add **Folder visible** and assign the required rights.

:::caution[Attention]
If the folder you want to share is a subfolder, ensure all parent folders above it also have **Folder visible** permissions for the intended users. Without this, users may not be able to access the shared subfolder even if its permissions are set correctly. **Exception:** Standard folders such as Inbox, Calendar, etc., can be opened regardless of root rights.
:::

## Permission Matrix

| Profile | Read None | Read Full Details | Create items | Create subfolders | Edit Own | Edit All | Delete None | Delete Own | Delete All | Folder owner | Folder contact | Folder visible |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| Owner | | x | x | x | x | x | | | x | x | x | x |
| Publishing Editor | | x | x | x | x | x | | | x | | | x |
| Editor | | x | x | | x | x | | | x | | | x |
| Publishing Author | | x | x | x | x | | | x | | | | x |
| Author | | x | x | | x | | | x | | | | x |
| Nonediting Author | | x | x | | | | | x | | | | x |
| Reviewer | | x | | | | | x | | | | | x |
| Contributor | x | | x | | | | x | | | | | x |
| None | x | | | | | | x | | | | | |
| Custom | o | o | o | o | o | o | o | o | o | o | o | o |
