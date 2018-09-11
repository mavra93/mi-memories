import React, {Component} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {Container, Form, Text, View, Button} from 'native-base';
import styles from '../styles';
import globalStyles from '../../../globalStyles';
import * as Animatable from 'react-native-animatable';

const ANIMATION_DURATION = 500;

class LoginComponent extends Component {
    state = {
        statusBarColor: globalStyles.primaryColor,
        email: null,
        password: null
    };

    handleLogin = () => {
        this.props.login(this.state);
    };

    goToRegisterScreen = () => {
        this.props.onRegistrationClick('registration');
    };

    onChange = (e) => {
        this.setState({
            [e._targetInst.memoizedProps.name]: e.nativeEvent.text
        });
    };

    render() {
        const {onInputClick} = this.props;
        return (
            <Container>
                <Form onChange={this.onChange}>
                    <TouchableOpacity onPress={() => onInputClick(this.refs.emailTextInput)}>
                        <View pointerEvents="none" style={styles.fakeInput}>
                            <TextInput ref="emailTextInput" placeholder="Enter your email"
                                       underlineColorAndroid="transparent"
                                       name="email"
                                       value={this.state.email}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.input}>
                        <TextInput placeholder="Enter your password" underlineColorAndroid="transparent"
                                   name="password"
                                   value={this.state.password}/>
                    </View>
                </Form>
                <View style={styles.buttonsWrapper}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={100} duration={ANIMATION_DURATION}>
                        <Button rounded title='Login' onPress={() => this.handleLogin()} style={styles.button}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </Button>
                    </Animatable.View>
                    <Animatable.Text animation="fadeInUp" iterationCount={1} delay={300} duration={ANIMATION_DURATION} style={styles.greenText}
                                     onPress={() => this.goToRegisterScreen()}>Don't have an
                        account</Animatable.Text>
                </View>
            </Container>
        )
    }
}

export default LoginComponent

