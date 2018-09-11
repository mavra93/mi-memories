import React, {Component} from 'react'
import {View, StatusBar, Animated, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label, Button, Text} from 'native-base';
import styles from '../styles';
import * as Animatable from 'react-native-animatable';

const ANIMATION_DURATION = 500;

class RegisterComponent extends Component {

    state = {
        username: null,
        email: null,
        password: null
    };


    handleSignUp = () => {
        this.props.signUpUser(this.state);
    };

    goToLoginScreen = () => {
        this.props.onLoginClick('login');
    };

    render() {
        return (

            <Container>
                <Form>
                    <View style={styles.fakeInput}>
                        <TextInput ref="usernameTextInput" placeholder="Enter your username"
                                   underlineColorAndroid="transparent"
                                   onChangeText={(username) => this.setState({username})}
                                   value={this.state.username}/>
                    </View>

                    <View style={styles.input}>
                        <TextInput placeholder="Enter your email" underlineColorAndroid="transparent"
                                   onChangeText={(email) => this.setState({email})}
                                   value={this.state.email}/>
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder="Enter your password" underlineColorAndroid="transparent"
                                   secureTextEntry={true}
                                   onChangeText={(password) => this.setState({password})}
                                   value={this.state.password}/>
                    </View>
                </Form>
                <View style={styles.buttonsWrapper}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={100} duration={ANIMATION_DURATION}>
                        <Button rounded title='Login' onPress={() => this.handleSignUp()} style={styles.button}>
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

