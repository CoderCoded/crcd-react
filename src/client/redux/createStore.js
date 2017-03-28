import _ from 'lodash'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { createEpicMiddleware, combineEpics } from 'redux-observable'

/**
 * Add needed rxjs modules here
 */
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/mapTo'

import log from '../utils/log'

import * as app from '../modules/app'

let store = null
const initialReducers = {
  [app.constants.NAME]: app.reducer
}

const epics = [
  ..._.values(app.epics)
]

const rootEpic = combineEpics(...epics)
const epicMiddleware = createEpicMiddleware(rootEpic)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/**
 * Creates a redux store with middleware and reducers using an initial state
 * @param  {object} initialState - Initial state for the store
 * @return {object} store - The created store
 */
export default function createReduxStore (initialState = {}) {
  let createStoreWithMiddleware

  createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(
      thunk,
      epicMiddleware
    )
  )(createStore)

  store = createStoreWithMiddleware(combineReducers(initialReducers))

  store._reducers = initialReducers

  /**
   * Register new reducers to the store.
   * @param  {object} newReducers - Reducers to add
   */
  store.registerReducers = (newReducers, update) => {
    store._reducers = { ...store._reducers, ...newReducers }
    if (update) store.updateReducers()
  }

  /**
   * Reset store reducers to initial (for logouts etc).
   */
  store.resetReducers = () => {
    store._reducers = initialReducers
    store.replaceReducer(combineReducers(store._reducers))
  }

  /**
   * Updates the store after new reducers are registered.
   */
  store.updateReducers = () => {
    store.replaceReducer(combineReducers(store._reducers))
  }

  store.log = log.child({childName: 'store'})

  // store.log.info('Store created.')

  return store
}

// Prevent redux hot updates (replaceReducer could be used but we know only initial reducers)
if (module.hot) {
  module.hot.accept()
}
