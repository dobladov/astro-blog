---
title: Choosing a game engine
pubDate: 2023-09-18
description: Moving from canvas to game engines like Godot or Defold
tags: [godot, gamedev, defold, unity, canvas, webgl, lua, games, phaser, javascript, pixi, threejs, unreal, raylib, bevy]
heroImage: './engine.jpg'
---

## Introduction

With the recent [controversy about Unity](https://news.ycombinator.com/item?id=37486431), I see more and more posts about [gamedev](/tags/gamedev), which is a very interesting topic that I don't usually work as much as I want; I only made small games with [Phaser.js](https://phaser.io/) long ago and recently some experiments directly in [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

[Cocoa Moss](https://cocoamoss.com/) a team of two people that makes really cozy games, motivated me to give gamedev another try. I have been playing their games with my girlfriend for the past week almost every night, and they always make us happy.

## Problems with canvas and not using a framework

My last game required hundreds of elements on the the screen moving and colliding with each other. canvas is very limited in this sense, and while it works, the performance is not the best. I also have to handle quirks like different density screens and other visual glitches.

I need to port the game to something faster, like [WebGL](https://en.wikipedia.org/wiki/WebGL). The problem is that WebGL by itself is a very low-level API, and I don't want to write a game engine from scratch (neither I'm smart enough to do so)

Most people will opt to use a framework to handle the complexity of WebGL, the first option is usually [three.js](https://threejs.org/). In my case, the games are not 3D, so *three.js* feels overkill.

My second option was [pixi.js](https://pixijs.com/) while I'm getting somewhere, I don't like so much how the API is structured. I find myself often searching for solutions online to do basic stuff, most of the time finding code for old versions that is not compatible with the current one. This is the same reason I stopped using *Phaser*, all examples have a mix of old and new APIs, which makes it very frustrating to attempt any changes.

So far, Pixi.js is my best option, but I'm still not happy with it.

## Using game engines


The main reason for using a game engine is that it will handle all the complexity across many platforms, not limiting me to just the web, although that's my main target. But hey, more performance is always good, and if I do free games, I want people to be able to download them and keep them forever, or for at least longer than the time I host them.

I never paid much attention to *Unity*, and after all the controversy with the fees,  many developers are moving on to other alternatives, the main ones seem to be [Godot](https://godotengine.org/) or [Unreal Engine](https://www.unrealengine.com/). Unreal is probably overkill for what I want to do and not suitable for 2D, so my first choice was Godot.

## Godot

This means that Godot is on the table. I avoided it at first because I'm the most comfortable writing [JavaScript](/tags/javascript), and last time I checked, the developers were in the process of releasing version 4 with a huge rewrite of the engine, so I decided to wait.

There are two options for writing the code: GDScript and C#. After watching many videos about the advantages of one over the other, it seems that GDScript will emerge as the winner, so I will go with that.

- [C# Is Better Than GDScript But](https://www.youtube.com/watch?v=S2tTEPHIS1I)
- [How Much Faster Is C# Compared to GDscript?](https://www.youtube.com/watch?v=xM-HL0RU_ho)
- [GDScript vs. C# - Which Is Better? ](https://www.youtube.com/watch?v=ZF-IunpetMg)
- [C# or GDScript with Godot ?? Why Bother?](https://www.youtube.com/watch?v=g19dUmKTAfI)

Writing GDScript seems simple enough; it has basically the same syntax as Python, and it brings deep integration with the IDE.

While Godot seems to be great for making games, the situation of making web games is problematic at the moment because it does not support macOS web export. This is a problem when I'm planning on mainly making web games.

- [All HTML5 exports crash on loading](https://github.com/godotengine/godot/issues/67949)
- [HTML5 export for Godot 4.0 takes 1-2 minutes to load on macOS](https://github.com/godotengine/godot/issues/70691)
- [How far is Godot 4 from getting stable web export?](https://www.reddit.com/r/godot/comments/141l9bm/how_far_is_godot_4_from_getting_stable_web_export/)

## Defold

When searching for new engines, I stumbled into [Defold](https://defold.com/).

I had never heard of it before, but; I'm very surprised. The engine is open source, free, and the export is very straightforward supporting almost every platform, including macOS, Windows, Linux, Android, iOS, HTML5, consoles, etc.

It uses [Lua](https://www.lua.org/) which I never wrote before, but I kinda love it now, it's simpler than Python, it's clear, and the compilation time is incredible fast, if you don't believe me watch [Lua in 100 Seconds
](https://www.youtube.com/watch?v=jUuqBZwwkQw)

The IDE is very well organized, I was able to create most of the logic I need for my game after watching a [couple of tutorials](https://www.youtube.com/watch?v=HjJ-oDz-GcI).

So far, I feel more tempted to start writing my game in *Defold* until Godot gets their web export fixed.

While they promote themselves as a 2D engine, underneath it's a 3D engine, and it's [getting better and better](https://twitter.com/AGulev/status/1702085104422592541).

There are fewer tutorials for *Defold* on the wild, the official tutorials are high quality, teaching step by step, with clear goals and good results.

## Alternatives

I was tempted by other approaches like [raylib](https://www.raylib.com/) specially using [node-raylib](https://github.com/RobLoach/node-raylib), and [Bevy](https://bevyengine.org/), but I guess it's better to bet on a bigger community and a more complete engine.

## Conclusion

There are many ways to make games, and betting on open source should be the way to go, especially when game developers tend to be very talented people who are willing to collaborate on making a better engine.

Using a game engine brings many advantages. For me, having a community of people creating learning content is the greatest advantage, I can focus on making the game and not the engine, and I can export to many platforms.


![Abstract illustration of an engine](./engine.jpg)
