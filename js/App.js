/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {View, Text, StatusBar, Platform} from 'react-native'
import {TabNavigator, StackNavigator, Header} from 'react-navigation'
import config from './utils/Config'
import Home from './containers/Home'
import Discover from './containers/Discover'
import Mine from './containers/Mine'

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent={true}
                   backgroundColor={'transparent'}/>
        <MainStack />
      </View>
    )
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

const MainStack = StackNavigator({
  Main: {
    screen: MainTab,
  },
}, {
  headerMode:'screen',
  navigationOptions: ({navigation}) => {
    let headerStyle = Platform.OS === 'android' ?
      {
        backgroundColor: config.themeColor,
        height: Header.HEIGHT + StatusBar.currentHeight,
        paddingTop: StatusBar.currentHeight
      }
      :
      {
        backgroundColor: config.themeColor,
      };
    return {
      headerStyle,
      headerTitleStyle: {
        color: '#FFFFFF',
        fontSize:20,
        alignSelf:'center',
      }
    }
  }
});
