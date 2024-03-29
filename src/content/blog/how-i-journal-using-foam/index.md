---
title: How I journal using Foam
description: Reasons to use Foam and why I think it's the best note-taking workflow.
pubDate: 2023-08-15
tags: [notes, productivity, vscode, foam, obsidian, git, markdown]
heroImage: './bubble-faom.jpg'
---

## Introduction

Note-taking helps us focus, remember and organize our thoughts, it's an incredible tool to improve your work and yourself.

I've been taking notes for a long time, but I never had a good system to keep them organized and more importantly go back and read/refine old notes.

## Why choosing Foam over alternatives

I stared to use [Foam](https://foambubble.github.io/foam/) to annotate everything, I had many attempts with other tools, none seemed to stick, my last attempt was [Notion](https://www.notion.so/).

While I find _Notion_ incredibly useful it feels sluggish and the layout does not make me want to come back or write more, I do have a big amount of topics in there, but even when I can connect the pages, it's really hard to make mental connections to each one of the other topics.

There are other issues with _Notion_, like privacy concerns, but to me the most important is ownership, it's possible to export simple notes to Markdown, but takes a lot of time and is not a good experience, I didn't check their API, in any case I'm sure it's not as easy as cloning a git repository.

This is why I love _Foam_, it works the same way as as [Obsidian](https://obsidian.md/) or other [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten) apps, but inside of [VSCode](https://code.visualstudio.com/), this is great because I always have _VSCode_ opened, meaning that I don't have to switch context, all my shortcuts and plugins work, I can use the same editor for everything.

The view of the graph is the main selling point to use _Obsidian_, no more need to remember visiting old post, all is connected and can be accessed with a click, this is a game changer for me, I can see the connections between topics and ideas, I can see the evolution of my thoughts and how they are connected.

A graph view is something that I always wanted to have and what makes the difference in my total number of edits, and the view in _Foam_ works great, it can be positioned like any other tab which I always keep as a pinned tab with `cmd + k shift + enter`.

![Graph view of Foam](./graph-view.png)

There's some sense of satisfaction after looking at all the connections on the graph that making me want to write even more.

## Journaling

I make daily notes to keep track of what I did in a short resume format, it's easy to create a new document using the shortcuts like `/today`, `/yesterday` or `/+1w` all of my notes can be connected using tags to other notes, this makes easy to visualize what I was doing on a particular day with the graph view without having to search or even open the note.

## Plugins system

The integrations work great, multiple plugins doing one thing and doing it well.

I can integrate dynamic [Excalidraw](https://excalidraw.com/) documents, before I used to have a single _Excalidraw_ page opened in my browser with a bunch of cramped ideas, now I can simply create a new `idea.excalidraw.png` and immediately work on separated contexts, I can't overstate how useful it has become.

On top of it, I can directly link the `excalidraw.png` file inside Markdown and preview it while still being editable.

![Mockup drawing showing an example of useage of Excalidraw](./excalidraw-preview.png)

There are many other integrations, to [paste images](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image), [create todos](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-markdown-todo), [preview images](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview) like shown in the last screenshot or simply have a [better markdown experience](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one).

Best part is that all of these plugins are just _VSCode_ plugins that have functionality outside of _Foam_, enriching your whole development experience.

## Backups

The output of _Foam_ is just plain text making trivial to put the content into a repository.

Git once understood it's such a powerful tool that changes your way to think, for me the ability to have diffs and restore what I'm working on it's invaluable.

For my normal workflow, I write my notes during the day and next day review the changes using git, make corrections and push them to the repository, this helps to refresh my memory and improve the quality of the notes.

And again all of this without leaving _VSCode_ and completely open source, I can't thank enough all the [contributors](https://foambubble.github.io/foam/#thanks-and-attribution).

![Abstract painting of bubble foam](./bubble-faom.jpg)
