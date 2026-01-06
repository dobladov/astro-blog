---
title: Writing browser extensions without compiling
tags: [javascript, extensions, tooling, framework, firefox, chrome, manifest]
description: Positive development changes for one of my extensions.
pubDate: "2021-06-24"
---

## Complexity is the enemy

Recently one of my most popular [extensions](https://github.com/dobladov/youtube2Anki) received a full refactor, previously it was made with just pure JavaScript; this was fine since at the beginning it was a proof of concept, it means no complex bundles, frameworks, compilers, ...

But with complexity comes necessity, managing the state of the connection between the extension and Anki and editing the sentences got complicated using imperative logic; It's amazing how used I became to declarative logic with [React](https://reactjs.org/) and this is something that I was missing for this extension.

I could use React, the problem is that if the extension needs to be compiled, the review in the extensions stores will be more exhaustive, taking more time and making it longer to fix simple stuff like bugs.

So in order to build trust and avoid wasting reviewer's time, all the code needed to stay just as it was written.

Tools like [snowpack](https://www.snowpack.dev/) made me realize that with the advance of JavaScript modules, we might not need to compile what it's an interpreted language, seriously how did we reach this point.

## Coming with simpler solutions

Let's look at the requirements, I wanted to use components, separate my logic from styles, use declarative logic, not set up any bundler (webpack, parcel, etc...) for this React would not make the cut since JSX needs some tooling and care.

So the decision went to [Skruv](https://skruv.io/), this framework is amazing, not only is tiny, modular and simple to learn, the docs are amazing well organized and clear, covering all functionality without extras.

You can tell how nice the framework is by looking at this framework's goals:

- No build time or runtime dependencies, no parsers
- Pretty small:
  - ~350 LOC vDOM
  - ~100 LOC State management
  - ~300 LOC HTML/SVG helpers
- Useable without bundling/compilation/transpilation
- Fast enough for most normal use cases: [benchmark](https://krausest.github.io/js-framework-benchmark/2023/table_chrome_116.0.5845.82.html)
- Supports async components like `import()` and `async` generators
- CSS scoping via shadow DOM
- Hopefully grokable/understandable code

The best part is that to use it I just have to import the files, that's it.

```javascript
import { div } from "./skruv/html.js";
import { renderNode } from "./skruv/vDOM.js";

let root = document.querySelector("#root");

root = renderNode(div({}, "Hello world!"), root);
```

On top of those advantages, I love the nested syntax, far shorter than JSX, now that I think about it feels weird that we moved to write HTML in JS.

You might be also wondering, "what if I need typescript, do you have to transpile?" the answer is no, you can use [JSDocs with Typescript](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) without having to create a single `ts` file.

## How it ended

I feel this change was a success, new code can be iterated easily without having to worry much about state or building, since the extension runs on modern browsers I don't have to care about babel, etc

Right now the only concern I have about the extension is _manifest v3_ which is not supported in Firefox yet, but this is a story for another post.

I have to say that I'm glad about the feedback people gave, this refactor was motivated because changes on Youtube made it fail and people reported issues with a lot of support, not only that, but I've seen articles written in Vietnamese, Japanese and German in how to use the extension and how they find it useful, it really makes me want to keep contributing free, anti-tracking open-source code.
