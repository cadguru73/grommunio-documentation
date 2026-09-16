---
title: "Introduction"
description: "An overview of grommunio Web, covering requirements, login, the Welcome Assistant, and the layout of the main interface."
sidebar:
  order: 10
---

grommunio Web is the web-based interface of the grommunio software suite. It combines a set of applications which allow easy usage for everyday users. grommunio Web can be accessed through a modern web browser and has all the important and daily usable tools like e-mail, calendar, contacts, notes & tasks, and integration with grommunio Meet and others.

Altogether, grommunio Web offers integrated advanced tools for teamwork and professional collaborations, such as chat and web meetings. Since grommunio Web is easy configurable, administrators and developers can create new plugins and integrate them into the interface at any time.

## Requirements

grommunio Web can be accessed from a modern web browser, including derivatives of Microsoft Edge, Google Chrome, Mozilla Firefox and Apple Safari. We recommend the use of recent versions for the best user experience.

## Login

### Accessing grommunio Web

![grommunio Web login page with username and password fields and the Sign in button](/img/web/web-p008-1.png)

To access grommunio Web, follow these steps:

1. Navigate to the link provided by your administrator with your browser. Traditionally, the link is something close to `https://example.com` or `https://mail.example.com/web`.
2. Enter your username and password.
3. Click on the "Sign in" button.

### Welcome Assistant

Upon your first login, you are greeted by the "Welcome Assistant" which allows configuring some general settings such as language, initial weekday and other settings. These settings can later be changed in the "Settings" configuration pane at any time.

![Welcome Assistant dialog showing account information and general calendar settings for a new user](/img/web/web-p009-1.png)

The following options are available:

#### 1. Account Information

**Profile Picture**
Allows the user to upload or change their profile image. Accepted formats include common image types (JPEG, GIF, PNG, BMP).

**Display Name**
The name that will appear to other users.

:::caution[Attention]
Can not be edited in grommunio Web! Only in Admin UI.
:::

**Email**
Displays the primary email address of the user. This field is not editable within grommunio Web.

**Language**
Sets the interface language for grommunio Web.

Example: `en_US – English`

Other server-provided languages may be available.

**Startup Folder**
Specifies which module loads first after login.

Options include:

- Mail
- Calendar
- Contacts
- Tasks
- Notes

**Theme**
Determines the visual theme of the interface.

Example: `Basic`

**Icons**
Selects the icon pack used by the user interface.

Options: `Breeze`, `Classic`

#### 2. General Calendar Settings

**First Day of the Week**
Sets the starting weekday for calendar views.

Common values: `Monday` or `Sunday`

**Start of Workday**
Defines the daily work start time for calendar scheduling.

Example: `09:00`

**End of Workday**
Defines the end of the workday.

Example: `17:00`

**Calendar Resolution**
Determines the time grid size for calendar slots.

Options: `5 minutes`, `6 minutes`, `10 minutes`, `15 minutes`, `30 minutes`, `1 hour`

**Default Appointment Duration**
Sets the default duration for new appointments.

Example: `30 minutes`

**Default Status for All-Day Appointments**
Controls the default availability status.

Possible values:

- Free
- Tentative
- Busy
- Out of Office

**Working Days**
Defines the days considered part of the regular work week.

Example: `Monday–Friday (Mo–Fr)`

#### Completion

After confirming all settings, the user proceeds into the full grommunio Web interface with the selected configuration applied.

## Overview

As soon as you have logged into grommunio Web, it presents an overview of your personal interface. By default, it will navigate to the mailbox overview, which, traditionally, is either empty, or pre-filled by data from a migration by your administrator.

![Main grommunio Web interface showing the menu bar, shortcut bar, folder navigation area and an empty inbox in the main content area](/img/web/web-p011-1.png)

The main overview of grommunio Web is organized as follows:

### Main Interface Area

The main interface area contains reference to the main application areas. By default, these are: Mail, Calendar, Tasks and Notes. On the top right, you find personal information, such as the indicator of the user you have logged in, Reminders, Settings, Help and Logout buttons.

![Top menu bar with the Mail, Calendar, Contacts, Tasks and Notes application areas and personal controls on the right](/img/web/web-p012-1.png)

### Shortcut Bar

![Shortcut Bar with buttons for new item, address book, refresh, print and layout](/img/web/web-p012-2.png)

The Shortcut Bar combines the main functions available in the application area you are currently in. It provides quick access to common actions such as:

- creating a new item
- opening the Address Book
- refreshing the view
- printing an email
- changing the layout

#### New Item Dropdown

Clicking the small arrow on the right side of the **New Item** button opens a dropdown menu where different types of items can be created. The available options are:

- **Email** – Create a new email message.
- **Appointment** – Schedule a new calendar appointment.
- **Meeting request** – Create and send a meeting invitation.
- **Contact** – Add a new contact to the address book.
- **Distribution list** – Create a new distribution group.
- **Task** – Create a new task.
- **Task request** – Assign a task to another user.
- **Sticky note** – Create a note item.

### Tab Bar

Below the Shortcut Bar is the **Tab Bar**.

![Tab Bar showing the pinned Inbox tab and a plus symbol for creating new items](/img/web/web-p012-3.png)

