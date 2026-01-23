---
title: Upgrade Your Actions
pubDate: 2026-01-23
description: How to stay up to date with your GitHub Actions and reduce unnecessary dependencies in your workflows.
tags: [github, actions, devops, automation, workflow, cli, maintenance]
draft: false
---

Some care about updating their dependencies, many neglect the dependencies in their workflows, that's why I decided to vibe/make this tool.

It provides a simple way to know what needs to be upgraded in your GitHub actions, when executed, it shows a list of all the third party actions that can be upgraded and to review the changes.

The vibing took a while to get right, [Claude](https://claude.ai/download) did produce a working tool on the first try, but the first solution was too naive, using 2 requests per action to get the releases and tags, which causes it to reach the API limit very soon blocking any new requests.

I had to refactor the code to use GraphQL, which unfortunately requires using a `GH_TOKEN`, but now all information is requested much faster with a single request.

Some other cleanups were required to make the tool simpler, like removing unnecessary filters, optimize grouping and sorting, and improving the output format.

Checkout the tool on Gist: [check-actions.js](https://gist.github.com/dobladov/ca10840ca830e687f4ff7c3c414dbad7)

![Command output](./command-output.png)

## Getting rid of unnecessary actions

Even better than having to update your actions is to get rid of them with tools that are already there, I like to use the [gh-cli](https://cli.github.com/manual/) to replace some unnecessary actions, this brings many advantages:

- It’s always up-to-date with the changes on GitHub
- Standardized API, simplifying many of the common tasks
- Reduces third party libraries (more secure)
- Faster, no need to set the action with `uses` (already pre-installed in all public runners)
- Can be executed in the local terminal, easier to test
- Has many of the common functionality that requires using the rest API

I had to do clean-up in a big monorepo, and here are some of the actions I replaced:

- [peter-evans/create-pull-request](https://github.com/peter-evans/create-pull-request) → `gh pr create ….`
- [actions-ecosystem/action-add-labels](https://github.com/actions-ecosystem/action-add-labels) → `gh pr edit --add-label <name>`
- [actions/github-script](https://github.com/actions/github-script) (used to create comments) → `gh pr comment ...`
- [actions-ecosystem/action-add-assignees](https://github.com/actions-ecosystem/action-add-assignees) → `gh pr edit --add-assignee <name>`
- Some scripts using fetch to merge a PR → `gh pr merge --squash`

After the changes, all the logic was reduced, required less maintenance, and it was unified.

As a reminder whenever possible [become your company janitor](https://dobla.do/blog/become-your-companys-javascript-janitor/), everyone appreciates the cleanup and improvements.
