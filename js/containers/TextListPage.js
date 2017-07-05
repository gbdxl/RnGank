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
  RefreshControl,
  TouchableNativeFeedback,
} from 'react-native'
import * as Actions from '../actions/RequestCategoryData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Footer from '../components/Footer'

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
      <View style={{ flex: 1, backgroundColor: this.props.pageBgColor }}>
        <AnimatedFlatList
          data={this.props.dataSource}
          renderItem={this.renderItem}
          ListFooterComponent={this.props.isRenderFooter ? Footer : null}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ margin: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.onRefresh}
              tintColor={this.props.themeColor}
              colors={[this.props.themeColor]}
              progressBackgroundColor={'white'}
            />
          }
        />
      </View>
    )
  }

  renderItem = ({ item }) => {
    const { rowItemBackgroundColor, tabIconColor, titleColor } = this.props;
    return (
      <TouchableNativeFeedback
        overflow="hidden"
        onPress={() => this.onItemPress(item)}>

        <View style={[style.itemContainer, { backgroundColor: rowItemBackgroundColor }]}>
          {(item.images) ?
            <Image style={style.itemImage} source={{ uri: item.images[0] }}/>
            :
            <Image style={style.itemImage} source={require('../../assets/img/user_article_no_data.png')}/>
          }

          <View style={style.itemTextContainer}>
            <Text style={[style.itemTextTitle, { color: titleColor }]} numberOfLines={2}>{item.desc}</Text>

            <View style={style.itemSubTextContainer}>
              <Icon name="ios-pricetag-outline" color={tabIconColor}/>
              <Text style={[style.itemSubText, { color: titleColor }]}>{item.type}</Text>
              <Icon name="ios-create-outline" color={tabIconColor}/>
              <Text style={[style.itemSubText, { color: titleColor }]}>{item.who ? item.who : 'null'}</Text>
              <Icon name="ios-time-outline" color={tabIconColor}/>
              <Text style={[style.itemSubText, { color: titleColor }]}>{item.publishedAt.substring(0, 10)}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  onItemPress = (item) => {
    this.props.navigation.navigate('WebViewPage', { uri: item.url })
  };

  renderSeparator = () => {
    return <View style={{ flex: 1, height: 5, backgroundColor: this.props.pageBgColor }}/>
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
    marginTop: 10,
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

export default connect(mapStateToProps, mapStateToDispatch)(TextListPage);