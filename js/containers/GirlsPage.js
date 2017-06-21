/**
 * Created by drmk on 2017/6/21.
 */
'use strict'
import React from 'react'
import {
  StyleSheet,
  FlatList,
  Image,
  Animated,
} from 'react-native'
import * as Actions from '../actions/RequestCategoryData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class GirlsPage extends React.Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    title: '美女'
  }

  componentDidMount() {
    this.props.actions.fetchData('福利/20/1');
  }

  render() {

  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.categoryDataState.loading,
    dataSource: state.categoryDataState.dataSource,
    isRenderFooter: state.categoryDataState.isRenderFooter,
    pageNumber: state.categoryDataState.pageNumber,
    isFullData: state.categoryDataState.isFullData,
    error: state.categoryDataState.error,
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(GirlsPage);