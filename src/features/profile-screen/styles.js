import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    layoutContainer: {
        height: '100%'
    },
    editButton: {
        position: 'absolute',
        backgroundColor: globalStyles.primaryColor,
        left: (globalStyles.screenWidth / 2) - 75,
        top: '22%',
        width: 150,
        height: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editButtonText: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserratBold,
        fontSize: 15
    },
    profileContainer: {
        flex: 0.3,
        maxHeight: 200,
        marginBottom: 40,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signOutButtonIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        color: globalStyles.titleColor,
        fontSize: 30,
        fontWeight: 'bold'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    contentContainer: {
        flex: 0.7,
        paddingBottom: 70,
        paddingHorizontal: 10
    },
    contentInfoContainer: {
        flex: 0.3,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    contentInfoBox: {
        width: globalStyles.screenWidth / 2 - 40,
        height: 100,
        backgroundColor: 'white',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentInfoBoxFirst: {
        marginRight: 10,
    },
    contentInfoBoxSecond: {
        marginLeft: 10,
    },
    contentInfoBoxTitle: {
        fontSize: 16,
        fontFamily: globalStyles.montserratExtraBold,
        color: globalStyles.titleColor,
    },
    contentInfoBoxValue: {
        fontSize: 18,
        fontFamily: globalStyles.montserrat,
        color: globalStyles.borderPrimaryColor
    },
    contentCarouselContainer: {
        flex: 0.7
    },
    slideInnerContainer: {
        elevation: 4,
        width: '100%',
        height: '70%',
        flex: 1
    },
    image: {
        width: '100%',
        flex: 0.5
    },
    contentWrapper: {
        flex: 0.5,
        width: '100%',
        backgroundColor: globalStyles.secondaryBackgroundColor
    },
    textContainer: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    title: {
        flex: 0.5,
        color: globalStyles.titleColor,
        fontFamily: globalStyles.montserratExtraBold,
        fontSize: 22
    },
    category: {
        flex: 0.2,
        color: globalStyles.borderPrimaryColor,
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
});

export default styles;