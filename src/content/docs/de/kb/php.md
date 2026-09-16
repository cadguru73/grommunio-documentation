---
title: "PHP Umgebung"
description: "Die Opcache-Erweiterung führt den Opcode „ZENDTYPECHECK“ zumindest in PHP 8.0.25 fehlerhaft aus und führt dazu, dass ein wichtiger PHP-Ausdruck, nämlich „isresource($x)“, seltsamerweise …"
sidebar:
  order: 130
---

## opcache

Die Erweiterung `opcache` führt den Opcode ZEND_TYPE_CHECK zumindest in PHP 8.0.25 fehlerhaft aus und führt dazu, dass ein wichtiger PHP-Ausdruck, `is_resource($x)`, seltsamerweise den Wert `false` zu ergeben, selbst wenn `$x` eine gültige Ressource ist. Das Problem tritt an derselben Stelle in grommunio-web auf und ist zuverlässig reproduzierbar, doch wir wissen nicht genau, warum. g-web ist ein großes Programm, und Versuche, das Problem mit einem kleineren Programm nachzustellen, blieben bislang erfolglos.

mapi.so prüft, ob opcache.so vorhanden und aktiviert ist, und lehnt den Vorgang in diesem Fall ab. Sie müssen opcache deaktivieren.

Details:

Wir stellen fest, dass die Zend-Engine den Funktionsaufruf PHP `is_resource(...)` auf besondere Weise behandelt (*[1] <https://github.com/php/php-src/blob/master/Zend/zend_compile.c#L4497>_*):

``` c
} else if (zend_string_equals_literal(lcname, "is_resource")) {
    return zend_compile_func_typecheck(result, args, IS_RESOURCE);
```

und dass Zend dies zu einem Opcode `ZEND_TYPE_CHECK` kompiliert, wobei extended_value den Wert `(1 << IS_RESOURCE)` hat ([\[2\]](https://github.com/php/php-src/blob/master/Zend/zend_compile.c#L3945..L3950)).

``` c
opline = zend_emit_op_tmp(result, ZEND_TYPE_CHECK, &arg_node, NULL);
if (type != _IS_BOOL) {
    opline->extended_value = (1 << type);
} else {
    opline->extended_value = (1 << IS_FALSE) | (1 << IS_TRUE);
}
```

Wenn die beiden im ersten Block gezeigten Zeilen entfernt werden, würde der Ausdruck `is_resource($x)` stattdessen zu einem Opcode `ZEND_INIT_FCALL` kompiliert werden ([\[3\]](https://github.com/php/php-src/blob/master/Zend/zend_compile.c#L4612)), und die Ausführung würde schließlich in der C-Funktion landen, die `is_resource` entspricht ([\[4\]](https://github.com/php/php-src/blob/php-8.0.25/ext/standard/type.c#L240..L276)).

``` c
static inline void php_is_type(INTERNAL_FUNCTION_PARAMETERS, int type)
{
    if (Z_TYPE_P(arg) == type) {
    ...
```

Zusammenfassung unserer Beobachtungen:

- Unveränderte Zend-VM, php-opcache deaktiviert, `is_resource` wird zu `ZEND_TYPE_CHECK`: gut
- Unveränderte Zend-VM, php-opcache aktiviert, `is_resource` wird zu `ZEND_TYPE_CHECK`: schlecht
- Modifizierte Zend-VM, php-opcache aktiviert, `is_resource` wird zu `ZEND_INIT_FCALL`: gut
- Wir kommen zu dem Schluss, dass php-opcache ein Problem in Bezug auf den Opcode `ZEND_TYPE_CHECK` verursacht.

Es gibt einen … merkwürdigen Kommentar in php-opcache (`MAY_BE_RESOURCE` ist dasselbe wie `1 << IS_RESOURCE`) ([\[5\]](https://github.com/php/php-src/blob/master/ext/opcache/jit/zend_jit.c#L3515)), der vielleicht relevant sein könnte:

``` c
case ZEND_TYPE_CHECK:
    if (opline->extended_value == MAY_BE_RESOURCE) {
        // TODO: support for is_resource() ???
        break;
    }
```
