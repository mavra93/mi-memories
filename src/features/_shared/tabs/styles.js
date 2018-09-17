import {StyleSheet, Dimensions} from 'react-native';
import globalStyles from '../../../globalStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    tabsContainer: {
        flex: 1,
    },
    tabsWrapper: {
        backgroundColor: globalStyles.secondaryBackgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        left: 0,
        width: SCREEN_WIDTH,
        height: 50
    },
    centeredTab: {
        position: 'absolute',
        zIndex: 20,
        bottom: -20,
        backgroundColor: '#7acc69',
        opacity: 0.8,
        left: SCREEN_WIDTH / 2 - 50,
        height: 100,
        width: 100,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredTabInner: {
        height: 80,
        width: 80,
        borderRadius: 40,
        zIndex: 25,
        backgroundColor: globalStyles.primaryColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredTabIcon: {
        color: globalStyles.textPrimaryColor,
        fontSize: 40
    },
    tabPaddingLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    tabPaddingRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    tabLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tabRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default styles;