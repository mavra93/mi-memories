import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    loginScreenContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    logoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: globalStyles.primaryColor,
        alignItems: 'center'
    },
    logoImage: {
        resizeMode: 'contain'
    },
    formContainer: {
        backgroundColor: globalStyles.secondaryBackgroundColor
    }
});

export default styles;