import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    listWrapper: {
        height: globalStyles.screenHeight - 65,
    },
    list: {
        backgroundColor: globalStyles.backgroundPrimaryColor,
        width: globalStyles.screenWidth,
        paddingHorizontal: 10
    },
    memoryBox: {
        flex: 1,
        height: 350,
        position: 'relative',
        width: '100%',
        backgroundColor: globalStyles.dividerPrimaryColor,
        marginBottom: 20,
        borderRadius: 5,
        elevation: 3
    },
    memoryTitle: {
        fontSize: 20,
        width: '85%',
        fontWeight: 'bold',
        color: globalStyles.titleColor,
        marginBottom: 15,
        flex: 0.2
    },
    image: {
        width: '100%',
        flex: 0.6
    },
    memoryDescription: {
        fontSize: 13,
        flex: 0.6,
        color: globalStyles.borderPrimaryColor
    },
    memoryContent: {
        flex: 0.4,
        position: 'relative',
        padding: 15
    },
    memoryInfo: {
        color: globalStyles.borderPrimaryColor,
        flex: 0.2,
        position: 'absolute',
        bottom: 15,
        left: 15,
        fontSize: 12
    },
    memoryCategory: {
        width: 50,
        height: 50,
        backgroundColor: globalStyles.primaryColor,
        borderRadius: 25,
        position: 'absolute',
        top: 165,
        right: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    memoryCategoryText: {
        color: globalStyles.textPrimaryColor,
        fontWeight: 'bold'
    }
});


export default styles;