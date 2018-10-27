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
        fontSize: 30,
        color: globalStyles.textPrimaryColor
    },
    createContainer: {
        backgroundColor: globalStyles.secondaryBackgroundColor,
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
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserrat,
    },
    textArea: {
        height: 100,
        color: globalStyles.textPrimaryColor,
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
    list: {
        backgroundColor: globalStyles.backgroundPrimaryColor,
        width: globalStyles.screenWidth,
        padding: 10
    },
    notifyBox: {
        borderRadius: 5,
        backgroundColor: globalStyles.secondaryBackgroundColor,
        height: 150,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    notifyBoxLeft: {
        flex: 0.3,
        padding: 20
    },
    notifyBoxImage: {
        width: 80,
        height: 80,
        borderRadius: 5
    },
    notifyBoxRight: {
        flex: 0.7,
        justifyContent: 'center',
    },
    notifyBoxTitle: {
        color: globalStyles.titleColor,
        fontFamily: globalStyles.montserratBold
    },
    notifyBoxMessage: {
        marginTop: 10,
        marginBottom: 10,
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserrat
    },
    notifyBoxMessageInfo: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserrat
    },
    notifyBoxMessageDate: {
        color: globalStyles.primaryColor,
        fontFamily: globalStyles.montserrat
    },
    notifyBoxMessageCreatedDate: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserrat,
        fontSize: 12
    }
});


export default styles;