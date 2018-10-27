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
        top: 180,
        width: 150,
        height: 40,
        borderRadius: 5,
        zIndex: 20,
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
        backgroundColor: globalStyles.secondaryBackgroundColor,
        flex: 0.5,
        maxHeight: 200,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signOutButtonIcon: {
        position: 'absolute',
        right: 30,
        bottom: 10,
        color: globalStyles.titleColor,
        fontSize: 30,
        fontWeight: "800"
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 5
    },
    displayName: {
        color: globalStyles.titleColor,
        fontFamily: globalStyles.montserratExtraBold,
        marginTop: 10,
        fontSize: 16
    },
    contentContainer: {
        flex: 0.5,
        paddingBottom: 70,
        paddingHorizontal: 10
    },
    contentInfoContainer: {
        flex: 0.5,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    contentInfoBox: {
        width: globalStyles.screenWidth / 2 - 40,
        height: 100,
        backgroundColor: globalStyles.secondaryBackgroundColor,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    contentInfoBoxFirst: {
        marginRight: 10,
    },
    contentInfoBoxSecond: {
        marginLeft: 10,
    },
    contentInfoBoxTitle: {
        fontSize: 14,
        fontFamily: globalStyles.montserrat,
        color: globalStyles.titleColor
    },
    contentInfoBoxValue: {
        fontSize: 20,
        fontFamily: globalStyles.montserratExtraBold,
        color: globalStyles.textPrimaryColor,
    },
    contentCarouselContainer: {
        flex: 0.5
    },
    contentCarouselContainerTitle: {
        flex: 0.2,
        color: globalStyles.titleColor,
        fontFamily: globalStyles.montserratExtraBold,
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10
    },
    slideInnerContainer: {
        zIndex: 1,
        width: '90%',
        flex: 1
    },
    image: {
        width: '100%',
        flex: 0.5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    contentWrapper: {
        flex: 0.5,
        width: '100%',
        backgroundColor: globalStyles.secondaryBackgroundColor,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
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
        fontSize: 16
    },
    info: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    date: {
        color: globalStyles.primaryColor,
        fontFamily: globalStyles.montserrat,
        fontSize: 13
    },
    slideWrapper: {
        position: 'relative',
        width: '80%',
        height: '60%',
        flex: 1,
        justifyContent: 'flex-start'
    },
    categoryBox: {
        position: 'absolute',
        zIndex: 10,
        right: 5,
        top: '35%',
        width: 60,
        height: 60,
        backgroundColor: globalStyles.primaryColor,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryBoxText: {
        color: globalStyles.textPrimaryColor,
        fontSize: 11,
        fontFamily: globalStyles.montserratBold
    },
    editProfileWrapper: {
        flex: 1
    },
    editProfileContainer: {
        backgroundColor: globalStyles.secondaryBackgroundColor,
        flex: 1
    },
    editProfileImageHeader: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editProfileContent: {
        flex: 0.6,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editProfileContentForm: {
        width: '100%',
        paddingLeft: 10
    },
    editProfileImageCarousel: {
        zIndex: 1,
        width: globalStyles.screenWidth,
        height: '100%'
    },
    editProfileImageSlider: {
        width: globalStyles.screenWidth,
        height: 250
    },
    editProfileImageGalleryContainer: {
        width: globalStyles.screenWidth,
        height: globalStyles.screenHeight
    },
    editProfileImageGallery: {
        width: '100%',
        height: '100%'
    },
    editProfileImageGallerySelect: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 100,
        backgroundColor: 'red'
    },
    editProfileImageGallerySelectText: {
        color: globalStyles.textPrimaryColor
    },
    editProfileAddImageButton: {
        backgroundColor: globalStyles.primaryColor,
        position: 'absolute',
        borderRadius: 25,
        width: 50,
        height: 50,
        left: globalStyles.screenWidth / 2 - 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    editProfileAddImageIcon: {
        fontSize: 22
    },
    editProfileInput: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserrat,
    },
    editProfileFooter: {
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 15
    },
    editProfilePicker: {
        height: 50,
        width: '100%',
        marginLeft: -5
    },
    editProfileButton: {
        backgroundColor: globalStyles.primaryColor,
        shadowOpacity: 0,
        borderRadius: 5,
        borderWidth: 0,
        paddingHorizontal: 15,
        height: 50,
        marginHorizontal: 15,
    },
    editProfileButtonText: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserratExtraBold,
    },
});

export default styles;