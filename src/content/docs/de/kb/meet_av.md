---
title: "Fehlerbehebung bei Meet, Audio/Video"
description: "Das System verfügt möglicherweise über mehrere Ausgabegeräte, deren Vorhandensein unerwartet sein kann. Achten Sie auf die vom Betriebssystem angebotenen HDMI-Kanäle, auch wenn…"
sidebar:
  order: 90
---

## System-Audioausgang (Linux)

Das System verfügt möglicherweise über mehrere Ausgabegeräte, deren Vorhandensein unerwartet sein kann. Achten Sie auf die vom Betriebssystem angebotenen HDMI-Kanäle, auch wenn an den physischen HDMI- und DisplayPort-Anschlüssen nichts angeschlossen ist.

Ein Beispiel aus dem Programm *pavucontrol* (mit PipeWire-Backend):

![](/img/pavucontrol-output.png)

Das Standardgerät kann sich sogar von selbst ändern, wenn beispielsweise Bluetooth-Ausgabegeräte ein- oder ausgeschaltet werden. Vergewissern Sie sich, dass die gewünschten Ausgabegeräte nicht stummgeschaltet sind und dass Sie ein geeignetes Gerät als Standardausgabegerät ausgewählt haben. Mit den Lautstärkemessern in pavucontrol lässt sich feststellen, wohin die Audioausgabe geleitet wird.

pavucontrol zeigt nicht unbedingt alle Regler an; schauen Sie daher bei Bedarf auch einmal beim Befehlszeilenprogramm alsamixer nach. Dieses muss mit dem Argument -c aufgerufen werden, um eine physische Soundkarte auszuwählen, z. B. `alsamixer -c 0`; andernfalls wird möglicherweise ein virtuelles ALSA-Gerät geöffnet, das Teil der modernen Pipewire-Pipeline ist.

![](/img/alsamixer-output.png)

## System-Audioeingang (Linux)

Das System zeigt möglicherweise bereits im Auslieferungszustand mehrere Eingabegeräte an, auch wenn noch keine weiteren Geräte angeschlossen sind. Im folgenden Beispiel-Screenshot von pavucontrol ist zu sehen, dass das System über zwei Eingabegeräte verfügt. Eines davon scheint für ein über die analoge Buchse angeschlossenes Headset/Mikrofon vorgesehen zu sein, während es sich bei dem anderen um das Mikrofon handelt, das sich an der integrierten Webcam des Laptops befindet.

Dass beide Eingabegeräte fast identisch beschriftet sind, ist alles andere als ideal, aber das Vergrößern des Fensters hilft. Stellen Sie sicher, dass die gewünschten Eingabegeräte nicht stummgeschaltet sind und dass Sie ein geeignetes Gerät als Standard-Eingabegerät ausgewählt haben. Anhand der Lautstärkeanzeige für jedes Gerät lässt sich zudem feststellen, wo der Audioeingang abgegriffen wird. Mit „alsamixer“ können Sie zusätzlich überprüfen, ob weitere Regler vorhanden sind.

![](/img/pavucontrol-input.png)

![](/img/alsamixer-input.png)

## Bluetooth-Geräte

Im A2DP-Profil können Bluetooth-Geräte keine Mikrofonfunktion bereitstellen. Hierfür muss stattdessen das HFP/HSP-Profil (Headset-Profil/Freisprechprofil, nicht High-Fidelity-Wiedergabe) verwendet werden.

![](/img/pavucontrol-config.png)

Je nach den Funktionen und der Konfiguration der Betriebssystemsoftware kann der Modus automatisch von A2DP auf HFP/HSP umgeschaltet werden, wenn die Aufnahmesoftware versucht, die Mikrofonfunktion zu nutzen.

Sobald sich das Gerät im HFP/HSP-Modus befindet, wird es unter „Eingabegeräte“ angezeigt. Wenn das Gerät den HFP/HSP-Modus verlässt, entfernt pavucontrol die Elemente erst nach einem Neustart automatisch aus der Benutzeroberfläche.

Bei den HFP/HSP-Profilen werden nur zwei Codecs angeboten, die beide eine schlechte Wahl darstellen: mSBC (16 kHz Mono) und CVSDM (8 kHz Mono).

Unter PipeWire/PulseAudio ist es möglich, den Browser und andere Programme so einzustellen, dass sie unterschiedliche Hardwaregeräte für die Ein- und Ausgabe verwenden. Wenn das Mikrofon der Webcam als Eingabegerät genutzt wird, kann ein Bluetooth-Gerät mit dem A2DP-Profil betrieben werden.

## System-Audio (Android)

In den Systemeinstellungen stehen mehrere Lautstärkeregler zur Verfügung.

- Wenn Anwendungen *nur* Audio/Video ausgeben, wird die „Medienlautstärke“ verwendet.
- Wenn jedoch sowohl eine Ausgabe als auch eine Eingabe angefordert wird, wird die „Gesprächslautstärke“ verwendet.
- Es ist mindestens ein Fall eines Android-Fehlers bekannt, bei dem *keiner* der Schieberegler eine Wirkung zeigt, wenn das Ausgabegerät der integrierte Lautsprecher ist.

