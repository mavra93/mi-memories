import React, {Component} from 'react'
import {View, Text, Animated, Image} from 'react-native';
import {connect} from 'react-redux';
import ImageCarousel from 'react-native-image-carousel';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {addToFavorite} from '../../redux/actions/memoryActions';

import styles from './styles';
import Header from './components/Header';

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

    addToFavorite = () => {
        const {memory, user} = this.props;
        this.props.addToFavorite(memory, user)
    };

    renderHeader = () => {
        const {memory, user, users} = this.props;
        return <Header memory={memory} user={user} users={users}  addToFavorite={this.addToFavorite} />
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

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToFavorite: (memory, user) => dispatch(addToFavorite(memory, user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoryDetailsScreenContainer)


