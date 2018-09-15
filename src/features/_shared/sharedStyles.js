import {StyleSheet} from 'react-native';
import globalStyles from '../../globalStyles';

const sharedStyles = StyleSheet.create({
   errorText: {
       position: 'absolute',
       bottom: 0,
       left: 3,
       color: globalStyles.red,
       fontSize: 12
   }
});

export default sharedStyles;