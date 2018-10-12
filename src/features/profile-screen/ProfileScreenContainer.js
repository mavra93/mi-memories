import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import Carousel from 'react-native-snap-carousel-tabs';
import {Icon, Button} from 'native-base';
import FastImage from 'react-native-fast-image';
import {getUserMemories} from '../../redux/actions/memoryActions'
import styles from './styles';
import globalStyles from '../../globalStyles';
import {createdBy} from '../../helpers/createdBy';
import Loader from '../_shared/loader/Loader';
import SliderEntry from "./components/SliderEntry";

class ProfileScreenContainer extends Component {

    componentDidMount() {
        this.props.getUserMemories(this.props.user.uid);
    }

    renderItem = (data) => {
        const memory = data.item;
        return (
            <SliderEntry memory={memory} createdBy={createdBy(memory, this.props.users)}/>
        );
    };

    getInfo = (userMemories) => {
        const storyCategory = 'story';
        let stories = 0;
        let trips = 0;
        if(userMemories) {
            userMemories.forEach(memory => {
                if(memory.category === storyCategory) {
                    stories++;
                } else {
                    trips++
                }
            })
        }
        return {
            trips,
            stories
        }
    };

    render() {
        const {user, loading, userMemories} = this.props;
        const info = this.getInfo(userMemories);
        return (
            <View style={styles.layoutContainer}>
                <Button title="editButton" style={styles.editButton}>
                    <Text style={styles.editButtonText}>EDIT</Text>
                </Button>
                <View style={styles.profileContainer}>
                    <Icon name="ios-log-out" style={styles.signOutButtonIcon}/>
                    <FastImage style={styles.profileImage} source={require('../../assets/images/avatar.png')}/>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.contentInfoContainer}>
                        <View style={[styles.contentInfoBox, styles.contentInfoBoxFirst]}>
                            <Text style={styles.contentInfoBoxTitle}>Trips created</Text>
                            <Text style={styles.contentInfoBoxValue}>{info.trips}</Text>
                        </View>
                        <View style={[styles.contentInfoBox, styles.contentInfoBoxSecond]}>
                            <Text style={styles.contentInfoBoxTitle}>Stories created</Text>
                            <Text style={styles.contentInfoBoxValue}>{info.stories}</Text>
                        </View>
                    </View>
                    <View style={styles.contentCarouselContainer}>
                        <Carousel
                            layout={'default'}
                            data={userMemories}
                            renderItem={this.renderItem}
                            sliderWidth={globalStyles.screenWidth}
                            itemWidth={globalStyles.screenWidth - 90}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        loading: state.memory.loading,
        userMemories: state.memory.userMemories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserMemories: (id) => dispatch(getUserMemories(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreenContainer)

