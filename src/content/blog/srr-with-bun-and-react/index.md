---
title: SSR with Bun and React
pubDate: 2025-01-28
description: How to set up a server side rendered app using Bun, react and react-router
tags: [javascript, deno, node, bun, ssr, react, development, programming, deno]
draft: false
---

The goal is to have a server able to stream React Components directly from the server using the client for navigation, removing the need to request data from the server after the first load, some call it *"Universal Data Fetching"* or *"Isomorphic Data Fetching"*. 

> This pattern ensures that the data required to render a page is fetched on the server during the initial request and then re-fetched or reused on the client side for subsequent interactions.

The full repository with the code can be seen in [dobladov/bun-ssr-react](https://github.com/dobladov/bun-ssr-react), I’ll be omitting all imports to keep the snippets shorter.

**⚠️ Disclaimer**: I'm not implementing [React Server Components](https://react.dev/reference/rsc/server-components), but good old React hydrated on the client.

I want to mention another repo that is doing similar logic, but all responses come from the sever: [alexkates/ssr-bun-react](https://github.com/alexkates/ssr-bun-react/blob/main/index.tsx), a good approach if you want to have a more traditional SSR.

## Why did I choose Bun?

It’s a batteries includes tool, if you had to make SSR work with webpack and node, you might know how much of a pain is to deal with JSX in both in the server and client, then add other issues like babel plugins, common JS modules vs ESM and you realize most of the setup is to exists to fix issues related to JavaScript instead of focusing on writing code.

Bun solves all of those directly for you, including the server, although you might want to use [Elysia](https://elysiajs.com/) or [Express](https://expressjs.com/) for more complex apps.

I have to be honest, so far I’m not using [Bun](https://bun.sh/) at work or in any projects that are critical, only side projects and occasional scripts, but I love it so far, and the only thing that worries me is the company behind it cutting funding or trying to lock you in their ecosystem or the main developers leaving the project, because wow, what an incredible job they are making with such a small team.

In any case it’s a project that’s forcing [Node](https://nodejs.org/en) and [Deno](https://deno.com/) to improve themselves and this competition so far brings many new functionalities that make my work easier.

## Build process

We start by creating a new bun project and adding the dependencies

```bash
mkdir example-bun-ssr
cd example-bun-ssr
bun init
# package name (example-bun-ssr):
# entry point (index.ts): src/index.tsx
bun add react react-dom react-router
```

Let’s add a script  to `pacakge.json` to run in dev mode and also watch for changes.
If you wonder why `.tsx` is because I want to have [JSX](https://react.dev/learn/writing-markup-with-jsx) directly in this file.

```bash
  "scripts": {
    "dev": "bun run --watch src/index.tsx"
  },
```

We need an entry point for the client build and to generate it to our public folder, we can start by adding this to [src/index.tsx](https://github.com/dobladov/bun-ssr-react/blob/main/src/index.tsx).

```tsx
Bun.build({
    entrypoints: ['./src/client.tsx'],
    outdir: 'src/public/'
})
```

## Client logic

[src/client.tsx](https://github.com/dobladov/bun-ssr-react/blob/main/src/client.tsx) has two goals, to [hydrate](https://react.dev/reference/react-dom/client/hydrateRoot) React once the file is loaded so we can interact with the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)  on the client, and to generate the routing for client navigation.

<details>
<summary>Rant about react-router</summary>
I’m very disappointed with the approach of react-router for their docs, they definitely care about the project and add cool functionality, but I find the docs completely lacking and confusing, I can’t link any of the next functions that I’m mentioning, there are barely any example of how to do SSR, and the framework vs library approach is confusing to even people experienced in using it, there are also may methods that I can’t even find in the API reference even when they are not deprecated, the only way I found to understand how to implement this was to do searches in the repo.

For next projects I will look at alternatives like [TanStack Router](https://tanstack.com/router/latest).
</details>

We need `<RouterProvider` to create a router that can use loaders otherwise a simple `<BrowserRouter` would be enough.

`createBrowserRouter` is equivalent to `<BrowserRouter`, but we need to call it this way for our purpose and I like to use `createRoutesFromElements` because I find JSX more intuitive for nested routes.

```bash
const root = document.getElementById('root');

if (root) {
    hydrateRoot(root, (
        <RouterProvider router={
            createBrowserRouter(
                createRoutesFromElements(
                    Routing()
                )
            )
        } />
    ));
}
```

## Routes

Our routes can be very simple, in [src/routing.tsx](https://github.com/dobladov/bun-ssr-react/blob/main/src/routes.tsx) we have the following, note that we will re-use this file for server and client which gives us a very clean way to handle our app with minimal config.

An `errorElement` to act as an [error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

`<Route>` for each of the routes and inside the only more unusual prop is `loader`, used to get the data before the route is loaded.

```jsx
export const Routing = () => {
  return (
    <Route errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={<Home />}
          loader={getData}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
  )
}
```

The components are really simple:

```jsx
// https://github.com/dobladov/bun-ssr-react/blob/main/src/ErrorPage.tsx
export const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div>
            <div>Something went wrong</div>
            <pre>{JSON.stringify(error, null, 2)}</pre>
            <Link to="/">Go back to home</Link>
        </div>
    )
}
```
`useLoaderData` will give us the data requested in the `loader` prop

```jsx
// https://github.com/dobladov/bun-ssr-react/blob/main/src/Home.tsx
export const Home = () => {
    const data = useLoaderData<InitialData>();

    useEffect(() => {
        console.log('Home loaded');
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <Link to="/about">About</Link>
        </div>
    )
};
```

```jsx
// https://github.com/dobladov/bun-ssr-react/blob/main/src/About.tsx
export const About = () => {
    
    useEffect(() => {
        console.log('About loaded')
    }, [])

    return (
        <div>
            <h1>About</h1>
            <Link to="/">Home</Link>
        </div>
    )}
```

```jsx
// https://github.com/dobladov/bun-ssr-react/blob/main/src/NotFound.tsx
export const NotFound = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go to Home</Link>
  </div>
);
```

To get the data, we need [src/utils.ts](https://github.com/dobladov/bun-ssr-react/blob/main/src/utils.ts) with a simple async function that calls an API we will create later on the server.

```jsx
export const getData = async () => {
    const response = await fetch('http://localhost:5000/api/example')
    const json = (await response.json()) as InitialData;
    return json
}
```

Congrats we wrote most of our app, at least the client, we could easily use Bun’s newest [HTML static import](https://bun.sh/blog/bun-v1.2#html-imports) and have a client side rendered react app, but we are here to aim for the stars and to do SSR, so let’s do that now and create the server.

## Server logic

We are again back to [src/index.tsx](https://github.com/dobladov/bun-ssr-react/blob/main/src/index.tsx), take a moment to appreciate how simple the code is.

We need to create a server that listens on a port, and we have some basic path name matching the incoming URL, that's it.

```jsx
const server = Bun.serve({
    port: 5000,
    async fetch(req) {
      const {pathname} = new URL(req.url);
      console.info(`Requesting: ${pathname}`);

      // 1. Static assets
      if (pathname.startsWith("/public/")) {
        const file = Bun.file(__dirname + pathname);
        return new Response(file);
      }

      // 2. Example API
      if (pathname === '/api/example') {
        return Response.json({ message: 'Hello, World!' });
      }

      const routes = createRoutesFromElements(Routing());
      
      let { query, dataRoutes } = createStaticHandler(routes);
      let context = await query(req) as StaticHandlerContext;
      let router = createStaticRouter(dataRoutes, context);

      // 3. Server-side rendering
      const stream = await renderToReadableStream(
          <App>
            <StaticRouterProvider
              router={router}
              context={context}
            />
          </App>,           
        );
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        });
    },
  });

console.info(`Listening on http://localhost:${server.port}`);
```

Let’s analyze each match:

1. Allows to serve our static assets in the public folder including the client build generated at the beginning with `Bun.build`, our CSS, favicon, images can be served this way.
2. Just an example of a JSON API, that both client and server can request.
3. Here comes the magic that makes SSR possible, we re-use the client routes with `createRoutesFromElements`, and we need `createStaticHandler` and `createStaticRouter` again here because we use a `loader` prop in our `Routes`. 

Once we have created the routing, we can stream the App with [renderToReadableStream](https://react.dev/reference/react-dom/server/renderToReadableStream).

We miss only one last component, [src/App.tsx](https://github.com/dobladov/bun-ssr-react/blob/main/src/App.tsx), which is an HTML wrapper where we render the server components and load our client.

```jsx
export const App = (props: Props) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </head>
            <body>
                <div id="root">{props.children}</div>
                <script type="module" src="/public/client.js"></script>
            </body>
        </html>
    )
}
```

And we are ready, `bun run dev` should lunch the server and provide the URL [http://localhost:5000](http://localhost:5000/) where we can check our app.

## Retrospective

As mentioned I like how simple everything is, at least compared to another production project at work with the same goal using node, express and webpack, this far more maintainable, the build is faster and overall improves in all areas, with far less dependencies.

I will definitely use Bun more and more if they continue providing so much value out of the box, at the moment I'm working on a side project that relies in their [SQLitle](https://bun.sh/docs/api/sqlite) implementation and I'm very happy with it.

![glitched-food-bun](./bun.png)
