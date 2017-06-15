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
  if (responseData.category.length > 0)
    return true;
  return false;
}

export function fetchLocalHomeData() {
  return (dispatch) => {
    let dao = new HomeDao();
    dao.getLocalData().then((data) => {
      dispatch(fetchSuccess(data));
    }).catch((error) => {
      dispatch(fetchData());
    })
  }
}

export function fetchData() {
  const url = fetchUrl.daily + getCurrentDate();

  function fetchDataFromNet(dispatch) {
    fetchWithTimeout(5000, fetch(url))
      .then((response) => response.json())
      .then((data) => {
        if (isValidData(data)) {
          Toast.show("欢迎阅读今日干货");
          // data.saveData(data);
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
        dispatch(fetchSuccess(data));
      } else {
        fetchDataFromNet(dispatch);
      }
    }).catch((error) => {
      fetchDataFromNet(dispatch);
    });
  }

}