import React, { Component, PropTypes } from 'react'

import { autobind } from 'utils'

import {
  NAME
} from './constants'

import './App.css'

export class App extends Component {
  constructor (props) {
    super(props)
    autobind(this)
    this.log = log.child({component: 'App'})
    this.log.info('App created.')
  }

  static propTypes = {
    testAction: PropTypes.func.isRequired,
    tested: PropTypes.bool.isRequired,
    epicTested: PropTypes.bool.isRequired
  }

  render () {
    const {
      testAction,
      tested,
      epicTested
    } = this.props

    return (
      <div>
        <h2>React boilerplate with redux and redux-observable</h2>
        <button onClick={() => testAction()}>Test</button>
        <p>Test done: <strong>{ tested ? 'TRUE' : 'FALSE' }</strong></p>
        <p>Epic test done: <strong> { epicTested ? 'TRUE' : 'FALSE' }</strong></p>
      </div>
    )
  }
}

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from './actions'

const mapStateToProps = state => state[NAME]
const mapDispatchToProps = dispatch => bindActionCreators({
  ...actions
}, dispatch)
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
export default AppContainer

if (module.hot) {
  module.hot.accept()
}
