/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react';
import {StyleSheet, View, Text, Image, Button, SectionList, Animated, ToastAndroid} from 'react-native';
import config from '../utils/Config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/requestHomeData';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

class Home extends React.Component {

  static navigationOptions = {
    title: '首页',
    tabBarIcon: ({tintColor}) => (
      <Image
        source={require('../../assets/img/home.png')}
        style={[style.icon, {tintColor: tintColor}]}
      />
    )
  };

  componentDidMount() {
    this.props.actions.fetchLocalHomeData();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AnimatedSectionList
          ListHeaderComponent={this._homeHeader}
          ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          refreshing={this.props.loading}
          onRefresh={this._onRefresh}
          sections={[
            {data:this.props.androidData,key:"1"},
            {data:this.props.iosData,key:"2"},
            {data:this.props.videoData,key:"3"},
            {data:this.props.recommendData,key:"4"},
          ]}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  _onRefresh = () => {
    this.props.actions.fetchData();
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
      this.props.headerUrl ?
        <Image style={style.header} source={{uri: this.props.headerUrl}}/>
        :
        null
    );
  };
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

const mapStateToProps = (state) => {
  "use strict";
  return {
    headerUrl: state.homeDataState.headerUrl,
    androidData: state.homeDataState.androidData,
    iosData: state.homeDataState.iosData,
    videoData: state.homeDataState.videoData,
    recommendData: state.homeDataState.recommendData,
    loading: state.homeDataState.loading,
    isUpdate: state.homeDataState.isUpdate
  }
};

const mapDispatchToProps = (dispatch) => {
  "use strict";
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);