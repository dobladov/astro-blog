---
title: How to configure a 4k screen in Linux
pubDate: 2020-04-18
tags: [4k, screen, Xrandr, KDE]
description: Troubles with your screen?, here is how to fix it.
---

You just got a new cool 4K monitor, you opened it, connected it to your Linux device and the first thing you face is that you can't select the maximum resolution for the screen.

> My disappointment is immeasurable and my day is ruined. --Reviewbrah

## Why is this problem happening?

Apparently some screens might not give the correct [EDID](https://en.wikipedia.org/wiki/Extended_Display_Identification_Data) information, in my case a [SAMSUNG LU28E85KRS](https://www.samsung.com/us/business/support/owners/product/ue850-series-u28e850r/), this makes it impossible to select all supported modes for our screen, showing some default ones, without including resolutions greater than 1920x1080.


## How to get the correct EDID and set it using xrandr

### Getting the correct EDID

Thanks to this wonderful answer [How to get EDID for a single monitor?](https://unix.stackexchange.com/a/323121) by [Malat](https://unix.stackexchange.com/users/32896/malat), obtaining the correct information is easy.

```bash
sudo apt install read-edid
sudo get-edid | parse-edid
```

Cool, we get all supported modes.

```bash
Modeline    "Mode 1" 148.500 1920 2008 2052 2200 1080 1084 1089 1125 +hsync +vsync
Modeline    "Mode 0" 297.00 3840 4016 4104 4400 2160 2168 2178 2250 +hsync +vsync 
Modeline    "Mode 2" 74.250 1280 1390 1420 1650 720 725 730 750 +hsync +vsync
Modeline    "Mode 3" 148.500 1920 2448 2492 2640 1080 1084 1089 1125 +hsync +vsync
Modeline    "Mode 4" 74.250 1280 1720 1760 1980 720 725 730 750 +hsync +vsync
Modeline    "Mode 5" 27.027 720 736 798 858 480 489 495 525 -hsync -vsync
Modeline    "Mode 6" 27.000 720 732 796 864 576 581 586 625 -hsync -vsync
Modeline    "Mode 7" 74.250 1920 2558 2602 2750 1080 1084 1089 1125 +hsync +vsync
Modeline    "Mode 8" 74.250 1920 2008 2052 2200 1080 1084 1089 1125 +hsync +vsync
Modeline    "Mode 9" 148.50 1920 2008 2052 2200 1080 1084 1089 1125 +hsync +vsync 
Modeline    "Mode 10" 148.50 1920 2448 2492 2640 1080 1084 1089 1125 +hsync +vsync 
Modeline    "Mode 11" 74.25 1280 1390 1430 1650 720 725 730 750 +hsync +vsync 
Modeline    "Mode 12" 241.50 2560 2608 2640 2720 1440 1443 1448 1481 +hsync -vsync 
```

### Adding the new modes with xrandr

The first value after the mode number tell us the horizontal resolution, in my case I'm interested in `Mode 0`.

```bash
Modeline    "Mode 0" 297.00 3840 4016 4104 4400 2160 2168 2178 2250 +hsync +vsync 
```

Let's create a new mode, we can name it anything we want, but I prefer to name it after the output resolution.

```bash
xrandr --newmode "3840x2160" 297.00 3840 4016 4104 4400 2160 2168 2178 2250 +hsync +
```

Now we add the mode to the output, if you are not sure which one is the output, run `xrandr` and it will show something like `HDMI-2 connected`.

We use the name of the output.

```bash
xrandr --addmode HDMI-2 3840x2160
```

:tada: Now the new resolution should be available in the Display settings.

Don't forget to set font DPI and screen scale to you taste.

## Useful information

- [Arch wiki xrandr](https://wiki.archlinux.org/index.php/Xrandr)
- [Automate setting the screen](https://gist.github.com/datagrok/410d26e24ec51159cdfd2a400b809705)
