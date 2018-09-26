import {StyleSheet, Dimensions} from 'react-native';
import globalStyles from '../../globalStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        color: globalStyles.textPrimaryColor
    },
});

export default styles;