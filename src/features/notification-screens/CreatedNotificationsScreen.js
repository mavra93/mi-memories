import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {connect} from 'react-redux'
import {Translate} from 'react-native-translate';
import {getCreatedNotifications} from '../../redux/actions/notificationActions';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import styles from './styles';

class CreatedNotificationsScreen extends Component {


    componentWillMount() {
        const {user, getCreatedNotifications} = this.props;
        getCreatedNotifications(user.uid);
    }

    renderRow = (data) => {
        const notification = data.item;
        const toUser = this.props.users.find(user => user.id === notification.to);
        const sendAt = moment.unix(notification.sendAt).format('LL');
        const createdAt = moment.unix(notification.createdAt).fromNow();
        return (
            <View style={styles.notifyBox}>
                <View style={styles.notifyBoxLeft}>
                    <FastImage style={styles.notifyBoxImage} source={{uri: toUser.profileImage}}/>
                </View>
                <View style={styles.notifyBoxRight}>
                    <Text style={styles.notifyBoxTitle}>{notification.title}</Text>
                        <Text style={styles.notifyBoxMessage}>
                            {toUser.displayName}
                            <Text style={styles.notifyBoxMessageInfo}><Translate value={notification.delivered ? 'gotNotification' : 'willGetNotification'} /></Text>
                            <Text style={styles.notifyBoxMessageDate}>{sendAt}</Text>
                        </Text>
                    <Text style={styles.notifyBoxMessageCreatedDate}>{createdAt}</Text>
                </View>
            </View>
        )
    };

    render() {
        const {createdNotifications} = this.props;
        return (
            <View>
                {createdNotifications.length > 0 ?
                    <FlatList
                        data={createdNotifications}
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
        createdNotifications: state.notification.createdNotifications
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCreatedNotifications: (id) => dispatch(getCreatedNotifications(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatedNotificationsScreen)

