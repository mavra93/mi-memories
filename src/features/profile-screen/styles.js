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
        top: '27%',
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImageContainer: {

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
    }
});

export default styles;