![](/img/android-sound1.png)

Stellen Sie sicher, dass die App über die erforderlichen Berechtigungen für die Kamera und/oder das Mikrofon verfügt.

![](/img/android-sound2.png)

![](/img/android-sound3.png)

## AV-Aufzeichnung zulassen (Firefox)

Je nach Browsereinstellungen kann es vorkommen, dass Seiten daran gehindert werden, die Erlaubnis zur Audio- oder Videoaufzeichnung anzufordern. Gehen Sie zu den Browsereinstellungen \> „Datenschutz und Sicherheit“ (auf der linken Seite) \> „Berechtigungen“ (Überschrift im mittleren Bereich), um dies zu überprüfen.

![](/img/firefox-settings-perms.png)

![](/img/firefox-settings-camera.png)

Das Kontrollkästchen „Neue Anfragen blockieren“ steuert, ob die „Fragen statt blockieren“-Funktion aktiviert ist. Wenn Anfragen blockiert werden, enthält die URL-Leiste (in Firefox 116/Linux) nicht genügend Symbole und/oder Schaltflächen, um den Gerätezugriff für eine Seite nachträglich selektiv wieder zu aktivieren. Benutzer müssen zu den Einstellungen zurückkehren und von „Blockieren“ auf „Fragen“ umstellen.

Wenn Anfragen zugelassen sind, wird ein Popup-Fenster angezeigt, sobald eine Seite Zugriff auf das Gerät anfordert:

![](/img/firefox-access-ask.png)

Es spielt keine Rolle, welches Kamera-/Mikrofon-Gerät Sie auswählen (falls Sie mehr als eines haben). Das Dropdown-Menü dient offenbar nur dazu, Ihnen zu zeigen, über welche Geräte Sie verfügen. Die Geräteauswahl kann ohnehin später in Meet vorgenommen werden.

Anschließend können die Website-Einstellungen angepasst werden, indem man auf das Kamera-/Mikrofon-Symbol in der Adressleiste klickt. Wichtig ist, dass es in Firefox eine dritte Einstellung namens *Autoplay* gibt. Die Autoplay-Einstellung für eine Website ist nicht Teil des zuvor genannten Bestätigungsdialogs für Berechtigungen (da es bei Autoplay-Einstellungen keinen Status „Fragen“ gibt, sondern nur „Blockieren“ oder „Zulassen“). In jedem Fall muss „Autoplay“ für Meet zugelassen sein, damit die Funktion einwandfrei funktioniert. Klicken Sie daher bitte auf das Symbol bzw. die Symbole für die Website-Einstellungen und stellen Sie sicher, dass alle drei Optionen zugelassen sind.

![](/img/firefox-settings-cmurl.png)

## AV-Erfassung zulassen (Chromium)

Je nach Browsereinstellungen kann es vorkommen, dass Seiten daran gehindert werden, die Erlaubnis für Audio- oder Videoaufnahmen anzufordern. Gehen Sie zu den Browsereinstellungen \> „Datenschutz und Sicherheit“ \> „Website-Einstellungen“, um dies zu überprüfen.

![](/img/chromium-settings-microphone.png)

![](/img/chromium-settings-camera.png)

Wenn alle diese Optionsfelder auf „Websites nicht zulassen …“ eingestellt sind, zeigt die Benutzeroberfläche des Browsers keinen Dialog an, wenn die Seite Berechtigungen anfordert, und in der URL-Leiste erscheint auf der rechten Seite ein Kamerasymbol mit einem kleinen roten Kästchen und einem weißen Kreuz, um anzuzeigen, dass alles blockiert ist.

![](/img/chromium-access-block.png)

Falls die Seite nicht über alle gewünschten Berechtigungen verfügt, kann sie ein JavaScript-gesteuertes visuelles Element anzeigen, das über die Berechtigungssituation im Dokumentrahmen informiert.

Wenn eines der Optionsfelder in den Einstellungen auf „Websites können fragen…“ gesetzt ist, zeigt der Browser ein kleines Dialogfeld an. Die Geräteklassen, die in diesem Dialogfeld zur Genehmigung angezeigt werden, entsprechen der Menge der von der Webseite angeforderten Geräte abzüglich der Menge der Geräte, die über die Browsereinstellungen dauerhaft gesperrt sind. Mit anderen Worten: Der Dialog kann eines von drei Ergebnissen anzeigen: nur die Beschriftung „Mikrofon verwenden“, nur die Beschriftung „Kamera verwenden“ oder beide Beschriftungen.

![](/img/chromium-access-ask.png)

Wurden Berechtigungen erteilt, wechselt das Symbol in der Adressleiste zu der höchsten zulässigen Geräteklasse (Mikrofon, Kamera, in dieser Reihenfolge). Über dieses Symbol lässt sich dann ein Minidialog aufrufen, um die zuvor erteilten Berechtigungen zu aktivieren bzw. zu deaktivieren. Mit anderen Worten: Dieser Dialog kann eines von drei Ergebnissen anzeigen: „Kamera erlaubt/gesperrt“ *oder* „Mikrofon erlaubt/gesperrt“ *oder* „Kamera und Mikrofon erlaubt/gesperrt“.

