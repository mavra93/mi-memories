import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const globalStyles = {
    primaryColor: '#42b72a',
    textPrimaryColor: '#FFFFFF',
    dividerPrimaryColor: '#FFFFFF',
    red: '#da4a4f',
    borderPrimaryColor: '#999999',
    backgroundPrimaryColor: '#f3f3f3',
    primaryBackgroundColor: '#f7f7f7',
    secondaryBackgroundColor: '#fefefe',
    buttonSecondaryColor: '#ff5722',
    titleColor: '#525252',
    textSecondaryColor: '#cfcfcf',
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT
};

export default globalStyles;