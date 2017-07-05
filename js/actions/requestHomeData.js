/**
 * Created by drmk on 2017/6/14.
 */
'use strict';

import * as Types from '../actions/actionTypes';
import HomeDao from '../dao/HomeDao';
import Toast from 'react-native-root-toast';
import fetchWithTimeout from '../utils/fetchWithTimeout';
import fetchUrl from '../utils/fetchUrl';
import {getCurrentDate} from '../utils/getDate';

function fetchSuccess(json) {
  return {
    type: Types.FETCH_HOME_DATA_SUCCESS,
    results: json.results
  };
}

function fetchHomeData() {
  return {
    type: Types.FETCH_HOME_DATE_REQUEST,
  }
}

function fetchFailure() {
  return {
    type: Types.FETCH_HOME_DATA_FAILURE,
  }
}

function isValidData(responseData) {
  return responseData.category.length > 0;
}

export function fetchLocalHomeData() {
  return (dispatch) => {
    let dao = new HomeDao();
    dao.getLocalData().then((data) => {
      dispatch(fetchSuccess(data.content));
      Toast.show("今日已经更新过了");
    }).catch((error) => {
      dispatch(fetchData());
    })
  }
}

export function fetchData() {
  const url = fetchUrl.daily + getCurrentDate();
  let dao = new HomeDao();
  function fetchDataFromNet(dispatch) {
    fetchWithTimeout(5000, fetch(url))
      .then((response) => response.json())
      .then((data) => {
        if (isValidData(data)) {
          Toast.show("欢迎阅读今日干货");
          dao.saveData(data);
          dispatch(fetchSuccess(data));
        } else {
          Toast.show("今日干货尚未更新");
          dispatch(fetchFailure());
        }
      }).catch((error) => {
        dispatch(fetchFailure());
      })
  }

  return (dispatch) => {
    dispatch(fetchHomeData());
    let dao = new HomeDao();
    dao.getLocalData().then((data) => {

      if (data.time === getCurrentDate()) {
        Toast.show("已经是最新数据了");
        dispatch(fetchSuccess(data.content));
      } else {
        fetchDataFromNet(dispatch);
      }
    }).catch((error) => {
      fetchDataFromNet(dispatch);
    });
  }

}
