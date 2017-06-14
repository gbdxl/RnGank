/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {StyleSheet, View, Text, Image, Button, FlatList, Animated, ToastAndroid} from 'react-native';
import fetchUrl from '../utils/fetchUrl'
import {getCurrentDate, getYesterdayFromDate} from '../utils/getDate'
import config from '../utils/Config'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class Home extends React.Component {

  static navigationOptions = {
    title: '首页',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/img/home.png')}
        style={[style.icon, {tintColor: tintColor}]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      headerUrl: "",
      refresh: false,
      loading: false,
      data: [],
    }
  }

  componentDidMount() {
    this._onRefresh();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AnimatedFlatList
          ListHeaderComponent={this._homeHeader}
          ListFooterComponent={this._homeFooter}
          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          refreshing={false}
          onRefresh={this._onRefresh}
          // onEndReached={this._onLoadMore}
          data={this.state.data}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  _onLoadMore = () => {
    this.setState({
      loading: true,
    });
    console.log("getCurrentDate()=" + getCurrentDate());
    console.log("getYesterdayFromDate()=" + getYesterdayFromDate(getCurrentDate()));
    fetch(fetchUrl.fixedDate + getYesterdayFromDate(getCurrentDate()))
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          data: this.state.data.concat(this.translateData(data)),
        });
      }).catch((error) => {
      console.error(error);
      this.setState({
        loading: false,
      });
    })
      .done();
  };

  _onRefresh = () => {
    this.setState({
      refresh: true,
    });
    fetch(fetchUrl.daily + getCurrentDate())
      .then(response => response.json())
      .then(data => {
        if (!data.category || data.category.length === 0) {
          ToastAndroid.show("今日干货还未更新", ToastAndroid.LONG);
          return;
        }
        let result = this.translateData(data.results);
        this.setState({
          data: result,
          headerUrl: data.results.福利[0].url,
          refresh: false,
        });
        console.log(data)
      }).catch((error) => {
      console.error(error);
      this.setState({
        refresh: false,
      });
    }).done();
  };

  translateData = (data) => {
    return data.Android.concat(data.iOS).concat(data.休息视频).concat(data.瞎推荐);
  };

  _renderItem = (info) => {
    return (
      <View style={{flex: 1}}>
        <Text style={style.itemText}>{info.item.desc}</Text>
      </View>
    );
  };

  _separator = () => {
    return <View style={{flex: 1, backgroundColor: config.separatorColor, height: 0.5}}/>;
  };

  _homeHeader = () => {
    return (
      this.state.headerUrl ?
        <Image style={style.header} source={{uri: this.state.headerUrl}}/>
        :
        null
    );
  };

  _homeFooter = () => {
    let text = this.state.loading ? "加载中..." : "";
    return (
      <Text style={style.footerText}>{text}</Text>
    )
  }
}

const style = StyleSheet.create({
  header: {
    width: config.screenWidth,
    height: 430,
  },
  icon: {
    width: 22,
    height: 22,
  },
  footerText: {
    flex: 1,
    textAlign: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 14,
    margin: 10,
    alignItems: 'center',
  }
});
