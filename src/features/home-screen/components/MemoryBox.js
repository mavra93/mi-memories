import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';

class MemoryBox extends Component {
    render() {
        const {memory} = this.props;
        return (
            <TouchableOpacity style={styles.memoryBox}>
                <Image style={styles.image} source={{uri: memory.images[0]}}/>
                <View style={styles.memoryCategory}>
                    <Text style={styles.memoryCategoryText}>{memory.category}</Text>
                </View>
                <View style={styles.memoryContent}>
                    <Text style={styles.memoryTitle}>{memory.title}</Text>
                    <Text style={styles.memoryDescription}>{memory.description}</Text>
                    <Text style={styles.memoryInfo}>18.10.2018 21:30 by Ivan</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default MemoryBox
