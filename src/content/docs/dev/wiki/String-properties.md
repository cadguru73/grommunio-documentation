---
title: "C Application interfaces"
description: "The MSMAPI C API and KGWC mapi4linux API have a struct SPropValue like so:"
sidebar:
  order: 100
---

The MSMAPI C API and KGWC mapi4linux API have a `struct SPropValue` like so:

``` c
struct SPropValue {
    union _UPV {
        char *lpszA;
        wchar_t *lpszW;
    };
};
```

The meaning of the narrow string characters is environment-/locale-dependent (LC_CTYPE). This can be a single-byte encoding (e.g. cp1252), multi-byte fixed-width encoding, or a multi-byte variable-width encoding (e.g. UTF-8).

The meaning of the wide string characters is platform-dependent. Under Windows, wide chars (`wchar_t`) represent UTF-16 code units (not codepoints). On Linux-glibc, wide chars represent UTF-32 code units.

Gromox does not have an MSMAPI/COM-like interface.

## PHP Application interfaces

The PHP interpreter implements only one type of string: narrow. It was deemed acceptable to unconditionally use UTF-8 for string property values at all times, because PHP programs primarily interact with web browsers rather than 8-bit command lines like Windows cmd.exe. With that decision in mind, `PT_STRING8` and `PT_UNICODE` have the same meaning, just as they do inside gromox-http. Also as a result of a historic decision, all proptypes are switched from `PT_UNICODE` to `PT_STRING8` as properties go from php-mapi to the PHP program, and vice-versa in the other direction (cf. `proptag_to_phptag` and `phptag_to_proptag`).

## Network protocols

The Exchange protocols OXNSPI and OXCROPS transfer wide strings as UTF-16LE. The protocols specify that both PT_STRING8 and PT_UNICODE can be transferred, however, in practice, the emsmdb.dll connector modifies proptags during upload (e.g. `SetProps`) and transmits only PT_UNICODE-typed strings in modern systems.

The KGWC SOAP protocol transfers strings as UTF-8 (cf. `CopyMAPIPropValToSOAPPropVal`), so character set conversion may happen on the client side in the connector (`zarafa6.dll`/`libkcclient.so`). Property tags are not modified when they are sent to the KC server. I think this was done so that PT_STRING8 properties set on an object also read back as PT_STRING8-typed (e.g. `IMessage::SetProps` followed by `IMessage::GetPropList`).

The Gromox EXMDB, ZRPC and MIDB protocols transfer strings as UTF-8. The use of UTF-8 is convenient, because the data in SQLite DB is already UTF-8. Proptypes is retained.

EWS and EAS use XML, so string values are transferred as UTF-8 (with XML Character Entity Encoding as needed).

## Servers

Exchange stores string properties presumably as they come from the network.

KGWC stores string properties as UTF-8 in SQL. Because the network protocol requirements already made the client send UTF-8, there is no conversion work for the server. Property tags are not modified. Overall, it is very common to see Unicode strings and a type of 0x1E (PT_STRING8) in the SQL database. 0x1F (PT_UNICODE) makes a rather seldom appeareance.

The EMSMDB/NSP network protocol handlers in Gromox convert from 8-bit/UTF-16LE to UTF-8 as data is received. (Mnemonic: The `EXT_PULL` and `EXT_PUSH` classes are instantiated with flags=`EXT_FLAG_UTF16`.) The original property type is generally retained so that SetProperties+GetPropList returns the same proptag as was entered. Data is stored into the SQLite as SQLITE_BLOBs. When data is read back by Outlook via EMSMDB/NSP, strings are converted back to 8-bit/UTF-16 depending on the requested proptype.
