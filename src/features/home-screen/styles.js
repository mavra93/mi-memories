import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const styles = StyleSheet.create({
    listWrapper: {
        height: globalStyles.screenHeight - 50,
    },
    list: {
        backgroundColor: 'blue',
        width: globalStyles.screenWidth,
        height: globalStyles.screenHeight - 50,
        paddingHorizontal: 10
    },
    memoryBox: {
        flex: 1,
        height: 300,
        width: '100%',
        backgroundColor: 'red',
        marginBottom: 20
    },
    memoryTitle: {
        color: 'black'
    },
    image: {
        width: '100%',
        height: 150
    }
});


export default styles;