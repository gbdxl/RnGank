/**
 * Created by drmk on 2017/6/14.
 */
'use strict';

import {combineReducers} from 'redux';
import randomDataState from './randomDataState';
import homeDataState from './homeDataState'

export default combineReducers({
  randomDataState,homeDataState
})