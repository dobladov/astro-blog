---
title: Simplifying browser extensions with Tampermonkey
pubDate: 2023-08-28
description: A brief introduction to Tampermonkey as an alternative to extensions.
tags: [programming, javascript, tampermonkey, extensions, chrome, firefox]
---

## Introduction

Not long ago, a coworker sent me the code of an extension he made, he did a wonderful work, and I loved how he came up with a better and simpler solution to the problem that I was overengineering. Unfortunately, the extension was only compatible with *Firefox* and I use *Chrome*.

Initially, I thought it was going to be a matter of adapting the manifest a bit to make it work on *Chrome*, but it was not that simple; even when using the same manifest version, the way background scripts are loaded is different for each browser.

Also, some parts of the code were incompatible with *Chrome*, for example, how the messages could be awaited in *Firefox*.

I did end up porting the code, but it was not a simple task and left me wondering why it was so cumbersome to make an extension compatible with both browsers. 

After all, the changes to the extension APIs are meant to close the gap between browsers, but it seems to be a way to remove some of the more powerful APIs that get in the way of blocking advertisements.

Overall, I'm very disappointed with the developer experience of web extensions. Porting [Youtube2Anki](https://github.com/dobladov/youtube2Anki) to manifest `v3` was a lot of work with no benefits to the users, and with the drawback that I have to keep two different versions for *Firefox* (still `v2`) and *Chrome*, all these problems got me thinking about what I can do as an alternative.

## Why Tampermonkey

[Tapermonkey](https://www.tampermonkey.net/) allows you to execute scripts and styles on any site, exactly what a custom extension does, but it has some advantages:

The development is much easier; it requires less boilerplate, and it's effortless to debug due to not having multiple contexts handling many of the tedious permissions for you.

On top of it, it reloads after saving the changes of a *Tampermonkey* script; there's no need to reload the extension; just refresh the page and the changes are applied. This means faster iterations and less time wasted.

In my case, I had three requirements.

1. I needed to be able to inject a script at a specific URL.
2. Send notifications to the user.
3. Open a URL in a new tab.

Tampermonkey allows me to do all of this.

The permissions only require adding some [grants](https://www.tampermonkey.net/documentation.php?locale=en#meta:grant).

```
// @grant        GM_notification
// @grant        GM_openInTab`
```

And executing only in the URL is as simple as `// @match  [your URl]`

After porting the logic, what used to be basically an app with multiple files, setup, packaging, etc, became a single file with a few lines of code that just focused on doing what it needed to do.


Not only that, but there was no need for boilerplate to send data back and forth between the background script and the content script, and notifications could be simplified by not requiring a `tabId`.

And the best part is that there are no differences between *Firefox* and *Chrome*; they both run the same script and execute the same functionality.

## Other usages

I have incorporated *Tampermonkey* into my work to the point that some other of my coworkers use it now, mostly dev code that we don't want to deliver to production.

For example, as a quick way to set special cookies or log users without a form, since most of the scripts only require a file, we can easily share them as a [gist](https://gist.github.com/), and they can be easily installed by anyone.

## Conclusion

I would only consider *Tampermonkey* a tool for developers; there are many cases where a full extension is needed, but for quick hacks or to avoid the hassle of maintaining multiple versions of the same extension, it's a great tool.

![monkey writing on a laptop](./monkey.jpeg)
