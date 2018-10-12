import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import styles from '../styles';

class SliderEntry extends Component {

    openMemoryDetails = () => {
        const {memory, createdBy} = this.props;
        const memoryData = {...memory, createdBy: {...createdBy}};
        Actions.memoryDetails({memory: memoryData});
    };

    render() {
        const {memory} = this.props;
        const date = moment.unix(memory.createdAt).format('LL');
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.slideInnerContainer}
                onPress={this.openMemoryDetails}
            >
                    <FastImage
                        source={{uri: memory.images[0]}}
                        style={styles.image}
                    />
                    <View style={styles.contentWrapper}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={2}>{memory.title}</Text>
                            <Text style={styles.category}>{memory.category.toUpperCase()}</Text>
                            <View style={styles.info}>
                                <Text style={styles.date}>{date}</Text>
                            </View>
                        </View>
                    </View>

            </TouchableOpacity>
        )
    }
}

export default SliderEntry

