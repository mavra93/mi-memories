import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import styles from '../styles';
import FastImage from 'react-native-fast-image';
import {translate} from 'react-native-translate';
import {getUser} from "../../../helpers/getUserFromUsers";

const AVATAR_IMAGE = require('../../../assets/images/avatar.png');

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

    openEdit = () => {
        Actions.createEditMemory({memory: this.props.memory});
    };

    calculateOptions = () => {
        let showComponent = null;
        const {user, memory} = this.props;
        const {isFavorite} = this.state;
        if (user.uid === memory.createdBy.id) {
            showComponent = <Icon name="ios-create" style={styles.editIcon} onPress={() => this.openEdit()}/>
        } else {
            showComponent = <Icon onPress={() => this.addToFavorite()} name="ios-heart" style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}/>
        }
        return showComponent;
    };

    render() {
        const {memory, users} = this.props;
        const user = getUser(memory.createdBy.id, users);
        const date = moment.unix(memory.createdAt).format('LL');
        return (
            <View style={styles.header}>
                <FastImage style={styles.avatar} source={user.profileImage ? {uri: user.profileImage} : AVATAR_IMAGE}/>
                <Text style={styles.title} numberOfLines={2}>{memory.title}</Text>
                <Text style={styles.category}>{translate(memory.category).toUpperCase()}</Text>
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

