import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import {Translate} from 'react-native-translate';
import {Actions} from 'react-native-router-flux';
import {getReceivedNotifications} from '../../redux/actions/notificationActions';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import styles from './styles';

const AVATAR_IMAGE = require('../../assets/images/avatar.png');

class ReceivedNotificationsScreen extends Component {

    componentWillMount() {
        const {user, getReceivedNotifications} = this.props;
        getReceivedNotifications(user.uid);
    }

    openDetails = (notification) => {
        Actions.notificationDetailsScreen({notification});
    };

    renderRow = (data) => {
        const notification = data.item;
        const fromUser = this.props.users.find(user => user.id === notification.createdBy);
        const sendAt = moment.unix(notification.createdAt).format('LL');
        return (
            <TouchableOpacity style={styles.notifyBox} onPress={() => this.openDetails(notification)}>
                <View style={styles.notifyBoxLeft}>
                    <FastImage style={styles.notifyBoxImage} source={fromUser && fromUser.profileImage ? {uri: fromUser.profileImage} : AVATAR_IMAGE}  />
                </View>
                <View style={styles.notifyBoxRight}>
                    <Text style={styles.notifyBoxTitle}>{notification.title}</Text>
                    <Text style={styles.notifyBoxMessage}>
                        {fromUser.displayName}
                        <Text style={styles.notifyBoxMessageInfo}><Translate value='sendYouNotification' /></Text>
                        <Text style={styles.notifyBoxMessageDate}>{sendAt}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        const {receivedNotifications} = this.props;
        return (
            <View>
                {receivedNotifications.length > 0 ?
                    <FlatList
                        data={receivedNotifications}
                        style={styles.list}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={this.renderRow}
                    />
                    : null
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        receivedNotifications: state.notification.receivedNotifications
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReceivedNotifications: (id) => dispatch(getReceivedNotifications(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedNotificationsScreen)

