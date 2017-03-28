# Coder Coded React Boilerplate
---

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A web app boilerplate with following technologies:

- [Babel](http://babeljs.io/) for ES6 syntax
- [Webpack](http://webpack.github.io/) for JS bundles
- [React](https://facebook.github.io/react/) for view components
- [Redux](http://redux.js.org/) for state handling
- [PostCSS](https://twitter.com/postcss) for styles
- [pino](https://github.com/pinojs/pino) for logging
- [Express](http://expressjs.com/) for dev app
- [Nunjucks](http://mozilla.github.io/nunjucks/) for server-side rendering

Stripped down version of [crcd-fullstack](https://github.com/CoderCoded/crcd-fullstack) for client-side apps (which is now deprecated, we swapped [riot](http://riotjs.com/) with [react](https://facebook.github.io/react/)).

#### Installation

```
npm install
```

#### Running Dev Server

```
npm run dev
```

Builds static views in dev mode and then starts a development server and a
webpack server which handles the hot reload. Defaults to port `3000` (with
webpack in `3001`).

#### Building and Running Production Server

```
npm run build
npm run start
```

Does the same as dev build but instead of the webpack dev server, it creates a
webpack bundle. Static views are built in production mode and the express
server is started. Defaults to port `8080`.

#### Serving with nginx or other http server

Just copy and serve `build/static/` and the client-side application is included in `index.html`.

#### Folder structure

- `src/` : Source for server (built using Babel)
  - `config/` : YAML or JSON configs for the web-server
  - `static/` : Static files and webpack build output
  - `static-views/` : Nunjucks templates to be rendered as static html files into `static/`
  - `client/` : Source for client (built using Webpack)
    - `components/` : Re-usable Riot components
    - `containers/` : "Smart" Riot components that are used as wrappers etc.
    - `redux/` : Everything related to redux (store, middlewares and modules)
    - `styles/` : Shared styles etc.
    - `utils/` : Helpers etc.
- `build/` : Build output
  - `static/dist` : Webpack output
- `.tmp/` : Temp builds in dev mode