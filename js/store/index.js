/**
 * Created by drmk on 2017/6/14.
 */
'use strict';

import {createStore,applyMiddleware} from 'redux'
import reducers from '../reducers/index'
import thunkMiddleware from 'redux-thunk'

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export const store = applyStoreMiddleware(reducers);
