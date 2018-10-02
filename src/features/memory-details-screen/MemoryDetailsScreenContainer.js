import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, Animated, Image, ScrollView} from 'react-native';
import {Icon, Form, Button, Container} from 'native-base';
import ImageCarousel from 'react-native-image-carousel';
import moment from 'moment';
import styles from './styles';

const HEADER_MAX_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class MemoryDetailsScreenContainer extends Component {

    state = {
        scrollY: new Animated.Value(0),
    };

    componentDidMount() {
        this.imageCarousel = ImageCarousel;
    }

    renderContent = (id) =>  {
        return (
            <Image
                style={styles.imageGallery}
                source={{ uri: this.props.memory.images[id] }}
                resizeMode={'contain'}
            />
        );
    };

    onScroll = () => {
        Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
        )
    }

    render() {
        const {memory} = this.props;
        const {scrollY} = this.state;
        const date = moment.unix(memory.createdAt).format('LL');
        const headerHeight = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });

        return (
            <View style={{flex: 1}}>
                <Animated.View stlye={[styles.header, {height: headerHeight}]}>
                   <ImageCarousel
                        style={styles.imageCarousel}
                        ref={(imageCarousel) => {
                            this.imageCarousel = imageCarousel;
                        }}
                        renderContent={this.renderContent}
                    >
                        {memory.images.map((url) => (
                            <Image
                                style={styles.imageSlider}
                                key={url}
                                source={{uri: url}}
                                resizeMode={'cover'}
                            />
                        ))}
                    </ImageCarousel>}
                </Animated.View>
                <View style={styles.contentWrapper}>
                    <ScrollView
                        scrollEventThrottle={16}
                        onScroll={this.onScroll}>
                        <Text style={styles.title} numberOfLines={2}>{memory.title}</Text>
                        <Text style={styles.category}>{memory.category.toUpperCase()}</Text>
                        <View style={styles.info}>
                            <Text style={styles.date}>{date}</Text>
                            <View style={styles.bullet}></View>
                            <Text style={styles.createdBy}>{memory.createdBy.displayName}</Text>
                        </View>
                        <Text style={styles.description}>{memory.description}</Text>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(null, mapDispatchToProps)(MemoryDetailsScreenContainer)


