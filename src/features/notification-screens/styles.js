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
    },
    createContainer: {
        flex: 1,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        paddingHorizontal: 10
    },
    button: {
        backgroundColor: globalStyles.primaryColor,
        shadowOpacity: 0,
        borderRadius: 5,
        borderWidth: 0,
        height: 50,
        marginHorizontal: 15,
        paddingHorizontal: 10
    },
    buttonText: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserratBold,
    },
    input: {
        color: globalStyles.titleColor,
        fontFamily: globalStyles.montserrat,
    },
    textArea: {
        height: 100,
        color: globalStyles.titleColor,
        fontFamily: globalStyles.montserrat,
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 100,
        paddingBottom: 15
    },
    calendar: {
        width: '100%'
    },
    formWrapper: {
        flex: 0.8
    },
    picker: {
        marginTop: 15,
        height: 50
    },
    pickerItem: {
        color: globalStyles.borderPrimaryColor,
        fontFamily: globalStyles.montserrat,
    },
});


export default styles;