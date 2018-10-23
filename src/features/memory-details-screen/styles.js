import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageCarousel: {
        width: globalStyles.screenWidth,
        height: 250
    },
    imageSlider: {
        width: globalStyles.screenWidth,
        height: 250
    },
    imageGallery: {
        width: globalStyles.screenWidth,
        height: globalStyles.screenHeight
    },
    header: {
        flex: 1,
        height: 150,
        paddingVertical: 15,
        position: 'relative'
    },
    stickyHeader: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: globalStyles.dividerPrimaryColor,
        width: globalStyles.screenWidth
    },
    contentWrapper: {
        backgroundColor: globalStyles.dividerPrimaryColor,
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    title: {
        flex: 0.5,
        fontFamily: globalStyles.montserratExtraBold,
        color: globalStyles.titleColor,
        fontSize: 22
    },
    category: {
        flex: 0.2,
        fontFamily: globalStyles.montserratBold,
        color: globalStyles.borderPrimaryColor,
        fontSize: 18
    },
    info: {
        position: 'relative',
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
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        top: 15,
        right: 0
    },
    bullet: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: globalStyles.borderPrimaryColor,
        marginHorizontal: 10
    },
    createdBy: {
        fontFamily: globalStyles.montserrat,
        color: globalStyles.borderPrimaryColor,
        fontSize: 15
    },
    descriptionContainer: {
        flex: 0.5,
    },
    description: {
        color: globalStyles.borderPrimaryColor,
        fontFamily: globalStyles.montserrat,
        fontSize: 15
    },
    editIcon: {
        position: 'absolute',
        color: globalStyles.borderPrimaryColor,
        fontSize: 40,
        right: 0,
        bottom: 0,
    },
    favoriteIcon: {
        position: 'absolute',
        color: globalStyles.borderPrimaryColor,
        fontSize: 40,
        right: 0,
        bottom: 0,
    },
    favoriteIconActive: {
        color: globalStyles.red,
    }
});

export default styles;