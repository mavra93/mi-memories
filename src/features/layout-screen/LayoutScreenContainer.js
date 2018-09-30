import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux'
import {Text} from 'native-base';
import {signOut} from '../../redux/actions/userActions'
import HomeScreenContainer from "../home-screen/HomeScreenContainer";
import Tabs from '../_shared/tabs/Tabs';
import {homeScreen, favoriteScreen, notificationsScreen, profileScreen} from '../_shared/tabs/Tabs';
import styles from './styles';

class LayoutScreenContainer extends Component {

    state = {
        currentScreen: homeScreen
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.loadHomeScreen || nextProps.refresh) {
            this.setState({
                currentScreen: homeScreen
            })
        }
    }

    changeScene = (screen) => {
        this.setState({
            currentScreen: screen
        })
    };

    showComponent = (currentScreen) => {
        let currentComponent = null;
        switch(currentScreen) {
            case homeScreen:
                currentComponent = <HomeScreenContainer />;
                break;
            case favoriteScreen:
                currentComponent = <Text>favorite</Text>;
                break;
            case notificationsScreen:
                currentComponent = <Text>notifications</Text>;
                break;
            case profileScreen:
                currentComponent = <Text>profile</Text>;
                break;
        }
        return currentComponent;
    };

    render() {
        const {currentScreen} = this.state;
        const screenToShow = this.showComponent(currentScreen);
        return (
            <View style={styles.layoutContainer}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                {screenToShow}
                <Tabs changeScene={this.changeScene}/>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

export default connect(null, mapDispatchToProps)(LayoutScreenContainer)

