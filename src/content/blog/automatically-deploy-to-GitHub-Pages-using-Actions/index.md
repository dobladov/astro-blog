---
title: "Automatically deploy to GitHub Pages using Actions"
description: How to automate your workflows increasing your productivity and reducing manual errors.
tags: [GitHub, devops, production, gh-pages]
pubDate: "2020-02-07"
updatedDate: "2023-08-13"
---

![List of github actions executed or failed](./actions.png)

This has become the main way to deploy most of my projects and it has greatly reduced the time invested doing it by hand, also avoiding headaches that you might be familiar with like, "ohhh! I forgot to checkout the proper branch", "I used the wrong script.", "I accidentally deleted the database and all the backups while updating a CSS color".

After setting up this workflow your code will be automatically deployed after each commit to master without human interaction and without having to use other service than GitHub.

> “There should be two tasks for a human being to perform to deploy software into a development, test, or production environment: to pick the version and environment and to press the “deploy” button.”
> ― David Farley, Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation

## Advantages

If just mentioning the world _"Automatically"_ does not catch your attention, these are some of the main reasons why is worth to write some tiny workflows.

### Single source of truth

Your code and and scrips for deployment are on same repository ensuring that all the information to create a build is on the repository and no manual process or tool is missing.

### Documentation of deployments

The `.yml` workflow shows how to do a proper deployment, other developers should know how it can be replicated locally; Even if there are no comments it might be easy to reverse engineer this files.

### Automated testing

Before each build tests can be enforce to avoid putting code on production that might contain errors or not follow the code style guide.

### No more manual tasks

This is clear, automating a process is always faster and in general less error prone than putting your code manually in production on a Friday before vacations.

### Multi-platform

Multiple platforms can be tested while doing the deployment without the need of the developers of installing virtual machines.

### Cost

Manual deployment will cost you at the very least time, GitHub actions are for free both in price and your time, why not use them?

## Creating a new Action

Choose a repository, go to Actions and add new one.

We need to create a new file, in this case is called `deploy.yml`, here we will define the process for the deployment, make sure to **never put any secrets in here** since it will be committed to the repository.

The structure goes this way, we need a `name`, `on` which circumstances we need to run this action, and which `jobs` the action will execute.

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Build
        uses: actions/setup-node@v4
        with:
          node-version: "22.x"
      - run: |
          npm install
          npm test
          npm run build
          touch dist/.nojekyll
          echo "snoo.odyssey.codes" > dist/CNAME
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages
          FOLDER: dist
```

After saving this new workflow we should have a file called `deploy.yml` inside `.github/workflows`.

Immediately a new action will be triggered executing the workflow, making a new build and pushing it to the `gh-pages` branch.

After is finish our app should be available at the repository public URL, the URL is show in Setting -> GitHub Pages, here you can also set a custom one.

### Functionality of each block

Let's go trough each part of the code.

Here we are indicating push code to master should trigger this Action.

```yml
on:
  push:
    branches:
      - master
```

Inside of jobs we have to define the machine that will run the code, in this case Ubuntu.

```yml
build-and-deploy:
	runs-on: ubuntu-latest
```

#### Steps of the job

The Action is now divided in different `steps` that will be executed sequentially.

This step will checkout your repository to make the code available.

```yml
- name: Checkout
  uses: actions/checkout@v4
```

Now we set node.js and we use version 13 to run the code, I would recommend to read the docs to do some other interesting stuff like running multiple node versions.

This step will be similar for other code like go or rust

```yml
- name: Build
  uses: actions/setup-node@v4
  with:
    node-version: "22.x"
```

The interesting part, here we have to define the process of actually building the site in this case something similar to what we would execute on our local machine to do it.

In this case I install the missing node packages, test the code and compile the site.

After this I added some special stuff for this repository, for example I make sure to create a file indicating that is not a Jekyll repository but this is actually not required in most cases.

After that I define the CNAME since I want this code to run on a custom domain instead of `user.github.io/repository`

```yml
- run: |
  npm install
  npm test
  npm run build
  touch dist/.nojekyll
  echo "snoo.odyssey.codes" > dist/CNAME
```

With this last step we push the code to the `gh-pages` branch of the repository

```yml
- name: Deploy
      uses: JamesIves/github-pages-deploy-action@releases/v3
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        BRANCH: gh-pages
        FOLDER: dist
```

If any of this steps fails the process will stop ensuring no "bad build" will be out on production.

## More about it

### Committing the build to a different repository

I had the use case of having to push the build to a different repository from the one where the sources are.

In this case I wanted to have the code of my blog on a repository and deploy this build to a GitHubs's special repository named name.github.io, to serve my personal page from here since 'gh-pages' does not work for this repository and my blog does not use Jekyll meaning the source code has to be on a separated repository and the build on master.

To create this token go to `Settings` -> `Developer settings` -> `Personal access tokens` and create a new one.

With this configuration, we can use a personal token that needs to be set on Settings -> Secrets, since the `secrets.GITHUB_TOKEN` only allows you to commit to your current repository.

```yml
- name: Deploy
      uses: peaceiris/actions-gh-pages@v4
      with:
        personal_token: ${{ secrets.PERSONAL_TOKEN }}
        external_repository: dobladov/dobladov.github.io
        publish_branch: master
        publish_dir: ./dist

```

### Testing multiple platforms

Different platforms might use different commands.

For example let's say there's a `rm` in the scripts of the package.js while this build should work on MacOS and Linux, unfortunately it will fail on Windows since the `rm` command is not available, with a multiple platform test we will realize that using a solution like `rimraf` instead of `rm` will solve the problem for Windows.

```yml
strategy:
      matrix:
        platform: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.platform }}
```

### Writing a CNAME for custom domains

If your deployments needs a custom domain don't forget to write this file on each build.

```bash
echo "snoo.odyssey.codes" > dist/CNAME
```

### Running actions on other events

Actions are not limited to push to master, is possible to also execute test or do other task on pull request or any kind of supported action, also to schedule this tasks using cron.

```yml
on:
  schedule:
    - cron: "0 * * * *"
```

### Not only for deployments

Actions can be used for creating new release packages, also notifications, emails can be send on each event, the limit is your imagination.

### Disadvantages

One of the main disadvantages, is that like any other service if is down you will not be able of deploying using these workflows, It does not limit you to still do manual deployments for your application.

If you wonder why your perfectly working action does not work don't forget to check: https://status.github.com/

Actions are not a 100% reliable if the infrastructure of GitHub fails, I had a problem where GitHub did not trigger one of my builds when I merged new code, a way to force a new commit without changes is to execute `git commit --allow-empty`, this will cause the action to be executed.

## Documentation

Documentation worth reading:

- [Node Action documentation](https://github.com/actions/setup-node)
- [Deploy Action documentation](https://github.com/JamesIves/github-pages-deploy-action)
- [GitHub Actions documentation](https://help.github.com/en/actions/automating-your-workflow-with-github-actions)
- [Checkout Action documentation](https://github.com/actions/checkout)

Some examples of my GitHub Actions:

- [Snoo](https://github.com/dobladov/snoo/blob/master/.github/workflows/deploy.yml)
- [Last-Time](https://github.com/dobladov/last-time/blob/master/.github/workflows/deploy.yml)
- [This blog](https://github.com/dobladov/mdx-blog/blob/master/.github/workflows/deploy.yml)