![](/img/chromium-settings-cmurl.png)

![](/img/chromium-settings-cmurl2.png)

Über diesen Dialog lassen sich die Berechtigungen nur pauschal ändern. Um Mikrofon oder Kamera für die jeweilige Webseite individuell neu zu konfigurieren, kehren Sie bitte zum Einstellungsbereich des Browsers zurück. Beachten Sie außerdem, dass der Minidialog keine Änderung des Geräts zulässt (das Dropdown-Menü reagiert in Chromium 115 auf keine Eingabe).

## AV-Aufnahme freigeben (Android/Chrome)

Beheben Sie das Problem wie im vorherigen Abschnitt zu Chromium beschrieben.

Bei Android verfügt der Browser neben „Kamera“ und „Mikrofon“ über eine *dritte* Kategorie mit webseitenspezifischen Einstellungen, nämlich „Ton“, die Sie ebenfalls überprüfen müssen.

![](/img/android-sound4.png)

![](/img/android-sound5.png)

Die Popups für den Gerätezugriff und die Website-Einstellungen, die beim Antippen des Symbols in der URL-Leiste erscheinen, sehen ähnlich aus wie bei Chromium:

![](/img/chromeandr-access-ask.png)

![](/img/chromeandr-settings-cmurl.png)

## Informationen zum Kameragerät (Linux)

Das Befehlszeilenprogramm `v4l2-ctl` kann verwendet werden, um einen tieferen technischen Einblick in die vom Video4Linux API unterstützten Geräte zu erhalten. Unser hier vorgestelltes Beispielsystem verfügt über vier V4L-Geräte: Farberfassung, Metadatenkanal, Infraroterfassung, Metadatenkanal.

``` text
# ls /dev/video*
/dev/video0  /dev/video1  /dev/video2  /dev/video3

# v4l2-ctl -d /dev/video0 --all
Driver Info:
    Driver name      : uvcvideo
    Card type        : FJ Camera: FJ Camera
    Bus info         : usb-0000:00:14.0-7
…
Video input : 0 (Camera 1: ok)
Format Video Capture:
    Width/Height      : 640/480
    Pixel Format      : 'YUYV' (YUYV 4:2:2)
    Field             : None
    Bytes per Line    : 1280
    Size Image        : 614400
    Colorspace        : sRGB
    Transfer Function : Rec. 709
    YCbCr/HSV Encoding: ITU-R 601
…
    Frames per second: 30.000 (30/1)
…

# v4l2-ctl -d /dev/video1 --all
…
Format Metadata Capture:
    Sample Format   : 'UVCH' (UVC Payload Header Metadata)
    Buffer Size     : 10240

# v4l2-ctl -d /dev/video2 --all
Format Video Capture:
    Width/Height      : 640/360
    Pixel Format      : 'GREY' (8-bit Greyscale)
    Field             : None
    Bytes per Line    : 640
    Size Image        : 230400
    Colorspace        : sRGB
    Transfer Function : Rec. 709
    YCbCr/HSV Encoding: ITU-R 601
    Quantization      : Default (maps to Full Range)
…
    Frames per second: 30.000 (30/1)
…

# v4l2-ctl -d /dev/video3 --all
…
Format Metadata Capture:
    Sample Format   : 'UVCH' (UVC Payload Header Metadata)
```

## Auswahl des Aufnahmegeräts (Firefox)

Bestimmte Hardware bietet möglicherweise mehrere Aufnahmemodi an und stellt diese als unabhängige oder teilweise unabhängige, auswählbare Geräte dar.

Von den vier V4L-Geräten, über die unser Beispielsystem verfügt, liefern zwei Bilder, und Firefox betrachtet sowohl die YUYV- als auch die GREY-Ausgabe als nutzbar (und stellt sie über JavaScript von APIs bis Meet zur Verfügung). Die Auswahl der Infrarotkamera mit ihrer monochromen Ausgabe funktioniert jedoch nicht, ohne dass eine Erklärung oder Fehlermeldung angezeigt wird, und die Auswahl springt stets wieder auf das Farbgerät zurück.

## Auswahl des Aufnahmegeräts (Chromium)

Sie können dies unter „Einstellungen“ > „Datenschutz“ > „Website-Einstellungen“ > konfigurieren.

![](/img/chromium-settings-microphone.png)

![](/img/chromium-settings-camera.png)

Das Dropdown-Menü für Kamera und Mikrofon in den Einstellungen ist *nur* sichtbar, wenn mindestens eine Webseite bereits versucht hat, die Audio-/Video-Funktion API zu nutzen. Andernfalls ist dieses Dropdown-Menü nicht vorhanden (in Chromium 115/Linux).

Von den vier V4L-Geräten, über die unser Beispielsystem verfügt, betrachtet Chromium nur das YUYV-Gerät als auswählbar. Auch hier war die Infrarotkamera nicht einsetzbar.

## Auswahl des Aufnahmegeräts (Meet)

Die Geräteauswahl kann über die Schnittstelleneinstellungen des Meet vorgenommen werden.

![](/img/meet-settings.png)
