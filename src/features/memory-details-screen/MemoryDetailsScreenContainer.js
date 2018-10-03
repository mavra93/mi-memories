import React, {Component} from 'react'
import {View, Text, Animated, Image, ScrollView} from 'react-native';
import ImageCarousel from 'react-native-image-carousel';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import moment from 'moment';
import styles from './styles';

const HEADER_MAX_HEIGHT = 250;

class MemoryDetailsScreenContainer extends Component {

    componentDidMount() {
        this.stickyHeaderHeight = new Animated.Value(0);
        this.imageCarousel = ImageCarousel;
    }

    renderContent = (id) => {
        return (
            <Image
                style={styles.imageGallery}
                source={{uri: this.props.memory.images[id]}}
                resizeMode={'contain'}
            />
        );
    };

    renderFixedHeader = () => {
        return (
            <Animated.View style={[styles.stickyHeader, {height: this.stickyHeaderHeight}]}>
                {this.renderHeader()}
            </Animated.View>
        )
    };

    renderHeader = () => {
        const {memory} = this.props;
        const date = moment.unix(memory.createdAt).format('LL');
        return (
            <View style={styles.header}>
                <Text style={styles.title} numberOfLines={2}>{memory.title}</Text>
                <Text style={styles.category}>{memory.category.toUpperCase()}</Text>
                <View style={styles.info}>
                    <Text style={styles.date}>{date}</Text>
                    <View style={styles.bullet}></View>
                    <Text style={styles.createdBy}>{memory.createdBy.displayName}</Text>
                </View>
            </View>
        )
    };

    renderForeground = () => {
        const {memory} = this.props;
        return (
            <View>
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
                </ImageCarousel>
            </View>
        )
    };

    animateStickyHeader = (value) => {
        Animated.timing(this.stickyHeaderHeight, {
            toValue: value || 0,
            duration: 0
        }).start();
    };

    onScroll = (e) => {
        if (e.nativeEvent.contentOffset.y > HEADER_MAX_HEIGHT) {
            this.animateStickyHeader(150);
        } else {
            this.animateStickyHeader();
        }
    };

    render() {
        const {memory} = this.props;

        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    parallaxHeaderHeight={HEADER_MAX_HEIGHT}
                    renderFixedHeader={this.renderFixedHeader}
                    scrollEvent={this.onScroll}
                    renderForeground={this.renderForeground}>
                    <View style={styles.contentWrapper}>
                        {this.renderHeader()}
                        <Text style={styles.description}>{memory.description}</Text>
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }
}

export default MemoryDetailsScreenContainer


