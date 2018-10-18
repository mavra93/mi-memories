import React, {Component} from 'react'
import {View, TextInput} from 'react-native';
import {Container, Form, Button, Text} from 'native-base';
import {translate} from 'react-native-translate';
import ErrorText from '../../_shared/error-text/ErrorText'
import styles from '../styles';
import * as Animatable from 'react-native-animatable';
import isValid from '../../../helpers/isValid';

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
                        <TextInput name="username" placeholder={translate('enterUsername')}
                                   underlineColorAndroid="transparent"
                                   value={username.value}/>
                        {!username.isValid && username.value ? <ErrorText text={translate('usernameRequired')} /> : null}
                    </View>

                    <View style={styles.input}>
                        <TextInput name="email" placeholder={translate('enterEmail')} underlineColorAndroid="transparent"
                                   value={email.value}/>
                        {!email.isValid && email.value ? <ErrorText text={translate('emailNotValid')} /> : null}
                    </View>
                    <View style={styles.input}>
                        <TextInput name="password" placeholder={translate('enterPassword')} underlineColorAndroid="transparent"
                                   secureTextEntry={true}
                                   value={password.value}/>
                        {!password.isValid && password.value ? <ErrorText text={translate('passwordNotValid')} /> : null}
                    </View>
                </Form>
                <View style={styles.buttonsWrapper}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={100} duration={ANIMATION_DURATION}>
                        <Button disabled={!formValid} rounded title='Login' onPress={() => this.handleSignUp()} style={[styles.button, {opacity: !formValid ? 0.5 : 1}]}>
                            <Text style={styles.buttonText}>{translate('register').toUpperCase()}</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.Text animation="fadeInUp" iterationCount={1} delay={300} duration={ANIMATION_DURATION} style={styles.greenText} onPress={() => this.goToLoginScreen()}>{translate('backToLogin')}</Animatable.Text>
                </View>
            </Container>
        )
    }
}

export default RegisterComponent

