import React, {Component} from 'react'
import {View, Text} from 'react-native';
import sharedStyles from '../sharedStyles';
import Animation from 'lottie-react-native';

const animationJson = require("../../../animations/loader.json");

class Loader extends React.PureComponent {

    state = {
        stopAnimation: false
    };

    componentDidMount() {
        this.animation.play();
    }

    componentWillUnmount() {
        this.setState({
            stopAnimation: true
        })
    }

    render() {
        return (
            <View style={sharedStyles.loaderContainer}>
                {this.state.stopAnimation ? null :
                    <Animation
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={sharedStyles.loaderAnimation}
                        loop={true}
                        source={animationJson}
                    />
                }
            </View>
        )
    }
}

export default Loader


