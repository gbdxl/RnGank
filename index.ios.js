/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './js/store/index';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './js/App'

export default class RnGank extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RnGank', () => RnGank);
