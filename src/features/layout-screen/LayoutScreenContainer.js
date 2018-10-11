import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux'
import {Text} from 'native-base';
import {signOut, getUsers} from '../../redux/actions/userActions'
import HomeScreenContainer from "../home-screen/HomeScreenContainer";
import FavoriteScreenContainer from '../favorites-screen/FavoriteScreenContainer';
import ProfileScreenContainer from '../profile-screen/ProfileScreenContainer';
import Tabs from '../_shared/tabs/Tabs';
import {homeScreen, favoriteScreen, notificationsScreen, profileScreen} from '../_shared/tabs/Tabs';
import styles from './styles';

class LayoutScreenContainer extends Component {

    state = {
        currentScreen: homeScreen,
        key: null
    };

    componentDidMount() {
        this.props.getUsers();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.refresh) {
            this.setState({
                key: Math.random()
            })
        }
    }

    changeScene = (screen) => {
        this.setState({
            currentScreen: screen
        })
    };

    showComponent = (currentScreen, key) => {
        let currentComponent = null;
        switch(currentScreen) {
            case homeScreen:
                currentComponent = <HomeScreenContainer key={key} />;
                break;
            case favoriteScreen:
                currentComponent = <FavoriteScreenContainer key={key} />;
                break;
            case notificationsScreen:
                currentComponent = <Text>notifications</Text>;
                break;
            case profileScreen:
                currentComponent = <ProfileScreenContainer key={key} />;
                break;
        }
        return currentComponent;
    };

    render() {
        const {currentScreen, key} = this.state;
        const screenToShow = this.showComponent(currentScreen, key);
        return (
            <View style={styles.layoutContainer}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                {screenToShow}
                <Tabs changeScene={this.changeScene} />
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getUsers: () => dispatch(getUsers())
    };
};

export default connect(null, mapDispatchToProps)(LayoutScreenContainer)

