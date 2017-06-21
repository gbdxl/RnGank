/**
 * Created by drmk on 2017/6/14.
 */
'use strict';

import { combineReducers } from 'redux';
import randomDataState from './randomDataState';
import homeDataState from './homeDataState'
import categoryDataState from './categoryDataState'

export default combineReducers({
  randomDataState, homeDataState, categoryDataState
});