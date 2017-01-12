global.Promise = require('bluebird')
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'
global.CONFIG = require('config')
const APP_NAME = require('../package.json').name

/**
 * Coded Coded fullstack base modified for client-only development
 */

import 'babel-polyfill'

import http from 'http'
import Express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import path from 'path'
import pino from 'pino'
import cuid from 'cuid'
import serveStatic from 'serve-static'
import { INTERNAL_SERVER_ERROR } from 'http-codes'

const app = new Express()
const server = http.createServer(app)
global.log = pino({
  name: APP_NAME,
  level: __DEVELOPMENT__ ? 'debug' : 'info'
})

// Reload if dev mode
if (__DEVELOPMENT__) {
  const reload = require('reload')
  // Wait 1500ms (adjust this if server restart takes longer)
  reload(server, app, 1500)
}

app.use(compression())
app.use(favicon(path.join(__dirname, 'static', 'icons/favicon.ico')))

app.use(serveStatic(path.join(__dirname, 'static')))

if (__DEVELOPMENT__) {
  // Include .tmp for static views etc
  app.use(serveStatic(path.join(__dirname, '../.tmp/static')))
}

// Bunyan logs for each request
app.use((req, res, next) => {
  req.log = log.child({ req_id: cuid() }, true)
  req.log.info({ req: req, xhr: req.xhr, user: req.user })
  next()
})

// Error handler
app.use((err, req, res, next) => {
  log.error(err)
  res.status(INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error.'
  })
  next(err)
})

const port = process.env.PORT || 3000
server.listen(port, function (err) {
  if (err) {
    log.error({err}, 'Server failed to start.')
  }
  console.log(`[${new Date().toISOString()}] Server listening on port ${port}`)
  log.info('Server listening on port %s', port)
})

function gracefulShutdown () {
  console.log(`[${new Date().toISOString()}] Waiting for all requests to finish...`)
  log.info('Waiting for all requests to finish...')
  server.close(function () {
    console.log(`[${new Date().toISOString()}] Server shutting down...`)
    log.info('Server shutting down...')
    process.exit(0)
  })
}

if (!__DEVELOPMENT__) {
  process.on('SIGINT', gracefulShutdown)
  process.on('SIGTERM', gracefulShutdown)
}
