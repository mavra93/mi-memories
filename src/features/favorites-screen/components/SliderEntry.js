import React, {Component} from 'react';
import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';

class SliderEntry  extends Component {

    openMemoryDetails = () => {
        const {memory, createdBy} = this.props;
        const memoryData = { ...memory, createdBy : { ...createdBy }};
        Actions.memoryDetails({memory: memoryData});
    };

    render() {
        const {memory, createdBy} = this.props;
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={this.openMemoryDetails}
            >
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    <FastImage
                        source={{uri: memory.images[0]}}
                        style={styles.image}
                    />
                    <View style={styles.radiusMask} />
                </View>
                <View style={styles.textContainer}>
                    <Text>{memory.title}</Text>
                    <Text style={styles.subtitle} numberOfLines={2}>
                        {createdBy.displayName}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default SliderEntry

