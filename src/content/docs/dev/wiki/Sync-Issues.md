---
title: "Sync Issues"
description: "What to do when an Offline Mode Sync Issue is up and about:"
sidebar:
  order: 110
---

What to do when an Offline Mode Sync Issue is up and about:

- In MFCMAPI, export the message to .msg format. If that fails, there is the reason for the sync error.
  <em> Incomplete recipient subobjects are a common cause for failure</em>
- msmapi/emsmdb.dll is kinda boneheaded and Offline Mode does not play nice when the server sends provider-specific props (0x6600-0x67FF) that have size >= 8K.
