/**
 * Created by drmk on 2017/6/9.
 */
import React from 'react';
import { StyleSheet, View, Text, Image, RefreshControl, SectionList, Animated, ToastAndroid } from 'react-native';
import config from '../utils/Config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/requestHomeData';
import Icon from 'react-native-vector-icons/Ionicons'
import CommonPressView from '../components/CommonPressView'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

class Home extends React.Component {

  static navigationOptions = {
    title: '首页',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/img/home.png')}
        style={[style.icon, { tintColor: tintColor }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.tabIcon = ['logo-android', 'logo-apple', 'logo-chrome', 'ios-film', 'ios-book', 'ios-apps', 'ios-radio'];
    this.tabColor = ['rgb(141,192,89)', '#000', 'rgb(51,154,237)', '#9370db', '#00ced1', 'rgb(249,89,58)', '#ffa500'];
  }

  componentDidMount() {
    this.props.actions.fetchLocalHomeData();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.props.pageBgColor }}>
        <AnimatedSectionList
          ListHeaderComponent={this.homeHeader}
          ItemSeparatorComponent={this.separator}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          stickySectionHeadersEnabled={false}
          sections={[
            { data: this.props.androidData, key: 0, title: "Android" },
            { data: this.props.iosData, key: 1, title: "ios" },
            this.props.foregroundData ?
              { data: this.props.foregroundData, key: 2, title: "前端" } : null,
            this.props.videoData ?
              { data: this.props.videoData, key: 3, title: "休息视频" } : null,
            this.props.developData ?
              { data: this.props.developData, key: 4, title: "拓展资源" } : null,
            this.props.appData ?
              { data: this.props.appData, key: 5, title: "App" } : null,
            this.props.recommendData ?
              { data: this.props.recommendData, key: 6, title: "瞎推荐" } : null
          ]}
          keyExtractor={(item, index) => index}
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
    );
  };

  onRefresh = () => {
    this.props.actions.fetchData();
  };

  renderItem = ({ item }) => {
    const { titleColor, rowItemBackgroundColor } = this.props;
    return (
      <CommonPressView onPress={() => this.onItemClick(item)}>
        <View style={[style.itemContainer, { backgroundColor: rowItemBackgroundColor }]}>
          <Text style={[style.itemText, { color: titleColor }]}>{item.desc}</Text>
        </View>
      </CommonPressView>
    );
  };

  onItemClick = (item) => {
    this.props.navigation.navigate('WebViewPage', { uri: item.url })
  }

  renderSectionHeader = ({ section }) => {
    const { titleColor, rowItemBackgroundColor } = this.props;
    return (
      section.data && section.data.length > 0 ?
        <View
          style={[style.itemContainer, { backgroundColor: rowItemBackgroundColor, marginVertical: 10, padding: 10 }]}>
          <Icon name={this.tabIcon[section.key]} color={this.tabColor[section.key]} size={30}/>
          <Text style={[style.sectionTitle, { color: titleColor }]}>{section.title}</Text>
        </View>
        : null
    );
  };

  separator = () => {
    return <View style={{ flex: 1, backgroundColor: this.props.pageBgColor, height: 5 }}/>;
  };

  homeHeader = () => {
    return (
      this.props.headerUrl ?
        <Image style={style.header} source={{ uri: this.props.headerUrl }}/>
        :
        null
    );
  };
}

const style = StyleSheet.create({
  header: {
    width: config.screenWidth,
    height: 430,
  },
  icon: {
    width: 22,
    height: 22,
  },
  footerText: {
    flex: 1,
    textAlign: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 14,
    margin: 10,
    alignItems: 'center',
  },
  sectionHeader: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: config.themeColor,
    marginLeft: 15,
    alignSelf: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 6,
    shadowColor: 'gray',    // 设置阴影
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,   // 透明度
    shadowRadius: 1,
    elevation: 2
  },
});

const mapStateToProps = (state) => {
  "use strict";
  return {
    headerUrl: state.homeDataState.headerUrl,
    androidData: state.homeDataState.androidData,
    iosData: state.homeDataState.iosData,
    videoData: state.homeDataState.videoData,
    recommendData: state.homeDataState.recommendData,
    appData: state.homeDataState.appData,
    developData: state.homeDataState.developData,
    foregroundData: state.homeDataState.foregroundData,
    loading: state.homeDataState.loading,
    isUpdate: state.homeDataState.isUpdate,
    themeColor: state.settingState.colorScheme.themeColor,
    titleColor: state.settingState.colorScheme.titleColor,
    pageBgColor: state.settingState.colorScheme.pageBgColor,
    separatorColor: state.settingState.colorScheme.separatorColor,
    rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
    subTitleColor: state.settingState.colorScheme.subTitleColor,
    tabIconColor: state.settingState.colorScheme.tabIconColor,
  }
};

const mapDispatchToProps = (dispatch) => {
  "use strict";
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
