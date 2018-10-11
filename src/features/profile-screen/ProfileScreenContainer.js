import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import Carousel from 'react-native-snap-carousel-tabs';
import {Icon, Button} from 'native-base';
import FastImage from 'react-native-fast-image';
import {getFavoriteMemories} from '../../redux/actions/memoryActions'
import styles from './styles';
import globalStyles from '../../globalStyles';
import {createdBy} from '../../helpers/createdBy';
import Loader from '../_shared/loader/Loader';

class ProfileScreenContainer extends Component {

    componentDidMount() {

    }

    render() {
        const {user, loading} = this.props;
        return (
            <View style={styles.layoutContainer}>
                <Button title="editButton" style={styles.editButton}>
                    <Text style={styles.editButtonText}>EDIT</Text>
                </Button>
                <View style={styles.profileContainer}>
                    <Icon name="ios-log-out" style={styles.signOutButtonIcon}/>
                    <View style={styles.profileImageContainer}>
                        <FastImage style={styles.profileImage} source={require('../../assets/images/avatar.png')}/>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.contentInfoContainer}>
                        <View style={styles.contentInfoBox}>

                        </View>
                        <View style={styles.contentInfoBox}>

                        </View>
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
        loading: state.memory.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteMemories: (id) => dispatch(getFavoriteMemories(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreenContainer)

