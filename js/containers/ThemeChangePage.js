/**
 * Created by looper on 2017/6/29.
 */
'use strict';
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import * as colors from '../utils/Colors'
import * as actions from '../actions/ModifySetting'
import { bindActionCreators } from 'redux'

class ThemeChangePage extends React.Component {

  static navigationOptions = ({navigation}) => {
    const headerRight = (
      <TouchableWithoutFeedback onPress={() => navigation.setParams({ confirm: true })}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: 'white', padding: 15 }}>确定</Text>
        </View>
      </TouchableWithoutFeedback>
    )
    return {
      title: '选择主题',
      headerRight,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      color: props.themeColor,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { navigation } = nextProps;
    if (!navigation) {
      return
    }
    if (navigation.state.params.confirm) {
      this.props.actions.setThemeColor(this.state.color);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[style.colorArea, { backgroundColor: this.state.color }]}/>
        <View style={style.listContainer}>
          <FlatList
            horizontal={true}
            keyExtractor={(item, index) => index}
            renderItem={this.renderItem}
            data={Object.values(colors.default)}
            contentContainerStyle={{ backgroundColor: 'white', padding: 10 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.setState({ color: item })}>
        <View style={[style.item, { backgroundColor: item }]}/>
      </TouchableWithoutFeedback>
    )
  }
}

const style = StyleSheet.create({
  colorArea: {
    position: 'absolute',
    top: 50,
    left: 75,
    right: 75,
    bottom: 150,
  },
  listContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  item: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    subTitleColor: state.settingState.colorScheme.subTitleColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor,
    themeColor: state.settingState.colorScheme.themeColor,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(ThemeChangePage)