import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from "native-base";
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {translate} from 'react-native-translate';
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux';
import CreatedNotificationsScreen from './CreatedNotificationsScreen';
import DeliveredNotificationScreen from './DeliveredNotificationsScreen';
import globalStyles from '../../globalStyles';
import styles from './styles';

class NotificationScreenContainer extends Component {

    state = {
        index: 0,
        routes: [
            {
                key: 'created',
                title: translate('created')
            },
            {
                key: 'delivered',
                title: translate('delivered')
            },
        ],
    };

    openCreateScreen = () => {
        Actions.createNotificationScreen();
    };

    render() {
        return (
            <View style={styles.container}>
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        created: CreatedNotificationsScreen,
                        delivered: DeliveredNotificationScreen,
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreenContainer)

