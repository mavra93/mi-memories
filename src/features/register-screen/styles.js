import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    fakeInput: {
        marginHorizontal: 15,
    },
    input: {
        marginLeft: 15
    },
    buttonsWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    button: {
        backgroundColor: globalStyles.primaryColor,
        shadowOpacity: 0,
        borderRadius: 5,
        borderWidth: 0,
        height: 50,
        marginHorizontal: 15,
        marginBottom: 15,
    },
    buttonText: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserratBold,
    },
    greenText: {
        color: globalStyles.primaryColor,
        fontFamily: globalStyles.montserrat,
        width: 200,
        textAlign: 'center',
        marginBottom: 15,
    }
});

export default styles;