/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  TouchableNativeFeedback,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../utils/Config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/requestRandomData';
import WebViewPage from './WebViewPage'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Discover extends React.Component {

  static navigationOptions = {
    title: '发现',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/img/discovery.png')}
        style={[style.icon, { tintColor: tintColor }]}
      />
    )
  };

  constructor(props) {
    super(props);
    this.tabNames = [['Android', 'iOS', '前端', 'App'], ['休息视频', '拓展资源', '瞎推荐', '福利']];
    this.tabIcon = [['logo-android', 'logo-apple', 'logo-chrome', 'ios-apps'], ['ios-film', 'ios-book', 'ios-radio', 'ios-images']];
    this.tabColor = [['rgb(141,192,89)', '#000', 'rgb(51,154,237)', 'rgb(249,89,58)'], ['#9370db', '#00ced1', '#ffa500', 'lightpink']];
  }

  componentDidMount() {
    this.props.actions.fetchLocalRandomData();
  }

  render() {
    return <View style={{ flex: 1 }}>
      <AnimatedFlatList
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        ItemSeparatorComponent={this._renderSeparator}
        contentContainerStyle={{ backgroundColor: 'white' }}
        renderItem={this._renderItem}
        refreshing={this.props.loading}
        onRefresh={this._onRefresh}
        onEndReached={this._onLoadMore}
        onEndReachedThreshold={0.5}
        data={this.props.dataSource}
        keyExtractor={(item, index) => index}
      />
    </View>;
  };

  _onLoadMore = () => {
    if (!this.props.isRenderFooter && !this.props.loading) {
      this.props.actions.fetchRandomData(true);
    }
  };

  _onRefresh = () => {
    this.props.actions.fetchRandomData();
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableNativeFeedback
        overflow="hidden"
        onPress={() => this._onItemPress(item)}>
        <View style={style.itemContainer}>
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

          {(item.images) ?
            <Image style={style.itemImage} source={{ uri: item.images[0] }}/>
            :
            <Image style={style.itemImage} source={require('../../assets/img/user_article_no_data.png')}/>
          }
        </View>
      </TouchableNativeFeedback>
    );
  };

  _renderSeparator = () => {
    return <View style={style.separator}/>
  };

  _renderFooter = () => {
    return (
      this.props.isRenderFooter ? <View style={style.footer}>
        <ActivityIndicator color={config.themeColor} size='small'/>
        <Text style={{ fontSize: 14, color: 'gray', marginLeft: 5 }}>加载更多数据中...</Text>
      </View> : null
    );
  };

  _renderHeader = () => {
    return <View style={style.headerContainer}>
      {
        this.tabIcon.map((item, i) => {
          return (
            <View style={style.btnRow} key={i}>
              {this.tabIcon[i].map((subItem, index) => {
                return (
                  <TouchableOpacity style={style.headerTouch} key={index} onPress={()=>{this.onHeaderItemClick(this.tabNames[i][index])}}>
                    <Icon name={this.tabIcon[i][index]} size={40} color={this.tabColor[i][index]}/>
                    <Text style={style.headerText}>{this.tabNames[i][index]}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )
        })
      }
    </View>
  };

  _onItemPress = (item) => {
    this.props.navigation.navigate('WebViewPage', {uri: item.url})
  };

  onHeaderItemClick = (title)=>{
    if (title === '福利'){
      this.props.navigation.navigate('GirlsPage');
    }
  }
}

const style = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
  headerContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
  },
  btnRow: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  headerTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 10,
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  headerText: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  separator: {
    flex: 1,
    height: 4,
    backgroundColor: 'transparent',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row'
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
    marginRight: 10,
    resizeMode: 'cover',
  }
});

const mapStateToProps = (state) => {
  "use strict";
  return {
    dataSource: state.randomDataState.dataSource,
    loading: state.randomDataState.loading,
    error: state.randomDataState.error,
    isRenderFooter: state.randomDataState.isRenderFooter
  };
};

const mapDispatchToProps = (dispatch) => {
  "use strict";
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);