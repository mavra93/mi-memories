import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image'
import moment from 'moment';
import styles from '../styles';

class MemoryBox extends Component {

    shouldComponentUpdate() {
        return false
    }

    render() {
        const {memory} = this.props;
        const date = moment.unix(memory.createdAt).format('LLL');
        return (
            <TouchableOpacity style={styles.memoryBox}>
                <FastImage style={styles.image} source={{uri: memory.images[0]}}/>
                <View style={styles.memoryCategory}>
                    <Text style={styles.memoryCategoryText}>{memory.category}</Text>
                </View>
                <View style={styles.memoryContent}>
                    <Text style={styles.memoryTitle}>{memory.title}</Text>
                    <Text style={styles.memoryDescription}>{memory.description}</Text>
                    <Text style={styles.memoryInfo}>{date + ' by ' + memory.createdBy}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default MemoryBox
