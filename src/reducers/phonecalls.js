/*
 * Copyright (C) 2018 - 2019 Orange
 * 
 * This software is distributed under the terms and conditions of the 'MIT'
 * license which can be found in the file 'LICENSE.txt' in this package distribution 
 * or at https://spdx.org/licenses/MIT
 *
 */

 /* Orange contributed module for use on CozyCloud platform
 * 
 * Module name: MML - Mapping My Life
 * Version:     1.0.5
 * Created:     2018 by Orange
 */


import {
  RECEIVE_PHONECALLS
} from '../constants/actionTypes'

// reducer for phonecalls
const phonecalls = (state = { phonecalls: [] }, action) => {
  switch (action.type) {
    case RECEIVE_PHONECALLS:
      return {
        ...state,
        phonecalls: action.phonecalls
      }
    default:
      return state
  }
}
export default phonecalls
