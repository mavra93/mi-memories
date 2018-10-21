import React, {Component} from 'react';
import {View, Picker, Animated, Keyboard} from 'react-native';
import {connect} from 'react-redux'
import {TextInput} from 'react-native';
import moment from 'moment';
import {Icon, Form, Text, Button, Container} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSlider from 'react-native-image-slider';
import * as Animatable from 'react-native-animatable';
import {translate} from 'react-native-translate';
import styles from './styles';
import globalStyles from '../../globalStyles';
import {createMemory, editMemory} from '../../redux/actions/memoryActions';
import isValid from '../../helpers/isValid';
import {capitalizeFirstLetter} from '../../helpers/capitalize';
import Loader from '../_shared/loader/Loader';

const ANIMATION_DURATION = 300;

class CreateEditMemoryContainer extends Component {

    state = {
        formValid: false,
        editMode: false,
        title: {
            value: null,
            type: 'text'
        },
        description: {
            value: null,
            type: 'text'
        },
        categories: [translate('story'), translate('trip')],
        category: translate('story'),
        imagePaths: []
    };

    componentWillMount() {
        this.imageSliderOpacity = new Animated.Value(1);
        this.formHeight = new Animated.Value(200);
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        this.prepareMemory(this.props.memory)
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    prepareMemory = (memory) => {
        if(memory) {
            this.setState({
                editMode: true,
                formValid: true,
                title: {
                    value: memory.title,
                    type: 'text'
                },
                description: {
                    value: memory.description,
                    type: 'text'
                },
                imagePaths: memory.images,
                category: translate(memory.category)
            })
        }
    };

    keyboardDidShow = () => {
        Animated.timing(this.imageSliderOpacity, {
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
            Animated.timing(this.imageSliderOpacity, {
                toValue: 1,
                duration: ANIMATION_DURATION
            }).start()
        );
    };

    openImagePicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            compressImageMaxWidth: 320,
            compressImageQuality: 0.2
        }).then(images => {
            const combinedArray = [...this.state.imagePaths, ...images];
            const result = combinedArray.map(image => image.path ? image.path : image);
            this.setState({
                imagePaths: result
            });
        });
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

    createEditMemory = () => {
        const {title, description, category, imagePaths, editMode} = this.state;
        const {user, users, memory} = this.props;
        const memoryObj = {
            title: title.value,
            description: description.value,
            category: category,
            imagePaths: imagePaths,
            createdAt: moment().unix(),
            createdBy: user.uid
        };
        Keyboard.dismiss();
        if(editMode) {
            memoryObj.uid = memory.uid;
            memoryObj.createdAt = memory.createdAt;
            memoryObj.createdBy = memory.createdBy;
            this.props.editMemory(memoryObj);
        } else {
            this.props.createMemory(memoryObj, user, users);
        }
    };

    render() {
        const {title, description, category, imagePaths, formValid, categories, editMode} = this.state;
        return (
            <Container>
                {this.props.memoryCreationStarted ? <Loader/> : null}
                <Animated.View style={[styles.imageHeader, {opacity: this.imageSliderOpacity}]}>
                    <ImageSlider images={imagePaths}/>
                    <Button rounded title="open image picker" style={styles.addImageButton}
                            onPress={() => this.openImagePicker()}>
                        <Icon name="ios-images" style={styles.addImageIcon}/>
                    </Button>
                </Animated.View>
                <Animated.View style={[styles.form, {height: this.formHeight}]}>
                    <Form onChange={this.onChange}>
                        <View>
                            <TextInput style={styles.input}
                                       placeholder={translate('enterMemoryTitle')}
                                       underlineColorAndroid="transparent"
                                       name="title"
                                       ref="title"
                                       value={title.value}/>
                        </View>
                        <View style={styles.input}>
                            <TextInput placeholder={translate('enterMemoryDesc')}
                                       underlineColorAndroid="transparent"
                                       multiline={true}
                                       numberOfLines={3}
                                       name="description"
                                       ref="description"
                                       value={description.value}
                                       style={styles.textArea}/>
                        </View>
                        <View>
                            <Picker
                                selectedValue={category}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                                {categories.map((category, i) => {
                                    return (
                                        <Picker.Item key={i} label={capitalizeFirstLetter(category)} value={category}
                                                     color={globalStyles.borderPrimaryColor}/>
                                    )
                                })}
                            </Picker>
                        </View>
                    </Form>
                </Animated.View>
                <View style={styles.footer}>
                    <Animatable.View animation="fadeInUp" iterationCount={1} delay={500} duration={ANIMATION_DURATION}>
                        <Button disabled={!formValid || imagePaths.length < 1}
                                style={[styles.button, {opacity: (!formValid || imagePaths.length < 1) ? 0.5 : 1}]}
                                rounded
                                title='createEditMemory' onPress={() => this.createEditMemory()}>
                            <Text style={styles.buttonText}>{translate(editMode ? 'editMemory' : 'createMemory').toUpperCase()}</Text>
                        </Button>
                    </Animatable.View>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        memoryCreationStarted: state.memory.memoryCreationStarted
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createMemory: (memory, user, users) => dispatch(createMemory(memory, user, users)),
        editMemory: (memory) => dispatch(editMemory(memory))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditMemoryContainer)

