# Coder Coded HTML5 Boilerplate
---

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

HTML5 App boilerplate with following technologies:

- [Babel](http://babeljs.io/) for ES2015 and beyond
- [Webpack](http://webpack.github.io/) for client-side bundles
- [Redux](https://github.com/rackt/redux) for client-side state
- [Pure](http://purecss.io/) for client-side styles
- [PostCSS](https://twitter.com/postcss) with [PreCSS](https://jonathantneal.github.io/precss/) for style transforms
- [bunyan](https://github.com/trentm/node-bunyan) and [browser-bunyan](https://github.com/philmander/browser-bunyan) for logging
- [Express](http://expressjs.com/) for server-side app and API
- [Nunjucks](http://mozilla.github.io/nunjucks/) for server-side rendering

Stripped down version of [crcd-fullstack](https://github.com/CoderCoded/crcd-fullstack) for client-side apps.

#### Installation

```
npm install
```

#### Running Dev Server

```
npm run dev
```

Builds static views in dev mode and starts the express server and a webpack
server which handles the hot reload.

#### Building and Running Production Server

```
npm run build
npm run start
```

Does the same as dev build but instead of the webpack dev server, it creates a
webpack bundle. Static views are built in production mode and the express
server is started.

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
