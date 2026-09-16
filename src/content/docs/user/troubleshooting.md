---
title: Troubleshooting
description: Fixes for the issues grommunio users hit most often — signing in, the web interface not loading correctly, missing mail, and mobile-device synchronization.
sidebar:
  order: 40
---

Common problems and how to resolve them yourself. If none of these help, contact
your administrator or the [grommunio community](https://community.grommunio.com).

## Signing in

If you cannot sign in to grommunio Web:

- Double-check that you are using your **full e-mail address** as the username,
  and that Caps Lock is off.
- Confirm the **server address** in your browser's address bar matches the one
  your administrator gave you.
- If you recently changed your password, make sure connected apps and mobile
  devices use the new one.
- Still stuck? Your account may be locked or disabled — ask your administrator.

## The web interface looks broken or out of date

After an update, the browser may still be using cached files:

- Reload the page bypassing the cache: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>
  (Windows/Linux) or <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> (macOS).
- If problems persist, clear your browser's cache for the grommunio site, or try
  a private/incognito window to rule out an extension.
- Use a current version of a mainstream browser (Edge, Chrome, Firefox or
  Safari).

## A message I expected did not arrive

- Check the **Junk** folder — the message may have been filtered as spam; mark it
  *Not Junk* to train the filter and move it back.
- Check your **message rules** (Settings → Rules) in case a rule moved or deleted
  the message.
- Ask the sender whether they received a non-delivery report. If so, share its
  text with your administrator.

## Mobile devices (Exchange ActiveSync)

If synchronization problems with your mobile device persist and a normal resync
did not help, reset the device's connection:

1. Remove the grommunio account from the mobile device.
2. In grommunio Web, go to **Settings → Mobile Devices** and remove the
   device(s).
3. Wait at least **fifteen minutes**.
4. Recreate the account on the mobile device.

This clears the server-side sync state so the device starts a clean
synchronization.
