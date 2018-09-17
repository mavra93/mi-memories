import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {Router, Actions} from 'react-native-router-flux';
import scenes from './scenes';
import {getUser} from './redux/actions/userActions';

class MainContainer extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this.getUser();
    }

    componentDidUpdate() {
        this.redirectToInitialScene();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        return Actions.currentScene === 'authScreen' || Actions.currentScene === 'layoutScreen' || Actions.currentScene === 'splashScreen';
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)


