import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, Animated, Image} from 'react-native';
import {Icon, Form, Button, Container} from 'native-base';
import ImageCarousel from 'react-native-image-carousel';
import styles from './styles';


const images = [
    'http://placeimg.com/640/480/any',
    'http://placeimg.com/640/480/any',
    'http://placeimg.com/640/480/any'
]

class MemoryDetailsScreenContainer extends Component {

    componentWillMount() {
        this.imageCarousel = ImageCarousel;
    }

    renderContent = (id) =>  {
        return (
            <Image
                source={{ uri: images[id] }}
                resizeMode={'contain'}
            />
        );
    }

    render() {
        const {memory} = this.props;

        return (
            <Container>
                <Animated.View stlye={[styles.imageHeader, {opacity: 1}]}>
                    <ImageCarousel
                        ref={(imageCarousel) => {
                            this.imageCarousel = imageCarousel;
                        }}
                        renderContent={this.renderContent}
                    >
                        {images.map((url) => (
                            <Image
                                key={url}
                                source={{ uri: url, height: 100 }}
                                resizeMode={'contain'}
                            />
                        ))}
                    </ImageCarousel>
                </Animated.View>
                <Animated.View>
                    <Text>{memory.title}</Text>
                </Animated.View>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(null, mapDispatchToProps)(MemoryDetailsScreenContainer)

