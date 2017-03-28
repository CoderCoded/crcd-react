import {
  TEST_ACTION,
  EPIC_TEST_ACTION
} from './actionTypes'

export const testEpic = (action$, store) =>
  action$.ofType(TEST_ACTION)
    .delay(1000)
    .mapTo({type: EPIC_TEST_ACTION})
