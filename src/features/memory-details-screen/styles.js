import {StyleSheet, Dimensions} from 'react-native';
import globalStyles from '../../globalStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#03A9F4',
        overflow: 'hidden',
    },
    imageCarousel: {
        width: globalStyles.screenWidth,
        height: '100%'
    },
    imageSlider: {
        width: globalStyles.screenWidth,
        height: '100%'
    },
    imageGallery: {
        width: globalStyles.screenWidth,
        height: globalStyles.screenHeight
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 50
    },
    title: {
        flex: 0.2,
        fontWeight: 'bold',
        color: globalStyles.titleColor,
        fontSize: 22
    },
    category: {
        flex: 0.1,
        fontWeight: 'bold',
        color: globalStyles.borderPrimaryColor,
        fontSize: 18
    },
    info: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    date: {
        color: globalStyles.primaryColor,
        fontSize: 15
    },
    bullet: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: globalStyles.borderPrimaryColor,
        marginHorizontal: 10
    },
    createdBy: {
        color: globalStyles.borderPrimaryColor,
        fontSize: 15
    },
    description: {
        flex: 0.5,
        color: globalStyles.borderPrimaryColor,
        fontSize: 15
    }
});

export default styles;