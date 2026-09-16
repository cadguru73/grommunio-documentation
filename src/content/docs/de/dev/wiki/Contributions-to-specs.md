---
title: "Beiträge zu den Spezifikationen"
description: "Fälle, in denen wir in der Dokumentation bzw. den Spezifikationen von Microsoft Unvollständigkeiten oder regelrechte Fehler festgestellt haben:"
sidebar:
  order: 40
---

Fälle, in denen wir in der Dokumentation bzw. den Spezifikationen von Microsoft Unvollständigkeiten oder regelrechte Fehler festgestellt haben:

- [PT_LONG ist nicht für den vorzeichenlosen Wert ](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/613) vorgesehen
- [Outlook führt zu nicht spezifiziertem Verhalten in Bezug auf PR_SENSITIVITY](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/535)
- [Größenangaben für benannte Eigenschaften korrigiert](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/610)
- [Verhalten von EX2019 in Bezug auf SPropertyRestriction erwähnt](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/618)
- [MAPI_HARD_DELETE nicht vollständig dokumentiert](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/643)
- [Zusammenhang zwischen DIR_ENTRYID und CONTAB_ENTRYID](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/649)
- [EWS: Der Monat kann auch den Wert 0 annehmen](https://github.com/MicrosoftDocs/office-developer-exchange-docs/pull/368)
- [EWS: Standard-Eigenschaftstabelle mit fehlerhaftem Eintrag](https://github.com/MicrosoftDocs/office-developer-exchange-docs/pull/369)
- [PT_LONG ist fälschlicherweise als vorzeichenlos dokumentiert](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/618/)
- [Verhalten von EX Server 2019 bei der Auswertung eines NULL-Werts mit einer SPropertyRestriction](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/618/)
- [Erwähnung des DELETE_HARD_DELETE-Flags für IMAPIFolder::DeleteFolder](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/643)
- [Beschreibungen der Flags von PR_RECIPIENT_FLAGS aktualisieren](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/771)
- [Datei „commonly-used-property-sets.md“ mit Informationen aus MS-OXPROPS synchronisieren](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/780)
- [Weitere von IMAPIContainer::GetSearchCriteria zurückgegebene Flags dokumentieren](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/789)
- [SCountRestriction](https://github.com/MicrosoftDocs/office-developer-client-docs/pull/792#pullrequestreview-2565560249)

Die größten ungelösten Probleme:

- Das Repository [open_specs_exchange](https://github.com/MicrosoftDocs/open_specs_exchange) ist fälschlicherweise als privat eingestellt und kann nicht wie die anderen bearbeitet werden, <strong>wth</strong> ([Bugreport](https://github.com/MicrosoftDocs/feedback/issues/3835))

Ohne PR eingereicht (da open_specs_exchange):

- [GUID_NULL kann in OP_REPLY-Regeln auftreten](https://github.com/MicrosoftDocs/feedback/issues/3990)
- [Fehlerhafte Beispielanmerkung bei der Generierung der OXOCAL-Antwort](https://github.com/MicrosoftDocs/feedback/issues/3997)

Noch einzureichen:

- In MS-OXCMAPIHTTP wird nicht erwähnt, dass OXNSPI, wenn es über MAPIHTTP statt über RPC ausgeführt wird, eine andere Serialisierung aufweist:
  - (§2.2.1) zusätzliche <em>HasValue</em> Bytes in STRING_ARRAY, WSTRING_ARRAY, BINARY_ARRAY, Einschränkungen und propvals
  - PT_OBJECT wird ohne den uint32-Füllwert serialisiert
  - emsmdb32.dll unterstützt den Empfang von PT_FLOAT, PT_DOUBLE und PT_I8 über MH (nur nicht über RPC)
  - (Die OXCMAPIHTTP-Spezifikation ist auf GitHub <em>nicht</em>, was bedeutet, dass keine klassische Zusammenarbeit auf Basis von Pull-Requests möglich ist.)
- MS-OXCRPC erwähnt weder den AUX-Header-Typ 0x52 (gesendet von Outlook) noch dessen Bedeutung
- MS-OXCRPC erwähnt weder den AUX-Header-Typ 0x43 (gesendet von Exchange) noch dessen Bedeutung

Von uns selbst verfasste Spezifikationen:

- PR_RW_RULES_STREAM: `gromox/doc/outlook_rule_spec.rst`
