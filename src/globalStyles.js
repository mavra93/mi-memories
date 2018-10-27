import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const globalStyles = {
    primaryColor: '#42b72a',
    textPrimaryColor: '#FFFFFF',
    dividerPrimaryColor: '#FFFFFF',
    red: '#da4a4f',
    borderPrimaryColor: '#1a1a1a',
    backgroundPrimaryColor: '#0f0f0f',
    secondaryBackgroundColor: '#232323',
    tabsBackground: '#1c1c1c',
    iconsColor: '#a0a0a0',
    buttonSecondaryColor: '#ff5722',
    titleColor: '#FFFFFF',
    textSecondaryColor: '#cfcfcf',
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,

    //Fonts
    montserratBold: 'Montserrat-Bold',
    montserratExtraBold: 'Montserrat-ExtraBold',
    montserrat: 'Montserrat-Regular'
};

export default globalStyles;