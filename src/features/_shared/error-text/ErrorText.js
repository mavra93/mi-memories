import React, {Component} from 'react'
import sharedStyles from '../sharedStyles';
import * as Animatable from 'react-native-animatable';

const ANIMATION_DURATION = 300;

class ErrorText extends Component {

    render() {
        const {text} = this.props;
        return (
            <Animatable.Text style={sharedStyles.errorText} animation="fadeInUp" iterationCount={1} delay={100} duration={ANIMATION_DURATION}>{text}</Animatable.Text>
        )
    }
}

export default ErrorText


