/**
 * Created by drmk on 2017/6/14.
 */
'use strict';
import * as Types from '../actions/actionTypes'

const initialState = {
  headerUrl: "",
  androidData: [],
  iosData: [],
  videoData: [],
  recommendData: [],
  appData: [],
  foregroundData: [],
  developData: [],
  loading: false,
  isUpdate: false,
};

export default function homeDataState(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_HOME_DATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FETCH_HOME_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        headerUrl: action.results.福利[0].url ? action.results.福利[0].url : "",
        androidData: action.results.Android ? action.results.Android : [],
        iosData: action.results.iOS ? action.results.iOS : [],
        videoData: action.results.休息视频 ? action.results.休息视频 : [],
        recommendData: action.results.瞎推荐 ? action.results.瞎推荐 : [],
        appData: action.results.App ? action.results.App : [],
        foregroundData: action.results.前端 ? action.results.前端 : [],
        developData: action.results.拓展资源 ? action.results.拓展资源 : [],
      };
    case Types.FETCH_HOME_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;

  }
}