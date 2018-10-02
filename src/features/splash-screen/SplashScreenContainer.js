import React, {Component} from 'react'
import {StatusBar, View} from 'react-native';
import Animation from 'lottie-react-native';
import {connect} from 'react-redux';
import styles from './styles';
import globalStyles from '../../globalStyles';

const animationJson = require("../../animations/heart.json");

class SplashScreenContainer extends Component {

    state = {
        stopAnimation: false
    };

    componentDidMount() {
        this.animation.play();
    }

    componentWillReceiveProps(props) {
        if(props.isLoggedIn || props.userFetched) {
            this.setState({
                stopAnimation: true
            })
        }
    }

    render() {
        return (
            <View style={styles.splashScreenWrapper}>
                <StatusBar
                    backgroundColor={globalStyles.primaryColor}
                    barStyle="light-content"
                />
                <View>
                    {this.state.stopAnimation ? null :
                        <Animation
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={styles.animation}
                            loop={true}
                            source={animationJson}
                        />
                    }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,
    userFetched: state.user.userFetched
});


export default connect(mapStateToProps, null)(SplashScreenContainer)



