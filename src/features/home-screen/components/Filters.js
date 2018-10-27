import React, {Component} from 'react';
import {Animated, Text, TouchableOpacity, TextInput} from 'react-native';
import {Translate, translate} from 'react-native-translate';
import styles from '../styles';
import globalStyles from '../../../globalStyles';

class Filters extends Component {

    state = {
        searchText: null
    };

    selectOrder = (order) => {
        this.props.fetchByOrder(order);
    };

    handleSearch = (text) => {
        this.setState({
            searchText: text
        });
        this.props.handleSearch(text);
    };

    render() {
        const {deltaY} = this.props;
        const {searchText} = this.state;
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
                    <TextInput placeholder={translate('searchByTitle')}
                               placeholderTextColor={globalStyles.textPrimaryColor}
                               underlineColorAndroid="transparent"
                               name="searchMemories"
                               ref="searchMemories"
                               value={searchText}
                               onChangeText={this.handleSearch}
                               style={styles.filterInput}/>
                    <Text style={styles.filterLabelText}><Translate value='oldest' /></Text>
                </Animated.View>
                <Animated.View style={[styles.filterField, {
                    opacity: deltaY.interpolate({
                        inputRange: [-70, -50],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                    })
                }]}>
                    <TouchableOpacity style={styles.filterButton} onPress={() => this.selectOrder('desc')}>
                        <Text style={styles.filterFieldText}><Translate value='newest' /></Text>
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
                    <TouchableOpacity style={styles.filterButton} onPress={() => this.selectOrder('asc')}>
                        <Text style={styles.filterFieldText}><Translate value='oldest' /></Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        )
    }
}

export default Filters
