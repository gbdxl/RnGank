/**
 * Created by drmk on 2017/6/23.
 */
'use strict';
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Animated,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'
import * as Actions from '../actions/RequestCategoryData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import config from '../utils/Config'
import Icon from 'react-native-vector-icons/Ionicons'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class TextListPage extends React.Component {

  constructor(props) {
    super(props)
    this.title = props.navigation.state.params.title;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    };
  }

  componentDidMount() {
    this.props.actions.fetchData(`${this.title}/20/1`)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedFlatList
          data={this.props.dataSource}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
          onRefresh={this.refresh}
          refreshing={this.props.loading}
          contentContainerStyle={{ margin: 10, backgroundColor: 'white', }}
        />
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        overflow="hidden"
        onPress={() => this.onItemPress(item)}>

        <View style={style.itemContainer}>
          {(item.images) ?
            <Image style={style.itemImage} source={{ uri: item.images[0] }}/>
            :
            <Image style={style.itemImage} source={require('../../assets/img/user_article_no_data.png')}/>
          }

          <View style={style.itemTextContainer}>
            <Text style={style.itemTextTitle} numberOfLines={2}>{item.desc}</Text>

            <View style={style.itemSubTextContainer}>
              <Icon name="ios-pricetag-outline" color='gray'/>
              <Text style={style.itemSubText}>{item.type}</Text>
              <Icon name="ios-create-outline" color='gray'/>
              <Text style={style.itemSubText}>{item.who ? item.who : 'null'}</Text>
              <Icon name="ios-time-outline" color='gray'/>
              <Text style={style.itemSubText}>{item.publishedAt.substring(0, 10)}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  onItemPress = (item) => {
    this.props.navigation.navigate('WebViewPage', { uri: item.url })
  };

  renderFooter = () => {
    return (
      this.props.isRenderFooter ?
        <View style={style.footer}>
          <ActivityIndicator color={config.themeColor} size='small'/>
          <Text style={{ fontSize: 14, color: 'gray', marginLeft: 5 }}>加载更多数据中...</Text>
        </View>
        : null
    );
  }

  renderSeparator = () => {
    return <View style={{ flex: 1, height: 5, backgroundColor: '#e9e9e9' }}/>
  }

  refresh = () => {
    this.props.actions.fetchData(`${this.title}/20/1`);
  }

  loadMore = () => {
    if (!this.props.isRenderFooter) {
      this.props.actions.fetchMoreData(`${this.title}/20/` + this.props.pageNumber);
    }
  }
}

const style = StyleSheet.create({
  footer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    shadowColor: 'gray',    // 设置阴影
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,   // 透明度
    shadowRadius: 1,
    elevation: 2
  },
  itemTextContainer: {
    flex: 8,
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  itemTextTitle: {
    fontSize: 14,
    color: 'black',
  },
  itemSubTextContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  itemSubText: {
    fontSize: 10,
    marginRight: 20,
    marginLeft: 5,
    color: 'gray',
  },
  itemImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    margin: 10,
    resizeMode: 'cover',
  }
})


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

export default connect(mapStateToProps, mapStateToDispatch)(TextListPage);