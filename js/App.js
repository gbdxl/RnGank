/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {Text} from 'react-native'
import {TabNavigator, StackNavigator, TabBarBottom} from 'react-navigation'
import Home from './containers/Home'
import Discover from './containers/Discover'
import Mine from './containers/Mine'


export default class App extends React.Component {

  render() {
    return <MainTab/>
  }
}

// const MainStack = StackNavigator({
//   Main:{
//     screen:Home
//   }
// });

const MainTab = TabNavigator({
  Home: {
    screen: Home,
  },
  Discover: {
    screen: Discover
  },
  Mine: {
    screen: Mine
  },
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: 'black',
    showIcon: true,
    style: {
      backgroundColor: 'blue',
      height: 50,
    },
    indicatorStyle: {height: 0},
    labelStyle: {
      fontSize: 9,
      margin:0,
    },
  }
});