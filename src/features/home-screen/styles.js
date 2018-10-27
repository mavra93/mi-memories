import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    listWrapper: {
        height: globalStyles.screenHeight - 125,
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
        backgroundColor: globalStyles.secondaryBackgroundColor,
        marginBottom: 20,
        borderRadius: 5,
        elevation: 1
    },
    memoryTitle: {
        fontSize: 20,
        width: '85%',
        fontWeight: 'bold',
        fontFamily: globalStyles.montserratExtraBold,
        color: globalStyles.titleColor,
        marginBottom: 15,
        flex: 0.23
    },
    image: {
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flex: 0.6
    },
    memoryDescription: {
        fontSize: 13,
        flex: 0.57,
        fontFamily: globalStyles.montserrat,
        color: globalStyles.textPrimaryColor
    },
    memoryContent: {
        flex: 0.4,
        position: 'relative',
        padding: 15
    },
    memoryInfo: {
        fontFamily: globalStyles.montserrat,
        color: globalStyles.textPrimaryColor,
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
        fontFamily: globalStyles.montserratBold,
    },
    filterContainer: {
        backgroundColor: globalStyles.secondaryBackgroundColor,
        paddingTop: 10,
    },
    filterTop: {
        height: 36,
    },
    filterInput: {
        paddingLeft: 10,
        fontFamily: globalStyles.montserrat,
        textAlign: 'center',
        color: globalStyles.titleColor
    },
    filterField: {
        height: 40,
        backgroundColor: globalStyles.primaryColor,
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 4,
        justifyContent: 'center'
    },
    filterButton: {
        height: '100%',
        justifyContent: 'center'
    },
    filterLabelText: {
        color: globalStyles.borderPrimaryColor,
        fontFamily: globalStyles.montserratExtraBold,
        marginLeft: 10,
        fontSize: 14,
    },
    filterFieldText: {
        color: globalStyles.textPrimaryColor,
        fontFamily: globalStyles.montserratExtraBold,
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 30
    },
    pullUpDown: {
        backgroundColor: globalStyles.secondaryBackgroundColor,
        borderBottomColor: globalStyles.borderPrimaryColor,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pullUpDownIconWrapper: {
        backgroundColor: globalStyles.primaryColor,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pullUpDownIcon: {
        color: globalStyles.textPrimaryColor,
        fontSize: 20
    }
});


export default styles;