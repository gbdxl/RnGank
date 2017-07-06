/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Share
} from 'react-native'
import config from '../utils/Config'
import Icon from 'react-native-vector-icons/Ionicons'
import RowItem from '../components/SimpleRowItem'
import Toast from 'react-native-root-toast'
import RowItemWithSwicher from "../components/RowItemWithSwicher";
import { connect } from 'react-redux'
import { setNightMode } from '../actions/ModifySetting'
import { bindActionCreators } from 'redux'

class Mine extends React.Component {
  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/img/mine.png')}
        style={[style.icon, { tintColor: tintColor }]}
      />
    ),
  }

  render() {
    const { arrowColor, themeColor, pageBgColor, titleColor, rowItemBackgroundColor, isOpenNightMode, navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: pageBgColor }}>
        <View style={[style.nameBar, { backgroundColor: rowItemBackgroundColor }]}>
          <View style={style.introLeft}>
            <View style={[style.avatar, { backgroundColor: themeColor }]}/>
          </View>
          <View style={style.introRight}>
            <Text style={[style.gankText, { color: titleColor }]}>Gank.IO</Text>
            <Icon name="ios-arrow-forward" color={arrowColor} size={25}/>
          </View>
        </View>

        <View style={{ backgroundColor: rowItemBackgroundColor }}>
          <RowItem title="首页内容展示顺序" icon="md-reorder" iconColor='lightskyblue' onPress={() => Toast.show('haha')}/>
          <RowItem title="主题颜色" icon="ios-color-palette" iconColor='orange'
                   onPress={() => navigation.navigate('ThemeChangePage')}/>
          <RowItemWithSwicher title="夜间模式" icon="md-moon" iconColor="#7b68ee" switcherValue={isOpenNightMode}
                              onValueChange={(value) => this.props.setNightMode(value)}/>
          <RowItemWithSwicher title="显示列表缩略图" icon="md-browsers" iconColor="plum" switcherValue={true}
                              onValueChange={(value) => Toast.show('缩略图')}/>
          <RowItemWithSwicher title="自动刷新首页数据" icon="md-refresh" iconColor="#ffd700" switcherValue={true}
                              onValueChange={() => Toast.show('自动刷新')}/>
        </View>
        <View style={{ height: 15 }}/>
        <View style={{ backgroundColor: rowItemBackgroundColor }}>
          <RowItem title="反馈" icon='md-text' iconColor='lightskyblue' onPress={() => {Toast.show('反馈')}}/>
          <RowItem title="分享" icon='md-share' iconColor='lightskyblue' onPress={() => this.share()}/>
        </View>

      </View>
    )
  }

  share = () => {
    Share.share({
      message: 'https://github.com/xialei92/RnGank',
      url: 'https://github.com/xialei92/RnGank',
      title: 'GANKGANKGANK'
    }).then((result) => {}).catch((error) => {Toast.show('分享失败');})
  }
}

const style = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
  nameBar: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
  },
  introLeft: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  introRight: {
    flex: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  },
  avatar: {
    backgroundColor: config.themeColor,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  gankText: {
    color: '#333333',
    fontSize: 24,
  },
  arrowRight: {}
});

const mapStateToProps = (state) => {
  "use strict";
  return {
    themeColor: state.settingState.colorScheme.themeColor,
    isOpenNightMode: state.settingState.isOpenNightMode,
    titleColor: state.settingState.colorScheme.titleColor,
    pageBgColor: state.settingState.colorScheme.pageBgColor,
    separatorColor: state.settingState.colorScheme.separatorColor,
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
    arrowColor: state.settingState.colorScheme.arrowColor,
  }
};

const mapDispatchToProps = (dispatch) => {
  "use strict";
  return {
    setNightMode: bindActionCreators(setNightMode, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mine);