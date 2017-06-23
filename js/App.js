/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import { View, TouchableOpacity, StatusBar, Platform } from 'react-native'
import { TabNavigator, StackNavigator, Header } from 'react-navigation'
import config from './utils/Config'
import Home from './containers/Home'
import Discover from './containers/Discover'
import Mine from './containers/Mine'
import WebViewPage from './containers/WebViewPage'
import GirlsPage from './containers/GirlsPage'
import TextListPage from './containers/TextListPage'
import Icon from 'react-native-vector-icons/Ionicons'

export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
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
    indicatorStyle: { height: 0 },
    labelStyle: {
      fontSize: 9,
      margin: 0,
    },
  }
});

const MainStack = StackNavigator({
  Main: {
    screen: MainTab,
  },
  WebViewPage: {
    screen: WebViewPage
  },
  GirlsPage: {
    screen: GirlsPage
  },
  TextListPage: {
    screen: TextListPage
  }
}, {
  headerMode: 'screen',
  navigationOptions: ({ navigation }) => {
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
    let headerLeft;
    let headerRight;
    if (navigation.state.routeName !== 'Main') {
      headerLeft = (
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}>
          <View style={{ padding: 12 }}>
            <Icon name={'ios-arrow-back-outline'} size={25} color='white'/>
          </View>
        </TouchableOpacity>);
      headerRight = (
        <TouchableOpacity >
          <View style={{ padding: 12 }}>
            <Icon name={'ios-bulb-outline'} size={25} color='white'/>
          </View>
        </TouchableOpacity>);
    }
    return {
      headerStyle,
      headerLeft,
      headerRight,
      headerTitleStyle: {
        color: '#FFFFFF',
        fontSize: 20,
        alignSelf: 'center',
      }
    }
  }
});
