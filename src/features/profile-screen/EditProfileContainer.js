import React, {Component} from 'react'
import {View, Text, Animated, Image, TextInput, Keyboard} from 'react-native';
import {Icon, Form, Button, Container} from 'native-base';
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';
import ImageCarousel from 'react-native-image-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import {editUser} from '../../redux/actions/userActions';
import {getUser} from '../../helpers/getUserFromUsers';
import Loader from "../_shared/loader/Loader";
import styles from './styles';

const ANIMATION_DURATION = 300;
const AVATAR_IMAGE = require('../../assets/images/avatar.png');

class EditProfileContainer extends Component {

    state = {
        formValid: false,
        user: null,
        profileImageChanged: false
    };

    componentDidMount() {
        const {user, users} = this.props;
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

    renderContent = () => {
        return (
            <View style={styles.editProfileImageGalleryContainer}>
                <Image
                    style={styles.editProfileImageGallery}
                    source={this.state.user.profileImage ? {uri: this.state.user.profileImage} : AVATAR_IMAGE}
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
        Keyboard.dismiss();
        const {user, profileImageChanged} = this.state;
        user.displayName = user.displayName.value;
        this.props.editProfile(user, profileImageChanged)
    };

    render() {
        const {loading} = this.props;
        const {user, formValid, profileImageChanged} = this.state;

        return (
            <View style={styles.editProfileWrapper}>
                {loading ? <Loader/> : null}
                {user ?
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
                                    source={user && user.profileImage ? {uri: user.profileImage} : AVATAR_IMAGE}
                                    resizeMode={'cover'}
                                />
                            </ImageCarousel>
                        </View>
                        <View style={styles.editProfileContent}>
                            <Form onChange={this.onChange} style={styles.editProfileContentForm}>
                                <TextInput style={styles.editProfileInput}
                                           placeholder="Enter your username"
                                           underlineColorAndroid="transparent"
                                           name="displayName"
                                           ref="displayName"
                                           value={user && user.displayName.value}/>
                            </Form>
                            <View style={styles.editProfileFooter}>
                                <Animatable.View animation="fadeInUp" iterationCount={1} delay={500}
                                                 duration={ANIMATION_DURATION}>
                                    <Button disabled={!formValid && !profileImageChanged}
                                            style={[styles.editProfileButton, {opacity: !formValid && !profileImageChanged ? 0.5 : 1}]}
                                            rounded
                                            title='createMemory' onPress={() => this.saveUser()}>
                                        <Text style={styles.editProfileButtonText}>SAVE USER</Text>
                                    </Button>
                                </Animatable.View>
                            </View>
                        </View>
                    </View> : null}

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        loading: state.user.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (user, profileImageChanged) => dispatch(editUser(user, profileImageChanged))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)


