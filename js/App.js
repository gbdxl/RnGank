/**
 * Created by looper on 2017/6/9.
 */
import React from 'react'
import { View, TouchableOpacity, StatusBar, Platform } from 'react-native'
import { TabNavigator, StackNavigator, Header } from 'react-navigation'
import Home from './containers/Home'
import Discover from './containers/Discover'
import Mine from './containers/Mine'
import WebViewPage from './containers/WebViewPage'
import GirlsPage from './containers/GirlsPage'
import TextListPage from './containers/TextListPage'
import ThemeChangePage from './containers/ThemeChangePage'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as Actions from './actions/ModifySetting'
import { bindActionCreators } from 'redux'

class App extends React.Component {

  componentDidMount() {
    this.props.actions.initSetting();
  }

  render() {
    const MainStack = mainStackCreator(this.props);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true}
                   backgroundColor={'transparent'}/>
        <MainStack />
      </View>
    )
  }
}

const mainTabCreator = (props) => {
  return TabNavigator({
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
      activeTintColor: props.themeColor,
      inactiveTintColor:'gray',
      showIcon: true,
      style: {
        backgroundColor: props.rowItemBackgroundColor,
        height: 50,
      },
      indicatorStyle: { height: 0 },
      labelStyle: {
        fontSize: 9,
        margin: 0,
        paddingBottom: 6
      },
    },
  });
};

const mainStackCreator = (props) => {
  const MainTab = mainTabCreator(props);
  return StackNavigator({
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
    },
    ThemeChangePage: {
      screen: ThemeChangePage
    }
  }, {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => {
      let headerStyle = Platform.OS === 'android' ?
        {
          backgroundColor: props.themeColor,
          height: Header.HEIGHT + StatusBar.currentHeight,
          paddingTop: StatusBar.currentHeight
        }
        :
        {
          backgroundColor: props.themeColor,
        };
      let headerLeft = <View/>;
      let headerRight = <View/>;
      if (navigation.state.routeName !== 'Main') {
        headerLeft = (
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}>
            <View style={{ padding: 12 }}>
              <Icon name={'ios-arrow-back-outline'} size={25} color={props.tabIconColor}/>
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
        },
        gesturesEnabled: true
      }
    }
  });
};

const mapStateToProps = (state) => {
  "use strict";
  return {
    themeColor: state.settingState.colorScheme.themeColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor,
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
  }
};

const mapDispatchToProps = (dispatch) => {
  "use strict";
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App)