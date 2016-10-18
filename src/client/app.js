import 'babel-polyfill'

import log from './utils/log'
global.log = log
global.APP_NAME = 'crcd-html5'

// import store from './store'
// import riot from 'riot'

const initApp = () => {
  log.info('App initialized.')
}

initApp()
