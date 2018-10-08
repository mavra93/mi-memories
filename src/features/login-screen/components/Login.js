import React, {Component} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {Container, Form, Text, View, Button} from 'native-base';
import styles from '../styles';
import globalStyles from '../../../globalStyles';
import * as Animatable from 'react-native-animatable';
import isValid from '../../../helpers/isValid';
import ErrorText from "../../_shared/error-text/ErrorText";

const ANIMATION_DURATION = 500;

class LoginComponent extends Component {
    state = {
        statusBarColor: globalStyles.primaryColor,
        email: {
            value: null,
            type: 'email'
        },
        password: {
            value: null,
            type: 'password'
        }
    };

    handleLogin = () => {
        this.props.login(this.state);
    };

    goToRegisterScreen = () => {
        this.props.onRegistrationClick('registration');
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
        const {onInputClick} = this.props;
        const {email, password, formValid} = this.state;
        return (
            <Container>
                <Form onChange={this.onChange}>
                    <TouchableOpacity onPress={() => onInputClick(this.refs.email)}>
                        <View pointerEvents="none" style={styles.fakeInput}>
                            <TextInput placeholder="Enter your email"
                                       underlineColorAndroid="transparent"
                                       name="email"
                                       ref="email"
                                       value={email.value}/>
                            {!email.isValid && email.value ? <ErrorText text="Email is not valid"/> : null}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.input}>
                        <TextInput placeholder="Enter your password"
                                   underlineColorAndroid="transparent"
                                   name="password"
                                   ref="password"
                                   secureTextEntry={true}
                                   value={password.value}/>
                        {!password.isValid && password.value ? <ErrorText text="Password must be at least 6 characters"/> : null}
                    </View>
                </Form>
                <View style={styles.buttonsWrapper}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={100} duration={ANIMATION_DURATION}>
                        <Button disabled={!formValid} rounded title='Login' onPress={() => this.handleLogin()}
                                style={[styles.button, {opacity: !formValid ? 0.5 : 1}]}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.Text animation="fadeInUp" iterationCount={1} delay={300} duration={ANIMATION_DURATION}
                                     style={styles.greenText}
                                     onPress={() => this.goToRegisterScreen()}>Don't have an
                        account</Animatable.Text>
                </View>
            </Container>
        )
    }
}

export default LoginComponent

