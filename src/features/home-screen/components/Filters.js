import React, {Component} from 'react';
import {Animated, Text, TouchableOpacity} from 'react-native';
import styles from '../styles';

class Filters extends Component {

    selectOrder = (order) => {
        this.props.fetchByOrder(order);
    };

    render() {
        const {deltaY} = this.props;
        return (
            <Animated.View style={[styles.filterContainer, {
                transform: [{
                    translateY: deltaY.interpolate({
                        inputRange: [-130, -50],
                        outputRange: [0, 0],
                        extrapolateRight: 'clamp'
                    })
                }]
            }]}>
                <Animated.View style={[styles.filterTop, {
                    opacity: deltaY.interpolate({
                        inputRange: [-90, -20],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                    })
                }]}>
                    <Text style={styles.filterLabelText}>Sort by</Text>
                </Animated.View>
                <Animated.View style={[styles.filterField, {
                    opacity: deltaY.interpolate({
                        inputRange: [-70, -50],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                    })
                }]}>
                    <TouchableOpacity onPress={() => this.selectOrder('desc')}>
                        <Text style={styles.filterFieldText}>Newest</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.filterField, {
                    opacity: deltaY.interpolate({
                        inputRange: [-20, 0],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                    })
                }]}>
                    <TouchableOpacity onPress={() => this.selectOrder('asc')}>
                        <Text style={styles.filterFieldText}>Oldest</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        )
    }
}

export default Filters
