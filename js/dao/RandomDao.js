/**
 * Created by drmk on 2017/6/14.
 */
'use strict';

const RANDOM_DATA = '@RandomData';

import {AsyncStorage} from 'react-native';

export default class RandomDao{
  saveData(data){
    try {
      AsyncStorage.setItem(RANDOM_DATA, JSON.stringify({content: data}));
    }catch (error){

    }
  }

  fetchLocalDao(){
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(RANDOM_DATA, (error, result) => {
        if (!error) {
          const json = JSON.parse(result);
          if (json) {
            resolve(json.content);
          } else {
            reject(null);
          }
        } else reject(null);
      });
    });
  }

}