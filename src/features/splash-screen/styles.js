import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    splashScreenWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalStyles.primaryColor
    },
    animation: {
        width: 400,
        height: 400
    }
});

export default styles;