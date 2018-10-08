import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const sharedStyles = StyleSheet.create({
    errorText: {
        position: 'absolute',
        bottom: 0,
        left: 3,
        color: globalStyles.red,
        fontSize: 12
    },
    loaderContainer: {
        zIndex: 10000,
        elevation: 100,
        width: globalStyles.screenWidth,
        height: globalStyles.screenHeight,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0
    },
    loaderAnimation: {
        width: 200,
        height: 200
    }
});

export default sharedStyles;