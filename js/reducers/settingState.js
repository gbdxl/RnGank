/**
 * Created by drmk on 2017/6/28.
 */
'use strict';
import * as TYPES from '../actions/actionTypes'
import config from '../utils/Config'

const initialState = {
  isOpenNightMode: false,
  colorScheme: {
    themeColor: config.themeColor,
    pageBgColor: '#f4f4f4',
    separatorColor: '#ccc',
    titleColor: '#000',
    subtitleColor: '#aaa',
    rowItemBackgroundColor: '#fff',
    arrowColor: '#ccc',
    tabIconColor: '#fff',
    thumbnailColor: '#f1f1f1',
  }
};

export default function settingState(state = initialState, action) {
  switch (action.type) {
    case TYPES.OPEN_NIGHT_MODE:
      return {
        ...state,
        isOpenNightMode: true,
        colorScheme: {
          themeColor: 'rgb(40,40,40)',
          pageBgColor: 'rgb(58,58,58)',
          separatorColor: 'rgb(54,54,54)',
          titleColor: 'rgb(177,177,177)',
          subTitleColor: 'rgb(130,130,130)',
          rowItemBackgroundColor: 'rgb(63,63,63)',
          arrowColor: 'rgb(200,200,200)',
          tabIconColor: 'rgb(230,230,230)',
          thumbnailColor: 'rgb(130,130,130)',
        }
      };
    case TYPES.CLOSE_NIGHT_MODE:
      return {
        ...state,
        isOpenNightMode: false,
        colorScheme: {
          themeColor: action.themeColor,
          pageBgColor: '#f4f4f4',
          separatorColor: '#ccc',
          titleColor: '#000',
          subtitleColor: '#aaa',
          rowItemBackgroundColor: '#fff',
          arrowColor: '#ccc',
          tabIconColor: config.themeColor,
          thumbnailColor: '#f1f1f1',
        }
      };
    case TYPES.CHANGE_COLOR:
      return{
        colorScheme:{
          ...state.colorScheme,
          themeColor: action.color,
        }
      };
    default:
      return{
        ...state
      }
  }
}