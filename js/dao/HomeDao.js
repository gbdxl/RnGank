/**
 * Created by drmk on 2017/6/14.
 */
import {AsyncStorage} from 'react-native'
import {getCurrentDate} from '../utils/getDate'

const HOME_DATA = "@HOME_DATA";
export default class HomeDao {

  saveData = (data) => {
    try {
      let json = JSON.stringify({content: data});
      json["time"] = getCurrentDate();
      AsyncStorage.setItem(HOME_DATA, json);
    } catch (error) {
      console.error(error);
    }
  };

  getLocalData = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(HOME_DATA, (error, result) => {
        if (!error) {
          const json = JSON.parse(result);
          if (json)
            resolve(json.content);
          else
            reject(null);
        } else {
          reject(null);
        }
      });
    });
  }
}