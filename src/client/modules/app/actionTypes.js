import {
  NAME
} from './constants'

import defineActionType from 'utils/defineActionType'

export const TEST_ACTION = defineActionType(NAME, 'TEST_ACTION')
export const EPIC_TEST_ACTION = defineActionType(NAME, 'EPIC_TEST_ACTION')
