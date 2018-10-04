import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux'
import {Text} from 'native-base';
import Carousel from 'react-native-snap-carousel-tabs';
import {getFavoriteMemories} from '../../redux/actions/memoryActions'
import styles from './styles';
import SliderEntry from './components/SliderEntry';
import {createdBy} from '../../helpers/createdBy'

class FavoriteScreenContainer extends Component {

    componentDidMount() {
        const {getFavoriteMemories, user} = this.props;
        getFavoriteMemories("LK7buv5nIuTL2RR3Dj0zFrpzRub2");
    }

    createdBy = (memory) => {
        return this.props.users.find(user => user.id === memory.createdBy)
    };

    renderItem = (data) => {
        const memory = data.item;
        return (
            <SliderEntry memory={memory} createdBy={createdBy(memory, this.props.users)}/>
        );
    };

    render() {
        const {favoriteMemories} = this.props;
        return (
            <View style={styles.layoutContainer}>
                {favoriteMemories && favoriteMemories.length > 0 ?
                    < Carousel
                        layout={'default'} layoutCardOffset={`18`}
                        ref={(c) => {
                            this._carousel = c;
                        }}
                        data={this.props.favoriteMemories}
                        renderItem={this.renderItem}
                        sliderWidth={400}
                        itemWidth={300}
                    /> : null
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        favoriteMemories: state.memory.favoriteMemories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteMemories: (id) => dispatch(getFavoriteMemories(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreenContainer)

