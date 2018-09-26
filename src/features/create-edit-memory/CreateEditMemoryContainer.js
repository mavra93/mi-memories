import React, {Component} from 'react';
import {View, Picker, Image} from 'react-native';
import {connect} from 'react-redux'
import {TouchableOpacity, TextInput} from 'react-native';
import {Container, Form, Text, Button} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSlider from 'react-native-image-slider';
import styles from './styles';
import globalStyles from '../../globalStyles';
import * as Animatable from 'react-native-animatable';
import {createMemory} from '../../redux/actions/memoryActions';
import isValid from '../helpers/isValid';
import ErrorText from "../_shared/error-text/ErrorText";

class CreateEditMemoryContainer extends Component {

    state = {
        formValid: false,
        title: {
            value: null,
            type: 'text'
        },
        description: {
            value: null,
            type: 'text'
        },
        category: 'story',
        imagePaths: []
    };

    openImagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            multiple: true
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

    createMemory = () => {
        const {title, description, category, imagePaths} = this.state;
        const memory = {
            title: title.value,
            description: description.value,
            category: category,
            imagePaths: imagePaths
        };

        this.props.createMemory(memory);
    };

    render() {
        const {title, description, category, imagePaths, formValid} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.imageHeader}>
                    <ImageSlider images={imagePaths}/>
                    <Button rounded style={styles.addImageButton} onPress={() => this.openImagePicker()}>
                        <Text>+</Text>
                    </Button>
                </View>
                <Form onChange={this.onChange}>
                    <View style={styles.fakeInput}>
                        <TextInput placeholder="Enter memory title"
                                   underlineColorAndroid="transparent"
                                   name="title"
                                   ref="title"
                                   value={title.value}/>
                        {!title.isValid && title.value ? <ErrorText text="Title is required"/> : null}
                    </View>
                    <View style={styles.input}>
                        <TextInput placeholder="Enter memory description"
                                   underlineColorAndroid="transparent"
                                   multiline={true}
                                   numberOfLines={8}
                                   name="description"
                                   ref="description"
                                   value={description.value}/>
                        {!description.isValid && description.value ? <ErrorText text="Description is required"/> : null}
                    </View>
                    <View>
                        <Picker
                            selectedValue={category}
                            style={{height: 50, width: 400}}
                            onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                            <Picker.Item label="Story" value="story"/>
                            <Picker.Item label="Trip" value="trip"/>
                        </Picker>
                    </View>
                </Form>
                <Button disabled={!formValid || imagePaths.length < 1} style={[styles.button, {opacity: (!formValid || imagePaths.length < 1) ? 0.5 : 1}]} rounded title='createMemory' onPress={() => this.createMemory()}>
                    <Text style={styles.buttonText}>CREATE MEMORY</Text>
                </Button>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createMemory: (memory) => dispatch(createMemory(memory)),
    };
};

export default connect(null, mapDispatchToProps)(CreateEditMemoryContainer)

