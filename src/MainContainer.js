import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {Router, Actions} from 'react-native-router-flux';
import FCM from "react-native-fcm";
import scenes from './scenes';
import {getUser, updateToken} from './redux/actions/userActions';

class MainContainer extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.getUser();
    }

    componentDidUpdate() {
        if(this.props.isLoggedIn) {
            FCM.requestPermissions();
            FCM.getFCMToken().then(token => {
                this.props.updateToken(token)
            });
        }
        this.redirectToInitialScene();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (Actions.currentScene === 'authScreen' || Actions.currentScene === 'layoutScreen' || Actions.currentScene === 'splashScreen') {
        } else if(Actions.currentScene === 'memoryDetails') {
            Actions.pop();
        } else {
            Actions.pop({refresh: {refresh: true}});
        }
        return true;
    };

    redirectToInitialScene = () => {
        const {userFetched, isLoggedIn} = this.props;
        if (isLoggedIn && userFetched) {
            Actions.layoutScreen();
        } else if (!isLoggedIn && userFetched) {
            Actions.authScreen();
        } else {
            Actions.splashScreen();
        }
    };

    getUser = () => {
        this.props.getUser();
    };

    render() {
        return (
            <Router scenes={scenes}/>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    userFetched: state.user.userFetched
});

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser()),
        updateToken: (token) => dispatch(updateToken(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)


