---
title: "Moving to alternative apps"
pubDate: 2025-12-19
description: "A list of alternative apps I moved for both desktop and mobile and my experience with them"
draft: true
---

For a while now, I have been replacing most of my phone software from [Play Store](https://play.google.com/store/) apps to [F-Droid](https://f-droid.org/en/packages/com.amaze.filemanager/) open source apps, my first thought was that I should compromise some nice features but as it turned out most of the open source apps greatly improve the experience.

## Fragmented password managing for [KeePass](https://keepass.info/)

This was a big change, and a tedious one, I was able to remember most of my passwords and  that’s a bad practice because it means there’s a pattern to the passwords, to store secure tokens I was using [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en), and for passwords I don’t care much Chrome’s built in password system, which I was using more than expected without even realizing.

I completely moved out of Google, or any other cloud based solution, I deleted any stored passwords, moved them to a [KeepassXc](https://keepassxc.org/) database and generated new strong generated passwords for all services. 

In itself, it was a good cleanup of sites I don’t use anymore, I was able to delete many accounts that I don’t need anymore.

I did lose something important, no brain backups from Google, this was also replaced by my own custom solution using a Raspberry Pi, a local only [Syncthing](https://syncthing.net/) and a [3-2-1 backup policy](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/).

The UI of [KeepassDX](https://f-droid.org/packages/com.kunzisoft.keepass.libre/) on Android has nothing to envy other password managers like 1Password, and KeepasXC does a great job on desktop.

To keep some external backup, I use [RoundSync](https://f-droid.org/en/packages/de.felixnuesse.extract/) with a daily trigger.

## Amaze for Round Sync

I have the unusual usage of downloading most media to my phone, in order to be able to consume the content anywhere, when I want to consume something on a another device like a laptop or a TV, I only need to serve the content, so far I was using [Amaze](https://f-droid.org/en/packages/com.amaze.filemanager/)’s FTP to copy back and forth the data, which is quite tedious.

With [round-sync](https://f-droid.org/en/packages/de.felixnuesse.extract/) I can simply serve the videos with a HTTP server, and watch them directly using [MPV](https://mpv.io/) of [VLC](https://www.videolan.org/) (Also available on Android TV), the server makes easy to choose what to watch with a browser and it’s crazy fast, 4k streaming works without a sweat.

Amaze is a good file explorer that I still use, but most of the usage is now replaced by Round Sync.

## Google Chrome for Firefox

Another huge change, with mixed feelings, I still prefer Chrome's dev-tools, the profiles also work better on Chrome, and there are some minor shortcuts that I had to re-learn, the rest is mostly positive, it feels fast, privacy is better, and I like the idea of containers to separate sites.

## Fing for Port Authority

[Port Authority](https://f-droid.org/en/packages/com.aaronjwood.portauthority/) is a complete improvement over [Fing](https://play.google.com/store/apps/details?id=com.overlook.android.fing&hl=en), faster, it does exactly what the tool is meant to do and nothing else, no annoying upsells, publicity around the app or ads blocking the features, it just works and does it better.

## Niagara launcher for µLauncher

This one is a bit of a downgrade regarding widgets and notification within the app list, I decided to use [µLauncher](https://f-droid.org/en/packages/de.jrpie.android.launcher/) which might be too minimalist, but it has some great features like gestures, at first I thought it would not be as nice as Niagara's scroll list, but nothing beats how fast opening apps by gestures is once you get used to it.

## Google Books for Readest

It took me a long while to decided for this change, every other replacement for Google Books was always a worse experience, [Readest](https://readest.com/) has some great ideas, the scroll view which I never liked on other readers works amazing, my initial thought is that it was going to be a downgrade given that Google Books syncs across devices, Readest does it as well but opted to not use it, most of the reading is done [on my phone](/blog/reading-books-on-my-phone/).

On of the main decisions to not move from Google Books was how easy is to add new books, the web UI simply lets me drag and drop a book, I thought this was going to be an issue but with Round Sync I can quickly start a ftp server and do the same drag an drop, it's also not so usual that I need to copy books.

## Google Maps for Organic Maps

I like to use [OsmAnd~](https://f-droid.org/en/packages/net.osmand.plus/) for hiking, for city traveling I need a lighter app more focused on public transport, I have to say is not as good as Google Maps, no other app is, but it does the job for most of my commutes, specially for bike commutes.

What could be better?

- If you compare the routes from Google Maps and [Organic maps](https://f-droid.org/en/packages/app.organicmaps/) you can tell Google usually chooses shorter, better routes.
- Search logic: wrong names, auto-complete is nowhere near as good as Google, it also limits the search by a far smaller radius than Google which is is annoying when you need to get somewhere far like an airport.

I have to say that I didn't move completely from Google Maps, I still keep it installed for international trips where I need better route planning.

## ZSH for Fish 🐟

This change came from necessity. I was using [ZSH](https://www.zsh.org/) with [OMZ](https://ohmyz.sh/), which itself isn't slow, but adding the nvm plugin made startup painfully sluggish. The issue comes more from nvm than OMZ or Zsh itself, I did read some articles about [how to speed up ZSH](https://scottspence.com/posts/speeding-up-my-zsh-shell), but still feels sluggish compared to [Fish](https://fishshell.com/).

First, I replaced [nvm](https://github.com/nvm-sh/nvm) for [fnm](https://github.com/Schniz/fnm), I also did it on zsh which made the whole startup faster, but fish comes with some nice features out of the box like autosuggestions, syntax highlighting that work really well without plugins.

One of my favorite parts of omz is the [git shortcuts](https://kapeli.com/cheat_sheets/Oh-My-Zsh_Git.docset/Contents/Resources/Documents/index), with [this plugin](https://github.com/jhillyerd/plugin-git) I can replace most of them, I only had to re-introduce some using alias


- [ ]  Port the alias
- [ ]  set as default shell
- [x]  Hash in right side
