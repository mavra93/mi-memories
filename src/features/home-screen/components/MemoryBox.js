import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../styles';

class MemoryBox extends Component {
    render() {
        const {memory} = this.props;
        return (
            <View style={styles.memoryBox}>
                <Image style={styles.image} source={{uri: memory.images[0]}}/>
                <Text style={styles.memoryTitle}>{memory.title}</Text>
                <Text style={styles.memoryTitle}>{memory.description}</Text>
            </View>
        )
    }
}

export default MemoryBox
