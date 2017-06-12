/**
 * Created by drmk on 2017/6/9.
 */
const Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

export default {
  themeColor: '#1AA1E6',
  screenWidth: width,
  screenHeight: height,
  dataType: {
    android: "Android",
    ios: "iOS",
    video: "休闲视频",
    recommend: "瞎推荐"
  },
  separatorColor: '#fef3f3',
};