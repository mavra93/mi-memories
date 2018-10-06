import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
import moment from 'moment';
import styles from '../styles';

class Header extends Component {

    state = {
        isFavorite: false
    };

    componentDidMount() {
        const {user, memory} = this.props;
        this.setState({
            isFavorite: memory.favoriteIds && memory.favoriteIds.includes(user.uid)
        })
    }

    addToFavorite = () => {
        this.setState({
            isFavorite: !this.state.isFavorite
        });
        this.props.addToFavorite()
    };

    calculateOptions = () => {
        let showComponent = null;
        const {user, memory} = this.props;
        const {isFavorite} = this.state;
        if (user.uid === memory.createdBy.id) {
            showComponent = <Icon name="ios-create" style={styles.editIcon}/>
        } else {
            showComponent = <Icon onPress={() => this.addToFavorite()} name="ios-heart" style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}/>
        }
        return showComponent;
    };

    render() {
        const {memory} = this.props;
        const date = moment.unix(memory.createdAt).format('LL');
        return (
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={2}>{memory.title}</Text>
                <Text style={styles.category}>{memory.category.toUpperCase()}</Text>
                <View style={styles.info}>
                    <Text style={styles.date}>{date}</Text>
                    <View style={styles.bullet}></View>
                    <Text style={styles.createdBy}>{memory.createdBy.displayName}</Text>
                    {this.calculateOptions()}
                </View>
            </View>
        )
    }
}

export default Header

