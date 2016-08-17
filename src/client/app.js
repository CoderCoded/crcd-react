import 'babel-polyfill'

import log from './utils/log'
global.log = log
global.APP_NAME = 'crcd'

// import store from './store'
// import riot from 'riot'
// import route from 'riot-route'

const initApp = () => {
  log.info('App initialized.')
}

initApp()
