/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {StyleSheet,Text,Button,Image} from 'react-native'

export default class Discover extends React.Component{

  static navigationOptions = {
    tabBarLabel: '发现',
    tabBarIcon: ({tintColor})=>(
      <Image
        source={require('../../assets/img/discovery.png')}
        style={[style.icon,{tintColor:tintColor}]}
      />
    )
  }

  render(){
    return <Text>discovery</Text>
  }
}

const style = StyleSheet.create({
  icon :{
    width:22,
    height:22,
  }
});