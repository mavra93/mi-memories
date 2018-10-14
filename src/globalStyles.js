import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const globalStyles = {
    primaryColor: '#42b72a',
    textPrimaryColor: '#FFFFFF',
    dividerPrimaryColor: '#FFFFFF',
    red: '#da4a4f',
    borderPrimaryColor: '#999999',
    backgroundPrimaryColor: '#e8e8e8',
    secondaryBackgroundColor: '#fefefe',
    buttonSecondaryColor: '#ff5722',
    titleColor: '#525252',
    textSecondaryColor: '#cfcfcf',
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,

    //Fonts
    montserratBold: 'Montserrat-Bold',
    montserratExtraBold: 'Montserrat-ExtraBold',
    montserrat: 'Montserrat-Regular'
};

export default globalStyles;