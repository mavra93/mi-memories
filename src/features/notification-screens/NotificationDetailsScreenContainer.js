import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import moment from 'moment';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import {getUser} from '../../helpers/getUserFromUsers';

const AVATAR_IMAGE = require('../../assets/images/avatar.png');

class NotificationDetailsScreenContainer extends Component {

    render() {
        const {notification, users, user} = this.props;
        const myNotification = notification.createdBy === user.uid;
        const userData = getUser(myNotification ? notification.to : notification.createdBy, users);
        const date = moment.unix(notification.sendAt).format('LL');
        return (
            <View style={styles.contentWrapper}>
                <View style={styles.detailHeader}>
                    <FastImage style={styles.avatar} source={userData.profileImage ? {uri: userData.profileImage} : AVATAR_IMAGE}/>
                    <Text style={styles.title} numberOfLines={2}>{notification.title}</Text>
                    <View style={styles.info}>
                        <Text style={styles.date}>{date}</Text>
                        <View style={styles.bullet}></View>
                        <Text style={styles.user}>{userData.displayName}</Text>
                    </View>
                </View>
                <ScrollView style={styles.descriptionContainer}>
                    <Text style={styles.description}>{notification.description}</Text>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
    };
};

export default connect(mapStateToProps, null)(NotificationDetailsScreenContainer)

