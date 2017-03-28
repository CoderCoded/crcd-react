import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-fastclick'

import { Provider } from 'react-redux'
import { log } from './utils'
import store from './store'
import { AppContainer } from './modules/app'

Promise.config({
  // Enables all warnings except forgotten return statements.
  warnings: {
    wForgottenReturn: false
  }
})

global.APP_NAME = 'crcd-react'
global.log = log

function main () {
  render(AppContainer)
}

const appEl = document.getElementById('app')

function render (Container) {
  return ReactDOM.render((
    <Provider store={store}>
      <Container />
    </Provider>
  ), appEl)
}

main()
