import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from "native-base";
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {translate} from 'react-native-translate';
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux';
import CreatedNotificationsScreen from './CreatedNotificationsScreen';
import ReceivedNotificationsScreen from './ReceivedNotificationsScreen';
import {getCreatedNotifications} from '../../redux/actions/notificationActions';
import globalStyles from '../../globalStyles';
import styles from './styles';
import Loader from '../_shared/loader/Loader';

class NotificationScreenContainer extends Component {

    state = {
        index: 0,
        routes: [
            {
                key: 'created',
                title: translate('created')
            },
            {
                key: 'received',
                title: translate('received')
            },
        ],
    };

    openCreateScreen = () => {
        Actions.createNotificationScreen();
    };

    render() {
        const {loading} = this.props;
        return (
            <View style={styles.container}>
                {loading ? <Loader /> : null}
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        created: CreatedNotificationsScreen,
                        received: ReceivedNotificationsScreen,
                    })}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            indicatorStyle={styles.tabBarIndicator}
                            labelStyle={styles.tabBarLabel}
                            style={styles.tabBar}
                        />
                    }
                    onIndexChange={index => this.setState({index})}
                    initialLayout={{width: globalStyles.screenWidth, height: globalStyles.screenHeight}}
                />
                <TouchableOpacity style={styles.createNewButton} onPress={() => this.openCreateScreen()}>
                    <Icon name="ios-send" style={styles.createNewButtonIcon} />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        createdNotifications: state.notification.createdNotifications,
        loading: state.notification.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCreatedNotifications: (id) => dispatch(getCreatedNotifications(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreenContainer)

