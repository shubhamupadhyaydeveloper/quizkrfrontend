import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size:any) => (width / guidelineBaseWidth) * size;
const verticalScale = (size:any) => (height / guidelineBaseHeight) * size;
const moderateScale = (size:any, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

const iosDevice = Platform.OS === 'ios'

export { horizontalScale, verticalScale, moderateScale,iosDevice };