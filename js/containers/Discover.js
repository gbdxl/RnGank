/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, FlatList, Animated} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class Discover extends React.Component {

  static navigationOptions = {
    tabBarLabel: '发现',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/img/discovery.png')}
        style={[style.icon, {tintColor: tintColor}]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.tabNames = [['Android', 'iOS', '前端', 'App'], ['休息视频', '拓展资源', '瞎推荐', '福利']];
    this.tabIcon = [['logo-android', 'logo-apple', 'logo-chrome', 'ios-apps'], ['ios-film', 'ios-book', 'ios-radio', 'ios-images']];
    this.state = {
      data: [],
      refreshing: false,
      loading: false,
    };
  }

  render() {
    return <View style={{flex: 1}}>
      <AnimatedFlatList
        ListHeaderComponent={this._renderHeader}
        // ListFooterComponent={this._renderFooter}
        // ListSeparatorComponent={this._renderSeparator}
        // renderItem={this._renderItem}
        refreshing={false}
        onRefresh={this._onRefresh}
        onEndReached={this._onLoadMore}
        data={this.state.data}
        key={(item, index) => index}
      />
    </View>;
  };

  _onLoadMore = () => {

  };

  _onRefresh = () => {

  };

  _renderItem = () => {

  };

  _renderSeparator = () => {

  };

  _renderFooter = () => {

  };

  _renderHeader = () => {
    return <View style={style.headerContainer}>
      <View style={style.headerLine}/>
      {
        this.tabIcon.map((item, i) => {
          return (
            <View style={style.btnRow} key={i}>
              {this.tabIcon[i].map((subItem, index) => {
                return (
                  <TouchableOpacity style={style.headerTouch} key={index}>
                      <Icon size={12} color='#fff' name={this.tabIcon[i][index]}/>
                      <Text style={style.headerText}>{this.tabNames[i][index]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )
        })
      }
      <View style={style.headerLine}/>
    </View>
  };
}

const style = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
  headerContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
  },
  headerLine: {
    height: 0.5,
    backgroundColor: 'black',
  },
  btnRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  headerTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  }
});