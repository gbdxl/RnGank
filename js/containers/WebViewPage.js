/**
 * Created by drmk on 2017/6/15.
 */
'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  ActivityIndicator
} from 'react-native'
import config from '../utils/Config'
import { connect } from 'react-redux'

class WebViewPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      uri: props.navigation.state.params.uri,
    }
  }

  static navigationOptions = {
    title: "详细内容"
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.pageBgColor }}>
        <WebView
          ref={(ref) => {this.webView = ref}}
          style={{ flex: 1 }}
          source={{ uri: this.state.uri }}
          renderLoading={this.renderLoading}
          renderError={this.renderError}
          startInLoadingState={true}
        />
      </View>
    )
  }

  renderLoading = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={this.props.tabIconColor} size='large'/>
        <Text style={{ fontSize: 16, color: this.props.subTitleColor, marginTop: 10 }}>拼命加载中...</Text>
      </View>
    )
  }

  renderError = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    pageBgColor: state.settingState.colorScheme.pageBgColor,
    subTitleColor: state.settingState.colorScheme.subTitleColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor,
  }
};
export default connect(mapStateToProps)(WebViewPage)