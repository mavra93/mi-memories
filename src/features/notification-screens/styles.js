import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    container: {
        height: globalStyles.screenHeight - 70,
    },
    tabBar: {
        backgroundColor: globalStyles.secondaryBackgroundColor
    },
    tabBarLabel: {
        color: globalStyles.primaryColor,
        fontFamily: globalStyles.montserratExtraBold,
        fontSize: 14
    },
    tabBarIndicator: {
        backgroundColor: globalStyles.primaryColor
    },
    createNewButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: globalStyles.primaryColor,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    createNewButtonIcon: {
        fontSize: 28,
        color: globalStyles.secondaryBackgroundColor
    }
});


export default styles;