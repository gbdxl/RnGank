/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {View, Text, StatusBar, Platform} from 'react-native'
import {TabNavigator, StackNavigator, Header} from 'react-navigation'
import Main from './containers/Main'
import config from './utils/Config'

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

const MainStack = StackNavigator({
  Main: {
    screen: Main,
  },
}, {
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
      }
    }
  }
});
