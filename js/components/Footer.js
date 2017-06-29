/**
 * Created by looper on 2017/6/29.
 */
'use strict';
import React from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text
} from 'react-native'
import { connect } from 'react-redux'

class Footer extends React.PureComponent {

  render() {
    const { subTitleColor, rowItemBackgroundColor, tabIconColor } = this.props;
    return (
      <View style={[style.footer, { backgroundColor: rowItemBackgroundColor }]}>
        <ActivityIndicator color={tabIconColor} size='small'/>
        <Text style={{ fontSize: 14, color: subTitleColor, marginLeft: 5 }}>加载更多数据中...</Text>
      </View>
    )
  }
}

const style = StyleSheet.create({
  footer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
    subTitleColor: state.settingState.colorScheme.subTitleColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor,
  }
};

export default connect(mapStateToProps)(Footer)