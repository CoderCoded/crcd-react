import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-fastclick'

import 'react-hot-loader/patch'

import { Provider } from 'react-redux'
import { AppContainer as HotAppContainer } from 'react-hot-loader'
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
    <HotAppContainer key={Math.random()}>
      <Provider store={store}>
        <Container />
      </Provider>
    </HotAppContainer>
  ), appEl)
}

main()

if (module.hot) {
  module.hot.accept('./modules/app/index', () => {
    render(require('./modules/app').AppContainer)
  })
}
