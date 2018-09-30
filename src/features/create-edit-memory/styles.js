import {StyleSheet, Dimensions} from 'react-native';
import globalStyles from '../../globalStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.secondaryBackgroundColor
    },
    imageHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addImageButton: {
        backgroundColor: globalStyles.primaryColor,
        position: 'absolute',
        borderRadius: 25,
        width: 50,
        height: 50,
        left: SCREEN_WIDTH / 2 - 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addImageIcon: {
        fontSize: 22
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
    },
    buttonText: {
        color: globalStyles.textPrimaryColor
    },
    input: {
        borderBottomColor: globalStyles.borderPrimaryColor,
        borderBottomWidth: 1,
        color: globalStyles.borderPrimaryColor,
    },
    picker: {
        marginTop: 15,
        height: 50
    },
    pickerItem: {
        color: globalStyles.borderPrimaryColor,
    },
    footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 100,
        paddingBottom: 15
    }
});

export default styles;