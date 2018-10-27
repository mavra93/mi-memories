import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    layoutContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        height: globalStyles.screenHeight - 90
    },
    slideInnerContainer: {
        elevation: 4,
        width: '100%',
        height: globalStyles.screenHeight - 90,
    },
    imageContainer: {
        position: 'relative',
        flex: 1,
        height: '100%',
    },
    image: {
        width: '100%',
        height: globalStyles.screenHeight - 90,
        flex: 1
    },
    contentWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '40%',
        width: '100%',
        backgroundColor: globalStyles.secondaryBackgroundColor
    },
    textContainer: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    title: {
        flex: 0.3,
        color: globalStyles.titleColor,
        fontFamily: globalStyles.montserratExtraBold,
        fontSize: 22
    },
    category: {
        flex: 0.2,
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserratExtraBold,
        fontSize: 18
    },
    info: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    date: {
        color: globalStyles.primaryColor,
        fontFamily: globalStyles.montserrat,
        fontSize: 15
    },
    bullet: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: globalStyles.iconsColor,
        marginHorizontal: 10
    },
    createdBy: {
        color: globalStyles.iconsColor,
        fontFamily: globalStyles.montserrat,
        fontSize: 15
    },
    descriptionContainer: {
        flex: 0.5,
    },
    description: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserrat,
        fontSize: 15
    }
});

export default styles;