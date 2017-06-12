/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {TabNavigator} from 'react-navigation'
import Home from './Home'
import Discover from './Discover'
import Mine from './Mine'
import config from '../utils/Config'

const TAB_INFO = [{
  title:"最新干货",
},{
  title:"发现",
},{
  title:"我的",
}];

export default class Main extends React.Component{

  static navigationOptions = ({navigation}) => {

    return {
      header:null,
    }
  };

  render(){
    return <MainTab/>
  }
}

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
      backgroundColor: config.themeColor,
      height: 50,
    },
    indicatorStyle: {height: 0},
    labelStyle: {
      fontSize: 9,
      margin:0,
    },
  }
});