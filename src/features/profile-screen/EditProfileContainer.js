import React, {Component} from 'react'
import {View, Text, Animated, Image, TextInput} from 'react-native';
import {Icon, Form, Button, Container} from 'native-base';
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';
import ImageCarousel from 'react-native-image-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import {editUser} from '../../redux/actions/userActions';
import {getUser} from '../../helpers/getUserFromUsers';

const clone = require('clone');

import styles from './styles';
import isValid from "../../helpers/isValid";

const ANIMATION_DURATION = 300;

class EditProfileContainer extends Component {

    state = {
        formValid: false,
        user: null,
        profileImageChanged: false
    };

    componentDidMount() {
        const {user, users} = this.props;
        this.stickyHeaderHeight = new Animated.Value(0);
        this.imageCarousel = ImageCarousel;
        const userData = getUser(user.uid, users);
        this.setState({
            user: {
                ...userData,
                displayName: {value: userData.displayName, type: 'text'},
                profileImage: userData.profileImage || null
            }
        })
    }

    selectProfileImage = () => {

    }

    renderContent = () => {
        return (
            <View style={styles.editProfileImageGalleryContainer}>
                <Image
                    style={styles.editProfileImageGallery}
                    source={{uri: this.state.user.profileImage}}
                    resizeMode={'contain'}
                />
            </View>
        );
    };

    openImagePicker = () => {
        ImagePicker.openPicker({
            multiple: false,
            compressImageMaxWidth: 320,
            compressImageQuality: 0.2
        }).then(image => {
            this.setState(prevState => ({
                profileImageChanged: true,
                user: {
                    ...prevState.user,
                    profileImage: image.path
                }
            }))
        });
    };

    onChange = (e) => {
        const targetName = e._targetInst.memoizedProps.name;
        this.state.user[targetName].value = e.nativeEvent.text;
        this.setState({
            formValid: this.state.user[targetName].value.length > 0,
        });
    };

    saveUser = () => {
        const {user, profileImageChanged} = this.state;
        user.displayName = user.displayName.value;
        this.props.editProfile(user, profileImageChanged)
    };

    render() {
        const {loading} = this.props;
        const {user, formValid} = this.state;

        return (
            user ?
                <View style={styles.editProfileContainer}>
                    <View style={styles.editProfileImageHeader}>
                        <Button rounded title="open image picker" style={styles.editProfileAddImageButton}
                                onPress={() => this.openImagePicker()}>
                            <Icon name="ios-images" style={styles.editProfileAddImageIcon}/>
                        </Button>
                        <ImageCarousel
                            style={styles.editProfileImageCarousel}
                            ref={(imageCarousel) => {
                                this.imageCarousel = imageCarousel;
                            }}
                            renderContent={this.renderContent}
                        >
                            <Image
                                style={styles.editProfileImageSlider}
                                source={{uri: user.profileImage}}
                                resizeMode={'cover'}
                            />
                        </ImageCarousel>
                    </View>
                    <View style={styles.editProfileContent}>
                        <Form onChange={this.onChange}>
                            <View>
                                <TextInput style={styles.input}
                                           placeholder="Enter your username"
                                           underlineColorAndroid="transparent"
                                           name="displayName"
                                           ref="displayName"
                                           value={user.displayName.value}/>
                            </View>
                        </Form>
                        <View style={styles.editProfileFooter}>
                            <Animatable.View animation="fadeInUp" iterationCount={1} delay={500}
                                             duration={ANIMATION_DURATION}>
                                <Button disabled={!formValid}
                                        style={[styles.editProfileButton, {opacity: !formValid ? 0.5 : 1}]}
                                        rounded
                                        title='createMemory' onPress={() => this.saveUser()}>
                                    <Text style={styles.editProfileButtonText}>SAVE USER</Text>
                                </Button>
                            </Animatable.View>
                        </View>
                    </View>
                </View> : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        loading: state.memory.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (user, profileImageChanged) => dispatch(editUser(user, profileImageChanged))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)


