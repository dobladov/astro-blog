---
title: "Rust with a taste of React"
pubDate: 2025-09-12
description: "Learning Rust and finding similar patterns to React with the Dioxus framework"
tags: ["rust", "react", "react-native", "development", "dioxus", "frontend", "ui", "programming"]
---

## Learning Rust

For the past months I have been more and more interested in [Rust](https://rust-lang.org/), some of my preferred sources for learning are the following:

- [Rustbook](https://doc.rust-lang.org/book/): The most in-depth resource, a must for everyone who aims to learn the language, more dense than the rest of the other resources I will mention, probably the most cared and complete resource made by the community.
- [MIT’s introduction to Rust](https://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/second-edition/index.html): I loved reading it, the lessons go straight to the point and it rarely feels boring, it made the learning process far easier than the official Rust book.
- [Rust Cookbook](https://rust-lang-nursery.github.io/rust-cookbook/): following the philosophy of teaching by example, wonderful to understand real cases with short snippets.
- [Learn X in Y minutes](https://learnxinyminutes.com/rust/): a short overview of the language, a good site for any programming language.
- [Exercism](https://exercism.org/tracks/rust): I completed some of the exercises here, and while I didn’t use it in depth, I still consider it a good resource.

## The value of Rust

One of the best improvements in my work life has been TypeScript. The introduction of type safety has improved my confidence when refactoring code so much that I can't imagine writing plain JavaScript anymore, at least not without [JSDoc](https://jsdoc.app/) and TS checking it. So what if I could take that safety even further and catch many issues before the code even compiles?

Most of the concepts that Rust introduces make a lot of sense, immutable by default, influenced by functional programming, good pattern matching, and the most important or what makes it different, borrow checking entirely avoiding garbage collection.

## Writing UIs with Rust

Now that I’m at a point where all Rust concepts and patterns finally clicked and make sense, I wanted to see what can I do with it and Rust has these wonderful pages [Are we Rust yet?](https://github.com/UgurcanAkkok/AreWeRustYet) to showcase what’s the current state of the language on different fields, and as a frontend dev, the page that caught my attention first was [Are we GUI yet?](https://areweguiyet.com/).

First I tried [EGui](https://www.egui.rs/):

> An easy-to-use immediate mode GUI that runs on both web and native. 

Their [demo](https://www.egui.rs/#demo) is incredible, super fast, well-made, with tons of examples, but with a huge problem, using right click reveals that all the UI is drawn to canvas, which is not ideal for accessibility, so I kept looking until I found the topic of this post, [Dioxus](https://dioxuslabs.com/).

## The Dioxus framework

> Elegant **React-like** library for building user interfaces for desktop, web, mobile, SSR, liveview, and more.

Everything about this framework looks amazing, it targets all the platforms that I work on,with all the nices things about Rust, sub-second hot reloads, not rendering to a canvas, and the most important thing it feels like writing React, the framework I have been using for many years professionally.

I bet most React developers who never touched Rust can read this component code without much issue.

```rust
use dioxus::prelude::*;

pub fn App() -> Element {
    let mut count = use_signal(|| 0);

    rsx! {
        h1 { "High-Five counter: {count}" }
        button { onclick: move |_| count += 1, "Up high!" }
        button { onclick: move |_| count -= 1, "Down low!" }
    }
}
```

Yes, `use_signal` is not named `useState` and the syntax is slightly off from JS with `let mut`  and `pub fn` and of course is not `jsx` but `rsx`, anyway, the structure and overall feel of a React component is there.

And for me this is wonderful, not only it brings those advantages, but simplifies all the development experience to just Rust, something that an alternative like react-native does not, in general react-native apps are very complex and weirdly put together.

![image.png](./project-files.png)

So far I only used Dioxus for test projects, it's just so simple to set and run with `dx new [project-name]`, their get started [“Hot Dog”](https://dioxuslabs.com/learn/0.7/tutorial/component) app covers a good chunk of what's needed for a web app including data fetching, state management, UI, and their hooks like `use_resource` feel well thought and useful, with request invalidation integrated.

There are also some negatives, as a new framework in constant development I could find some annoying bugs, some programs like widgets are not possible to develop with it yet, the ecosystem is clearly lacking compared with react-native, the initial compile time is slower too, there’s less information online and its future is not as sure, if they continue improving it I can see Dioxus as a good competitor to React Native and becoming a great tool for multi-platform development, while being more consistent and unified under Rust.

This is the current state, in the near future I hope to make more use of Dioxus and ideally find it as useful as React-Native has been, while giving me even more safety and performance.
