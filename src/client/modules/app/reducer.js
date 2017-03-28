import {
  TEST_ACTION,
  EPIC_TEST_ACTION
} from './actionTypes'

export default function reducer (state = {
  tested: false,
  epicTested: false
}, action) {
  switch (action.type) {
    case TEST_ACTION:
      return {
        ...state,
        tested: true
      }
    case EPIC_TEST_ACTION:
      return {
        ...state,
        epicTested: true
      }
    default:
      return state
  }
}
