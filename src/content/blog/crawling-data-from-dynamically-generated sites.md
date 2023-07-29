---
title: Crawling data from dynamically generated sites
tags: [js, devops, crawler]
description: How to get data from other sites using free online services
pubDate: "2020-02-14"
---

Let's start with the need, why I had the necessity to do this,
Recently I created this [Corona Virus Map](https://observablehq.com/@dobladov/coronavirus-2019-ncov), I wanted to be the fastest getting the data from the source site in Chinese, most of the other sites get the data periodical using a cron task and dumping their data locally.

In my case I wanted to get their data every time the map is loaded, ensuring more accurate results and completely avoiding any manual update of data.

## Parsing the site

So my first try was to curl the page and sadly the results for this [site](https://ncov.dxy.cn/ncovh5/view/pneumonia) will not load unless you use Javascript since the tables are dynamically generated.

This leave us with not many options but to use a browser, so in my case I decided to use Puppeteer, a headless Chrome browser to get the data.

So after a while playing with it I got the code to do it, it will download and log the data in the format that I need.

```Javascript
const fs = require('fs')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://ncov.dxy.cn/ncovh5/view/pneumonia')
  const data = await page.evaluate(body => {
    [...document.querySelectorAll(".close___2yTiY:not(.open___3it7L)")].forEach(e => e.click())
    return [...document.querySelectorAll('.areaBox___3jZkr')[1].querySelectorAll('.areaBlock2___27vn7')].map(row => {
      const [area, ,confirmed, dead, cured] = [...row.querySelectorAll('p')]
      return {
        area: area.innerText,
        confirmed: +confirmed.innerText || 0,
        dead: +dead.innerText || 0,
        cured: +cured.innerText || 0
      }
    })
  })
  console.log(data)
  fs.writeFileSync(`2020-02-16T21:21:26.466Z.json`, JSON.stringify(data, null, 2))
  await browser.close()
})()
```

After launching this script with `node crawler.js` I get a file that I can use as the source data of my visualization.

All fine but now I have another need, how to get this data every time I load the map?

For this I definitely need a server running but for this case I wanted to see what can I do with free services.

## Using Glitch

My first approach was to use [Glitch](glitch.com), after setting a express server and a few tries later I got my data every time I curl this url: https://coronacrawler.glitch.me

```javascript
const express = require("express")
const app = express()
const puppeteer = require('puppeteer')

app.use(express.static("public"))

app.get("/", async function(request, response) {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });

    // Same code to get the data before

    res.json(data)
  } catch (error) {
    console.log(error)
  }
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port)
})
```

Cool, but this creates another problem.

### Cross-origin

The map running in ObservableHQ needs to crawl this data and unfortunately if you curl a different domain from a website it needs to have Cross-origin headers enabled or for security reasons it will not load, after adding this to our express server it works.

```javascript
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
```

#### Alternative to Cross-origin

Another solution if adding the headers is impossible (For example in a server we can't control), we can use a service like [cors-anywhere](https://cors-anywhere.herokuapp.com/), just changing the URL to be:

```bash
https://cors-anywhere.herokuapp.com/https://coronacrawler.glitch.me
```

#### Problems with Glitch

Nice, now I have a server running and I can query the data, what else can I ask for? Well while this works there are two main problems, Glitch is more of a place for playing with code and experimenting so it will not be fast.

Glitch servers go to sleep, it's perfectly understandable, it makes no sense for Glitch to give computing power for free running all the time, after some period of inactivity the machine will go to sleep and it needs to be awaken the next time, this makes the map unresponsive if there are not many queries and it gives the sensation of being more slow than it is.

At this point I moved to zeit.co

## Using Zeit.co

Why use zeit.co when Glitch is working?

This service offers quite a nice free "Hobby" service allowing to use serverless functions.

### Creating a serverless function

We need to modify the previous script a little since we have other constrains.

First we need a start point for the api query in this case we need a file in `/api/index.js`

```javascript
const getData = require('./getData')

module.exports = async (req, res) => {
  const data = await getData()
  res.json(data)
}
```

The first problem I encountered is that using puppeteer is a little bit different, luckily this guide [Serverless Chrome via Puppeteer with Now 2.0](https://zeit.co/blog/serverless-chrome) explains how to do it well.

```javascript
const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const getData = async () => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  })

  const page = await browser.newPage()
  await page.goto('https://ncov.dxy.cn/ncovh5/view/pneumonia')

// Same code to get the data before

  return data
}

module.exports = getData
```

#### Supporting Cross-origin

To enable cors we need a file `/api/200.js`

```javascript
module.exports = async (req, res) => {
  res.status(200).send({ message: 'cors ok' });
}
```

Also our `now.js` file should look like this.

```javascript
{
  "version": 2,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js",
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      }
    }
  ]
}
```

After this using the command `now` should upload the project to zeit.co and the data is available on the project url https://cvirus.dobladov.now.sh/

## Notes

As an alternative to Glitch and Zeit we can use [Netlify](https://docs.netlify.com/functions/overview/#manage-your-serverless-functions), but for this project it was not necessary.

I'm not affiliated to Glitch of Zeit.co in any way, I just think both are really nice services to run my apps.
