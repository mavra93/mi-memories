import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';
import {Translate} from 'react-native-translate';
import moment from 'moment';
import styles from '../styles';

class MemoryBox extends React.PureComponent {

    openMemoryDetails = () => {
        const {memory, createdBy} = this.props;
        const memoryData = { ...memory, createdBy : { ...createdBy }};
        Actions.memoryDetails({memory: memoryData});
    };

    render() {
        const {memory, createdBy} = this.props;
        const date = moment.unix(memory.createdAt).fromNow();
        return (
            memory && createdBy ?
                <TouchableOpacity style={styles.memoryBox} onPress={this.openMemoryDetails}>
                    <FastImage style={styles.image} source={{uri: memory.images[0]}}/>
                    <View style={styles.memoryCategory}>
                        <Text style={styles.memoryCategoryText}><Translate value={memory.category} /></Text>
                    </View>
                    <View style={styles.memoryContent}>
                        <Text style={styles.memoryTitle} numberOfLines={1}>{memory.title}</Text>
                        <Text style={styles.memoryDescription} numberOfLines={4}>{memory.description}</Text>
                        <Text style={styles.memoryInfo}>{date + ' by ' + createdBy.displayName}</Text>
                    </View>
                </TouchableOpacity> :
                null
        )
    }
}

export default MemoryBox
