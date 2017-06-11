/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {StyleSheet,Text,Image,Button} from 'react-native'
import fetchUrl from '../utils/fetchUrl'
import {currentDate} from '../utils/getDate'

export default class Home extends React.Component{

  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({tintColor})=>(
      <Image
        source={require('../../assets/img/home.png')}
        style={[style.icon,{tintColor:tintColor}]}
      />
    )
  };

  componentDidMount(){
    fetch(fetchUrl.daily + currentDate())
      .then(response => response.json())
      .then(data => {
        console.log(data)
      }).catch((error) => {
      console.error(error)
    }).done();
  }

  render(){
    return <Text>home</Text>
  }
}

const style = StyleSheet.create({
  icon :{
    width:22,
    height:22,
  }
});