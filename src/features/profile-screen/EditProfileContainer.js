import React, {Component} from 'react'
import {View, Text, TextInput, Keyboard, Picker, AsyncStorage} from 'react-native';
import {Icon, Form, Button} from 'native-base';
import {connect} from 'react-redux'
import * as Animatable from 'react-native-animatable';
import ImageCarousel from 'react-native-image-carousel';
import ImagePicker from 'react-native-image-crop-picker';
import {translate} from 'react-native-translate';
import {editUser} from '../../redux/actions/userActions';
import {getUser} from '../../helpers/getUserFromUsers';
import Loader from "../_shared/loader/Loader";
import styles from './styles';
import FastImage from "react-native-fast-image";
import globalStyles from "../../globalStyles";
import {setLanguage} from "../../helpers/setLanguage";

const ANIMATION_DURATION = 300;
const AVATAR_IMAGE = require('../../assets/images/avatar.png');

class EditProfileContainer extends Component {

    state = {
        formValid: false,
        user: null,
        profileImageChanged: false,
        languageChanged: false,
        languages: ['en', 'hr'],
        language: null
    };

    componentDidMount() {
        const {user, users} = this.props;
        this.imageCarousel = ImageCarousel;
        const userData = getUser(user.uid, users);
        AsyncStorage.getItem('lang').then((value) => {
            this.setState({
                language: value || 'en'
            })
        });
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
                <FastImage
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
        const {user, profileImageChanged, language} = this.state;
        setLanguage(language);
        this.props.editProfile(user, profileImageChanged)
    };

    render() {
        const {loading} = this.props;
        const {user, formValid, profileImageChanged, languages, language, languageChanged} = this.state;

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
                                <FastImage
                                    style={styles.editProfileImageSlider}
                                    source={user && user.profileImage ? {uri: user.profileImage} : AVATAR_IMAGE}
                                    resizeMode={'cover'}
                                />
                            </ImageCarousel>
                        </View>
                        <View style={styles.editProfileContent}>
                            <Form onChange={this.onChange} style={styles.editProfileContentForm}>
                                <TextInput style={styles.editProfileInput}
                                           placeholderTextColor={globalStyles.textPrimaryColor}
                                           placeholder={translate('enterUsername')}
                                           underlineColorAndroid="transparent"
                                           name="displayName"
                                           ref="displayName"
                                           value={user && user.displayName.value}/>
                                {language ?
                                    <Picker
                                        selectedValue={language}
                                        style={styles.editProfilePicker}
                                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue, languageChanged: true})}>
                                        {languages.map((language, i) => {
                                            return (
                                                <Picker.Item key={i} label={language}
                                                             value={language}
                                                             color={globalStyles.primaryColor}/>
                                            )
                                        })}
                                    </Picker> : null
                                }
                            </Form>
                            <View style={styles.editProfileFooter}>
                                <Animatable.View animation="fadeInUp" iterationCount={1} delay={500}
                                                 duration={ANIMATION_DURATION}>
                                    <Button disabled={!formValid && !profileImageChanged && !languageChanged}
                                            style={[styles.editProfileButton, {opacity: !formValid && !profileImageChanged && !languageChanged ? 0.5 : 1}]}
                                            rounded
                                            title='createMemory' onPress={() => this.saveUser()}>
                                        <Text
                                            style={styles.editProfileButtonText}>{translate('saveUser').toUpperCase()}</Text>
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


