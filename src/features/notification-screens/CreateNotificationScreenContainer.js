import React, {Component} from 'react';
import {View, Text, TextInput, Animated, Keyboard} from 'react-native';
import {connect} from 'react-redux'
import {Button, Form} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {translate} from 'react-native-translate';
import moment from 'moment';
import styles from './styles';
import isValid from '../../helpers/isValid';
import CalendarComponent from './components/CalendarComponent';
import SelectUser from './components/SelectUser';
import {getRandomHour} from '../../helpers/getRandomHour';

const ANIMATION_DURATION = 300;

class CreateNotificationScreenContainer extends Component {

    state = {
        selectedUser: null,
        formValid: false,
        title: {
            value: null,
            type: 'text'
        },
        description: {
            value: null,
            type: 'text'
        },
    };

    componentWillMount() {
        this.calendarOpacity = new Animated.Value(1);
        this.formHeight = new Animated.Value(200);
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    keyboardDidShow = () => {
        Animated.timing(this.calendarOpacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
        }).start(
            Animated.timing(this.formHeight, {
                toValue: 350,
                delay: 5,
                duration: 150,
            }).start()
        )
    };

    keyboardDidHide = () => {
        Animated.timing(this.formHeight, {
            toValue: 200,
            duration: ANIMATION_DURATION
        }).start(
            Animated.timing(this.calendarOpacity, {
                toValue: 1,
                duration: ANIMATION_DURATION
            }).start()
        );
    };

    selectUser = (uid) => {
        this.setState({
            selectedUser: uid
        })
    };

    onDayPress = (day) => {
        let date = moment.unix(day.timestamp / 1000);
        date.hour(getRandomHour());
        console.log(date);
    };

    createNotification = () => {

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
        const {user, users} = this.props;
        const {title, description, formValid} = this.state;
        return (
            <View style={styles.createContainer}>
                <Animated.View style={[styles.header, {opacity: this.calendarOpacity}]}>
                    <CalendarComponent onDayPress={this.onDayPress} />
                </Animated.View>
                <Animated.View style={[styles.form, {height: this.formHeight}]}>
                    <SelectUser user={user} users={users} selectUser={this.selectUser} />
                    <Form onChange={this.onChange} style={styles.formWrapper}>
                        <View>
                            <TextInput style={styles.input}
                                       placeholder={translate('enterNotificationTitle')}
                                       underlineColorAndroid="transparent"
                                       name="title"
                                       ref="title"
                                       value={title.value}/>
                        </View>
                        <View>
                            <TextInput placeholder={translate('enterNotificationDesc')}
                                       underlineColorAndroid="transparent"
                                       multiline={true}
                                       numberOfLines={3}
                                       name="description"
                                       ref="description"
                                       value={description.value}
                                       style={styles.textArea}/>
                        </View>
                    </Form>
                </Animated.View>
                <View style={styles.footer}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={500} duration={ANIMATION_DURATION}>
                        <Button disabled={!formValid}
                                style={[styles.button, {opacity: formValid ? 0.5 : 1}]}
                                rounded
                                title='crateNotification' onPress={() => this.createNotification()}>
                            <Text style={styles.buttonText}>{translate('crateNotification').toUpperCase()}</Text>
                        </Button>
                    </Animatable.View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotificationScreenContainer)

