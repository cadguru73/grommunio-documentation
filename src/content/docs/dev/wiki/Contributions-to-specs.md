---
title: "Contributions To Specs"
description: "Instances where we found underspecifications or outright bugs in Microsoft documentation/specifications:"
sidebar:
  order: 40
---

Instances where we found underspecifications or outright bugs in Microsoft documentation/specifications:

- [PT_LONG is not for the unsigned](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/613)
- [Outlook invokes unspecified behavior with regard to PR_SENSITIVITY](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/535)
- [Fix size mentions for named properties](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/610)
- [Mention EX2019 behavior with regard to SPropertyRestriction](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/618)
- [MAPI_HARD_DELETE not fully documented](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/643)
- [relationship between DIR_ENTRYID and CONTAB_ENTRYID](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/649)
- [EWS: Month can have value 0 as well](https://github.com/MicrosoftDocs/office-developer-exchange-docs/pull/368)
- [EWS: Default property table with bogus entry](https://github.com/MicrosoftDocs/office-developer-exchange-docs/pull/369)
- [PT_LONG is wrongly documented to be unsigned](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/618/)
- [EX Server 2019 behavior when evaluating a NULL value with a SPropertyRestriction](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/618/)
- [Mention DELETE_HARD_DELETE flag for IMAPIFolder::DeleteFolder](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/643)
- [Update flag descriptions of PR_RECIPIENT_FLAGS](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/771)
- [Synchronize commonly-used-property-sets.md with info from MS-OXPROPS](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/780)
- [Document more flags returned by IMAPIContainer::GetSearchCriteria](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/789)
- [SCountRestriction](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/792#pullrequestreview-2565560249)

Major unsolved annoyances:

- The repository [open_specs_exchange](https://github.com/MicrosoftDocs/open_specs_exchange) is erroneously set to private and cannot be edited like the others, <strong>wth</strong> ([bugreport](https://github.com/MicrosoftDocs/feedback/issues/3835))

Filed without PR (because open_specs_exchange):

- [GUID_NULL can occur in OP_REPLY rules](https://github.com/MicrosoftDocs/feedback/issues/3990)
- [Improper example note in OXOCAL response generation](https://github.com/MicrosoftDocs/feedback/issues/3997)

Still to be filed:

- MS-OXCMAPIHTTP fails to mentions that OXNSPI, when run over MAPIHTTP rather than RPC, has different serialization:
  - (§2.2.1) extra <em>HasValue</em> bytes in STRING_ARRAY, WSTRING_ARRAY, BINARY_ARRAY, restrictions and propvals
  - PT_OBJECT is serialized without the uint32 filler value
  - emsmdb32.dll supports receiving PT_FLOAT, PT_DOUBLE and PT_I8 over MH (just not RPC)
  - (The OXCMAPIHTTP spec is <em>not</em> in github, which means there is no classic pull-request-based collaboration possible.)
- MS-OXCRPC fails to mention AUX header type 0x52 (sent by Outlook) and what it means
- MS-OXCRPC fails to mention AUX header type 0x43 (sent by Exchange) and what it means

Specifications written ourselves:

- PR_RW_RULES_STREAM: `gromox/doc/outlook_rule_spec.rst`
