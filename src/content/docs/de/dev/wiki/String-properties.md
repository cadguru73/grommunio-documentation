---
title: "C Anwendungsschnittstellen"
description: "Die Modelle MSMAPI C, API und KGWC mapi4linux API verfügen über eine Struktur „SPropValue“, die wie folgt aussieht:"
sidebar:
  order: 100
---

Die Modelle MSMAPI C, API und KGWC mapi4linux API weisen ein `struct SPropValue` wie folgt auf:

``` c
struct SPropValue {
    union _UPV {
        char *lpszA;
        wchar_t *lpszW;
    };
};
```

Die Bedeutung der Zeichen in der schmalen Zeichenkette ist umgebungs- bzw. lokalisierungsabhängig (LC_CTYPE). Dabei kann es sich um eine Ein-Byte-Kodierung (z. B. cp1252), eine Mehr-Byte-Kodierung mit fester Breite oder eine Mehr-Byte-Kodierung mit variabler Breite (z. B. UTF-8) handeln.

Die Bedeutung der Wide-String-Zeichen ist plattformabhängig. Unter Windows stehen Wide-Zeichen (`wchar_t`) für UTF-16-Codeeinheiten (nicht für Codepunkte). Unter Linux-glibc stehen Wide-Zeichen für UTF-32-Codeeinheiten.

Gromox verfügt nicht über eine Schnittstelle, wie sie bei MSMAPI/COM zu finden ist.

## PHP Anwendungsschnittstellen

Der PHP-Interpreter implementiert nur einen String-Typ: „narrow“. Es wurde als akzeptabel erachtet, für Zeichenfolgen-Eigenschaftswerte stets bedingungslos UTF-8 zu verwenden, da PHP-Programme in erster Linie mit Webbrowsern interagieren und nicht mit 8-Bit-Befehlszeilen wie Windows cmd.exe. Vor dem Hintergrund dieser Entscheidung haben `PT_STRING8` und `PT_UNICODE` dieselbe Bedeutung, genau wie in gromox-http. Ebenfalls als Folge einer historischen Entscheidung werden alle Proptypen von `PT_UNICODE` auf `PT_STRING8` umgestellt, wenn Eigenschaften von php-mapi an das PHP-Programm übergeben werden, und umgekehrt in die andere Richtung (vgl. `proptag_to_phptag` und `phptag_to_proptag`).

## Netzwerkprotokolle

Die Protokolle OXNSPI und OXCROPS des Exchange übertragen breite Zeichenfolgen als UTF-16LE. Die Protokolle sehen zwar vor, dass sowohl PT_STRING8 als auch PT_UNICODE übertragen werden können, doch in der Praxis ändert der emsmdb.dll-Konnektor die Proptags beim Hochladen (z. B. `SetProps`) und überträgt in modernen Systemen ausschließlich Zeichenfolgen vom Typ PT_UNICODE.

Das KGWC-SOAP-Protokoll überträgt Zeichenketten als UTF-8 (vgl. `CopyMAPIPropValToSOAPPropVal`), sodass auf der Client-Seite im Connector möglicherweise eine Zeichensatzkonvertierung stattfindet (`zarafa6.dll`/`libkcclient.so`). Eigenschafts-Tags werden beim Senden an den KC-Server nicht verändert. Ich vermute, dies wurde so gestaltet, damit PT_STRING8-Eigenschaften, die für ein Objekt gesetzt wurden, auch als PT_STRING8-Typ zurückgelesen werden (z. B. `IMessage::SetProps` gefolgt von `IMessage::GetPropList`).

Die Protokolle Gromox EXMDB, ZRPC und MIDB übertragen Zeichenketten im UTF-8-Format. Die Verwendung von UTF-8 ist praktisch, da die Daten in der SQLite-Datenbank bereits im UTF-8-Format vorliegen. Die Proptypes bleiben erhalten.

EWS und EAS verwenden XML, daher werden Zeichenfolgenwerte als UTF-8 übertragen (bei Bedarf mit der Zeichenkodierung von XML).

## Server

Exchange speichert Zeichenfolgen-Eigenschaften vermutlich so, wie sie aus dem Netzwerk kommen.

KGWC speichert Zeichenketteigenschaften als UTF-8 in SQL. Da die Anforderungen des Netzwerkprotokolls bereits vorsahen, dass der Client UTF-8 sendet, entsteht für den Server kein Konvertierungsaufwand. Eigenschafts-Tags werden nicht verändert. Insgesamt ist es sehr üblich, Unicode-Zeichenfolgen und den Typ 0x1E (PT_STRING8) in der SQL-Datenbank vorzufinden. 0x1F (PT_UNICODE) kommt hingegen eher selten vor.

Die EMSMDB/NSP-Netzwerkprotokoll-Handler in Gromox konvertieren die Daten beim Empfang von 8-Bit/UTF-16LE in UTF-8. (Es gilt: Die Klassen `EXT_PULL` und `EXT_PUSH` werden mit flags=`EXT_FLAG_UTF16` instanziiert.) Der ursprüngliche Eigenschaftstyp bleibt in der Regel erhalten, sodass SetProperties+GetPropList denselben Proptag zurückgibt, der eingegeben wurde. Die Daten werden im SQLite als SQLITE_BLOBs gespeichert. Wenn Daten von Outlook über EMSMDB/NSP zurückgelesen werden, werden Zeichenfolgen je nach dem angeforderten Eigenschaftstyp wieder in 8-Bit/UTF-16 konvertiert.
