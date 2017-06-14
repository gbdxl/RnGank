/**
 * Created by drmk on 2017/6/14.
 */
'use strict';

import * as Type from '../actions/actionTypes'

const initialState = {
  dataSource: [],
  loading: false,
  error: false,
  isRenderFooter: false
};

export default function randomDataState(state = initialState, action){
  switch (action.type){
    case Type.FETCH_RANDOM_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        isRenderFooter: false,
        error: false
      };
    case Type.FETCH_RANDOM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        isRenderFooter: false,
        error: false,
        dataSource:action.dataSource
      };
    case Type.FETCH_RANDOM_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        isRenderFooter: false,
        error: true
      };
    case Type.FETCH_RANDOM_MORE_DATA_REQUEST:
      return {
        ...state,
        loading: false,
        isRenderFooter: true,
        error: false
      };
    case Type.FETCH_RANDOM_MORE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        isRenderFooter: false,
        error: false,
        dataSource:state.dataSource.concat(action.dataSource)
      };
    case Type.FETCH_RANDOM_MORE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        isRenderFooter: false,
        error: true
      };
    default:
      return state;
  }

}
