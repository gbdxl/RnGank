/**
 * Created by drmk on 2017/6/21.
 */
'use strict'
import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  Animated,
  ActivityIndicator,
  Modal,
  ViewPagerAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import * as Actions from '../actions/RequestCategoryData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Footer from '../components/Footer'

const NORMAL_MARGIN = 5;
const Dimensions = require('Dimensions');
const { width, height } = Dimensions.get('window');
const itemSize = (width - 3 * NORMAL_MARGIN) / 2;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class GirlsPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = ({
      modalVisible: false,
      clickItemIndex: 0,
      viewPageCurrentIndex: 0,
    })
  }

  static navigationOptions = {
    title: '福利',
  }

  componentDidMount() {
    this.props.actions.fetchData('福利/20/1');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.pageBgColor }}>
        <AnimatedFlatList
          data={this.props.dataSource}
          renderItem={this.renderItem}
          ListFooterComponent={this.props.isRenderFooter ? Footer : null}
          numColumns={2}
          onRefresh={this.refresh}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
          refreshing={this.props.loading}
          keyExtractor={(item, index) => index}
          initialNumToRender={6}
          columnWrapperStyle={{
            marginHorizontal: NORMAL_MARGIN,
            marginTop: NORMAL_MARGIN,
          }}
        />
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalVisible}
          onShow={() => {}}
          onRequestClose={() => {}}
        >
          <View style={{ flex: 1 }}>
            <ViewPagerAndroid
              initialPage={this.state.clickItemIndex}
              style={{ flex: 1 }}
              onPageSelected={({ nativeEvent }) => this.onPageSelected(nativeEvent)}
            >
              {
                this.props.dataSource.map((value, index) => {
                  return (
                    <View key={index}>
                      <TouchableWithoutFeedback
                        style={{ flex: 1 }}
                        onPress={() => {this.setState({ modalVisible: false })}}
                      >
                        <Image
                          style={{ flex: 1 }}
                          resizeMode={'cover'}
                          source={{ uri: value.url }}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  )
                })
              }
            </ViewPagerAndroid>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                alignItems: 'center',
                backgroundColor: '#11111180',
                position: 'absolute',
                bottom: 10,
                alignSelf: 'center',
                paddingHorizontal: 10
              }}
            >{`${this.state.viewPageCurrentIndex + 1}/${this.props.dataSource.length}`}</Text>
          </View>
        </Modal>
      </View>
    )
  }

  renderItem = ({ item, index }) => {
    const isLeft = index % 2 === 0;
    return (
      <TouchableOpacity
        style={isLeft ? { flex: 1 } : { marginLeft: NORMAL_MARGIN }}
        onPress={() => this.lookBigPic(index)}
      >
        <Image
          style={[style.itemImageStyle, { backgroundColor: this.props.rowItemBackgroundColor }]}
          resizeMode='cover'
          source={{ uri: this.changeImageToSmallSize(item.url) }}

        />
      </TouchableOpacity>
    )
  }

  onPageSelected = (nativeEvent) => {
    this.setState({ viewPageCurrentIndex: nativeEvent.position })
  }

  lookBigPic = (index) => {
    this.setState({ modalVisible: true, clickItemIndex: index });
  }

  changeImageToSmallSize = (url) => {
    return url.replace('large', 'small');
  }

  refresh = () => {
    this.props.actions.fetchData('福利/20/1');
  }

  loadMore = () => {
    if (!this.props.isRenderFooter) {
      this.props.actions.fetchMoreData('福利/20/' + this.props.pageNumber);
    }
  }
}

const style = StyleSheet.create({
  itemImageStyle: {
    width: itemSize,
    height: itemSize,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 6,
  },
})

const mapStateToProps = (state) => {
  return {
    loading: state.categoryDataState.loading,
    dataSource: state.categoryDataState.dataSource,
    isRenderFooter: state.categoryDataState.isRenderFooter,
    pageNumber: state.categoryDataState.pageNumber,
    isFullData: state.categoryDataState.isFullData,
    error: state.categoryDataState.error,
    themeColor: state.settingState.colorScheme.themeColor,
    titleColor: state.settingState.colorScheme.titleColor,
    pageBgColor: state.settingState.colorScheme.pageBgColor,
    separatorColor: state.settingState.colorScheme.separatorColor,
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
    subTitleColor: state.settingState.colorScheme.subTitleColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor,
  }
}

const mapStateToDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(GirlsPage);