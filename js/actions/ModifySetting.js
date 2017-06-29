/**
 * Created by drmk on 2017/6/28.
 */
'use strict';
import * as TYPES from '../actions/actionTypes'
import SettingDao from '../dao/SettingDao'

export function initSetting() {
  return (dispatch) => {
    const settingDao = new SettingDao();
    settingDao.getNightMode().then((isNightMode) => {
      setNightMode(isNightMode);
      if (!isNightMode){
        settingDao.getThemeColor().then((color)=>{
          setThemeColor(color);
        })
      }
    })
  }
}

export function setNightMode(value) {
  return (dispatch) => {
    const settingDao = new SettingDao();
    settingDao.setNightMode(value);
    if (value) {
      return dispatch({ type: TYPES.OPEN_NIGHT_MODE });
    } else {
      return dispatch({ type: TYPES.CLOSE_NIGHT_MODE });
    }
  }
}

export function setThemeColor(color) {
  return (dispatch) => {
    const settingDao = new SettingDao();
    settingDao.setThemeColor(color);
    return dispatch({ type: TYPES.CHANGE_COLOR, color: color });
  }
}
