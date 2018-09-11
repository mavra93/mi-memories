import React, {Component} from 'react';
import {StatusBar, Animated, Keyboard} from 'react-native';
import {Container, Content} from 'native-base';
import styles from './styles';
import LoginScreenContainer from '../login-screen/LoginScreenContainer';
import RegisterScreenContainer from '../register-screen/RegisterScreenContainer';
import * as Animatable from 'react-native-animatable';

const AUTH_MAX_HEIGHT = 200;
const AUTH_MIN_HEIGHT = 50;

class AuthScreenContainer extends Component {
    state = {
        emailTextInput: null,
        statusBarColor: '#42b72a',
        showRegistration: false
    };

    componentWillMount() {
        this.authHeight = new Animated.Value(AUTH_MIN_HEIGHT);
        this.imageHeight = new Animated.Value(250);
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    decreaseImageHeight = () => {
        Animated.timing(this.imageHeight, {
            toValue: 100,
        }).start();
    };

    keyboardDidShow = () => {
        this.decreaseImageHeight();
    };

    keyboardDidHide = () => {
        Animated.timing(this.imageHeight, {
            toValue: 200,
        }).start(() => {
            if (!this.state.showRegistration && this.state.emailTextInput) {
                this.setState({
                    emailTextInput: null
                })
            }
        });
    };

    increaseAuthHeight = (emailTextInput) => {
        this.setState({
            emailTextInput
        });

        if (this.authHeight._value === AUTH_MAX_HEIGHT) {
            emailTextInput.focus()
        } else {
            this.decreaseImageHeight();
            Animated.timing(this.authHeight, {
                toValue: AUTH_MAX_HEIGHT,
                duration: 500
            }).start(() => {
                emailTextInput.focus()
            })
        }
    };


    handleScreenSwitch = (type) => {
        this.setState({
            showRegistration: type === 'registration'
        });

        Animated.timing(this.authHeight, {
            toValue: AUTH_MAX_HEIGHT + (type === 'registration' ? 60 : 0),
            duration: 500
        }).start()
    };

    render() {
        const content = this.state.showRegistration ?
            <RegisterScreenContainer onLoginClick={this.handleScreenSwitch}/>
            :
            <LoginScreenContainer
                onInputClick={this.increaseAuthHeight}
                onRegistrationClick={this.handleScreenSwitch}
            />;
        return (
            <Container>
                <StatusBar
                    backgroundColor={this.state.statusBarColor}
                    barStyle="light-content"
                />
                <Content contentContainerStyle={styles.loginScreenContainer}>
                    <Animated.View style={[styles.logoContainer]}>
                        <Animatable.View animation="fadeInDown" iterationCount={1}>
                            <Animated.Image style={[styles.logoImage, {height: this.imageHeight}]}
                                            source={require('../../assets/images/logo.png')}/>
                        </Animatable.View>
                    </Animated.View>
                    <Animated.View style={[styles.formContainer, {height: this.authHeight}]}>
                        {content}
                    </Animated.View>
                </Content>
            </Container>
        )
    }
}

export default AuthScreenContainer

