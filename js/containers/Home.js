/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react';
import {StyleSheet, View, Text, Image, Button, SectionList, Animated, ToastAndroid} from 'react-native';
import config from '../utils/Config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/requestHomeData';
import Icon from 'react-native-vector-icons/Ionicons'

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

  constructor(props) {
    super(props);
    this.tabIcon = ['logo-android', 'logo-apple', 'logo-chrome', 'ios-film', 'ios-book', 'ios-apps', 'ios-radio'];
    this.tabColor = ['rgb(141,192,89)', '#000', 'rgb(51,154,237)', '#9370db', '#00ced1', 'rgb(249,89,58)', '#ffa500'];
  }

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
          renderSectionHeader={this._renderSectionHeader}
          refreshing={this.props.loading}
          onRefresh={this._onRefresh}
          sections={[
            {data: this.props.androidData, key: 0,title:"Android"},
            {data: this.props.iosData, key: 1,title:"ios"},
            {data: this.props.foregroundData, key: 2,title:"前端"},
            {data: this.props.videoData, key: 3,title:"休息视频"},
            {data: this.props.developData, key: 4,title:"拓展资源"},
            {data: this.props.appData, key: 5,title:"App"},
            {data: this.props.recommendData, key: 6,title:"瞎推荐"},
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

  _renderSectionHeader = ({section}) => {
    console.log(section);
    return (
      section.data && section.data.length > 0 ?
        <View style={style.sectionHeader}>
          <Icon name={this.tabIcon[section.key]} color={this.tabColor[section.key]} size={30}/>
          <Text style={style.sectionTitle}>{section.title}</Text>
        </View>
        : null
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
  },
  sectionHeader: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: config.themeColor,
    marginLeft: 15,
    alignSelf: 'center'

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
    appData: state.homeDataState.appData,
    developData: state.homeDataState.developData,
    foregroundData: state.homeDataState.foregroundData,
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