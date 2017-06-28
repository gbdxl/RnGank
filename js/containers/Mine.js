/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image
} from 'react-native'
import config from '../utils/Config'
import Icon from 'react-native-vector-icons/Ionicons'
import RowItem from '../components/SimpleRowItem'
import Toast from 'react-native-root-toast'
import RowItemWithSwicher from "../components/RowItemWithSwicher";

export default class Mine extends React.Component {
  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/img/mine.png')}
        style={[style.icon, { tintColor: tintColor }]}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={style.nameBar}>
          <View style={style.introLeft}>
            <View style={style.avatar}/>
          </View>
          <View style={style.introRight}>
            <Text style={style.gankText}>Gank.IO</Text>
            <Icon name="ios-arrow-forward" color='gray' size={25}/>
          </View>
        </View>

        <View style={{ backgroundColor: 'white' }}>
          <RowItem title="首页内容展示顺序" icon="md-reorder" iconColor='lightskyblue' onPress={() => Toast.show('haha')}/>
          <RowItem title="主题颜色" icon="ios-color-palette" iconColor='orange' onPress={() => Toast.show('hiahia')}/>
          <RowItemWithSwicher title="夜间模式" icon="md-moon" iconColor="#7b68ee" switcherValue={true}
                              onValueChange={() => Toast.show('夜间模式')}/>
          <RowItemWithSwicher title="显示列表缩略图" icon="md-browsers" iconColor="plum" switcherValue={true}
                              onValueChange={(value) => Toast.show('缩略图')}/>
          <RowItemWithSwicher title="自动刷新首页数据" icon="md-refresh" iconColor="#ffd700" switcherValue={true}
                              onValueChange={() => Toast.show('自动刷新')}/>
        </View>
        <View style={{ height: 15 }}/>
        <View style={{ backgroundColor: 'white' }}>
          <RowItem title="反馈" icon='md-text' iconColor='lightskyblue' onpress={() => {Toast.show('反馈')}}/>
          <RowItem title="分享" icon='md-share' iconColor='lightskyblue' onpress={() => {Toast.show('分享')}}/>
        </View>

      </View>
    )
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