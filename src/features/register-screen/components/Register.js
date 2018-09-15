import React, {Component} from 'react'
import {View, TextInput} from 'react-native';
import {Container, Form, Button, Text} from 'native-base';
import ErrorText from '../../_shared/error-text/ErrorText'
import styles from '../styles';
import * as Animatable from 'react-native-animatable';
import isValid from '../../helpers/isValid';

const ANIMATION_DURATION = 500;

class RegisterComponent extends Component {

    state = {
        username: {
            value: null,
            type: 'text'
        },
        email: {
            value: null,
            type: 'email'
        },
        password: {
            value: null,
            type: 'password'
        }
    };


    handleSignUp = () => {
        this.props.signUpUser(this.state);
    };

    goToLoginScreen = () => {
        this.props.onLoginClick('login');
    };

    onChange = (e) => {
        const targetName = e._targetInst.memoizedProps.name;
        this.state[targetName].value = e.nativeEvent.text;
        const validation = isValid(this.state, targetName);
        this.setState({
            formValid: validation.isFormValid,
            [targetName]: {
                ...this.state[targetName],
                isValid: validation.isElValid
            }
        });
    };

    render() {
        const {username, email, password, formValid} = this.state;
        return (
            <Container>
                <Form onChange={this.onChange}>
                    <View style={styles.fakeInput}>
                        <TextInput name="username" placeholder="Enter your username"
                                   underlineColorAndroid="transparent"
                                   value={username.value}/>
                        {!username.isValid && username.value ? <ErrorText text="Username is required"/> : null}
                    </View>

                    <View style={styles.input}>
                        <TextInput name="email" placeholder="Enter your email" underlineColorAndroid="transparent"
                                   value={email.value}/>
                        {!email.isValid && email.value ? <ErrorText text="Email is not valid"/> : null}
                    </View>
                    <View style={styles.input}>
                        <TextInput name="password" placeholder="Enter your password" underlineColorAndroid="transparent"
                                   secureTextEntry={true}
                                   value={password.value}/>
                        {!password.isValid && password.value ? <ErrorText text="Password must be at least 6 characters"/> : null}
                    </View>
                </Form>
                <View style={styles.buttonsWrapper}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={100} duration={ANIMATION_DURATION}>
                        <Button disabled={!formValid} rounded title='Login' onPress={() => this.handleSignUp()} style={[styles.button, {opacity: !formValid ? 0.5 : 1}]}>
                            <Text style={styles.buttonText}>REGISTER</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.Text animation="fadeInUp" iterationCount={1} delay={300} duration={ANIMATION_DURATION} style={styles.greenText} onPress={() => this.goToLoginScreen()}>Go back to Login</Animatable.Text>
                </View>
            </Container>
        )
    }
}

export default RegisterComponent

