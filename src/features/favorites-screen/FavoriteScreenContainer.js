import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux'
import Carousel from 'react-native-snap-carousel-tabs';
import {translate} from 'react-native-translate';
import {getFavoriteMemories} from '../../redux/actions/memoryActions'
import styles from './styles';
import globalStyles from '../../globalStyles';
import SliderEntry from './components/SliderEntry';
import {createdBy} from '../../helpers/createdBy';
import Loader from '../_shared/loader/Loader';

class FavoriteScreenContainer extends Component {

    componentDidMount() {
        const {getFavoriteMemories, user} = this.props;
        getFavoriteMemories(user.uid);
    }

    renderItem = (data) => {
        const memory = data.item;
        return (
            <SliderEntry memory={memory} createdBy={createdBy(memory, this.props.users)}/>
        );
    };

    render() {
        const {favoriteMemories, loading} = this.props;
        return (
            <View style={styles.layoutContainer}>
                {
                    loading ? <Loader /> :
                        favoriteMemories.length > 0 ?
                            <Carousel
                                layout={'default'}
                                data={favoriteMemories}
                                renderItem={this.renderItem}
                                sliderWidth={globalStyles.screenWidth}
                                itemWidth={globalStyles.screenWidth - 90}
                            />
                            :
                            <Text style={styles.noFavoriteMemoriesText}>{translate('noFavoriteMemories')}</Text>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        users: state.user.users,
        favoriteMemories: state.memory.favoriteMemories,
        loading: state.memory.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFavoriteMemories: (id) => dispatch(getFavoriteMemories(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreenContainer)