The Tab Bar displays all currently opened items as tabs, such as the Inbox, new emails, appointments, meeting requests etc.

The very first tab shows the folder you are currently in. It is always pinned and cannot be closed.

Any newly created item from the *New Item Dropdown* (for example: Email, Appointment, Meeting) appear here as additional tabs. In addition new items can also be created by clicking the + symbol at the end of the Tab Bar.

Temporary tabs are automatically removed when:

- an item is sent
- an item is saved
- user manually closes the tab
- user refreshes browser

This tabbed view allows quick switching between multiple items without losing context.

### Folder Navigation Area

With the **Folder Navigation Area**, you can see an overview of your personal folders, as well as any attached secondary mailboxes like public folders that are accessible to you. Depending on which module you are currently using (Mail, Calendar, Contacts, etc.), the **Folder Navigation Area** normally displays only the folders relevant to that module. For example, in the Mail module you will see your mail folders, while in the Calendar module only calendars are shown.

![Folder Navigation Area showing Favourites and a user mailbox with Inbox, Drafts, Outbox, Sent Items, Deleted Items, Junk Email and Public Folders](/img/web/web-p013-1.png)

#### Show All Option

The navigation area features a **Show All** checkbox. When checked, **Show All** displays *every folder associated with your mailbox*, regardless of the active module. This gives you a complete overview of all folders in one view.

:::note
A switch to a folder of a different type automatically switches to that application area. For example, selecting a calendar folder will automatically switch to the calendar application area and open the selected calendar.
:::

### Main Content Area

The **Main Content Area** displays the primary information of the application based on the currently selected module, folder, or context.

For example, when the **Inbox** folder is selected in the mail module, the main content area shows all emails contained in that inbox. When another folder, search result, or item type is selected, the displayed content updates accordingly.

![Main Content Area showing a message list on the left and a task request preview on the right](/img/web/web-p014-1.png)

In many areas of grommunio Web, a built-in *Search Function* is available. Search results are displayed directly in the main content area, replacing the standard folder view while the search is active.

All entries shown in the main content area support **sorting** by different criteria, such as from, subject, date, categories, status etc. Sorting options are typically available by clicking the column headers or using the provided sorting controls.

This dynamic behavior ensures that the main content area always reflects the current working context and provides quick access to relevant information.

### Data structure

Your primary groupware data is stored in a so-called "mailbox", or "mail store". This data contains major information such as your e-mails, calendar data, contacts, and so on. To have this managed well, the mailbox store is hierarchially organized with folders. By default, a store includes a set of default folders which also have various types. These are:

| Name          | Type     |
|---------------|----------|
| Inbox         | E-Mail   |
| Drafts        | E-Mail   |
| Sent Items    | E-Mail   |
| Deleted Items | E-Mail   |
| Tasks         | Tasks    |
| Calendar      | Calendar |
| Contacts      | Contacts |
| Junk E-Mail   | E-Mail   |
| Notes         | Notes    |
| Outbox        | E-Mail   |

### Search Function

The Search Tools panel enables the refinement and narrowing of search results when locating items such as emails, appointments, contacts, tasks, or notes.

![Search Tools panel with options for Folders, Show, Filter, Date, Search and Filter category](/img/web/web-p015-1.png)

#### Folders

- **Include subfolders**
  When selected, the search will include all subfolders within the currently selected folder.
  Example: Searching the Inbox will also search all Inbox subfolders.

#### Show…

These options define what type of items are included in the search results:

- **Mails**
  Includes email messages in the search results.
- **Appointments**
  Includes calendar items such as meetings and events.
- **Contacts**
  Includes contact entries.
- **Tasks**
  Includes task items.
- **Notes**
  Includes notes.

One or multiple item types can be selected.

#### Filter…

These options limit results based on message status or content:

- **Unread**
  Displays only items that have not been marked as read.
- **Attachments**
  Displays only items that contain one or more attachments.

#### Date

- **Any date**
  Allows filtering search results by a specific time period such as:
  `Any date`, `Past week`, `Past 2 weeks`, `Past month`, `Past 6 month`, `Past year` or `Custom date`

This helps narrow results to a specific time period.

#### Search…

These options specify which fields are searched:

- **Sender**
  Searches for items based on the sender's name or email address.
- **Recipients**
  Searches for items based on recipient names or email addresses.
- **Subject**
  Searches within the subject line of items.
- **Body & Attachments**
  Searches within the message body text and the contents of attachments (if supported).

#### Filter category…

- **Select Category**
  Allows filtering search results by assigned categories (e.g., color-coded or labeled items).

#### Favourites

- **Favourites**
  This is a button that adds a folder to favourites based on the search query.
  When clicked, a custom folder name can be provided.

### Overall behavior

grommunio Web is a true web application which provides an unusually enhanced web application feeling. With this behavior, grommunio Web provides multiple user experience enhancements to traditional web applications, such as:

- Support for Drag & Drop of elements.
- Right-click context menus with extra functionality on objects.
- Multi-select of objects using the Ctrl key (or Cmd on Apple).
- Tabular interface handling to allow multi-tasked working.
