/**
 * Created by drmk on 2017/6/28.
 */
'use strict';
import React, { PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Switch,
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import config from '../utils/Config'
import { connect } from 'react-redux'

class RowItemWithSwicher extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    renderSeparator: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    switcherValue: PropTypes.bool,
    onValueChange: PropTypes.func,
  };

  static defaultProps = {
    renderSeparator: true,
    switcherValue: true,
    iconColor: '#000'
  };

  render() {
    const { title, renderSeparator, icon, iconColor, switcherValue, onValueChange, titleColor, separatorColor, themeColor } = this.props;
    return (
      <View style={{ height: 40 }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={style.introLeft}>
            <Icon name={icon} color={iconColor} size={20}/>
          </View>
          <View style={style.introRight}>
            <Text style={[style.text, { color: titleColor }]}>{title}</Text>
            <Switch onValueChange={onValueChange} value={switcherValue} tintColor={themeColor}/>
          </View>
        </View>
        {
          renderSeparator ?
            <View style={[style.separator, { backgroundColor: separatorColor }]}/>
            :
            null
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
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
  text: {
    fontSize: 14,
    color: '#333333',
  },
  separator: {
    backgroundColor: '#e5e5e5',
    height: 0.5,
    marginHorizontal: 10,
  }
});

const mapStateToProps = (state) => {
  return {
    titleColor: state.settingState.colorScheme.titleColor,
    separatorColor: state.settingState.colorScheme.separatorColor,
    arrowColor: state.settingState.colorScheme.arrowColor,
    themeColor: state.settingState.colorScheme.themeColor,
  }
}

export default connect(mapStateToProps)(RowItemWithSwicher)