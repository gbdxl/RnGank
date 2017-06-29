/**
 * Created by drmk on 2017/6/28.
 */
'use strict';
import { AsyncStorage } from 'react-native'

const NIGHT_MODE = '@NIGHT_MODE';
const THEME_COLOR = '@THEME_COLOR';

export default class SettingDao {

  setNightMode = (isSave) => {
    try {
      AsyncStorage.setItem(NIGHT_MODE, isSave ? 'true' : 'false');
    } catch (error) {

    }
  };

  getNightMode = () => {
    return new Promise((resolve) => {
      resolve(AsyncStorage.getItem(NIGHT_MODE));
    })
  };

  setThemeColor = (color) =>{
    try {
      AsyncStorage.setItem(THEME_COLOR, color);
    } catch (error){
    }
  };

  getThemeColor = () =>{
    return new Promise((resolve)=>{
      resolve(AsyncStorage.getItem(THEME_COLOR));
    })
  };
}