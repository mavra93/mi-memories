import React, {Component} from 'react';
import {View, FlatList, Animated, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import Interactable from 'react-native-interactable';
import debounce from 'lodash/debounce';
import {signOut} from '../../redux/actions/userActions';
import {fetchMemories, resetMemories, searchMemories} from '../../redux/actions/memoryActions';
import styles from './styles';
import MemoryBox from "./components/MemoryBox";
import {createdBy} from '../../helpers/createdBy'
import Filters from './components/Filters';
import Loader from '../_shared/loader/Loader';

class HomeScreenContainer extends Component {
    state = {
        loadMoreReady: false,
        deltaY: new Animated.Value(-130),
        scrollEnabled: false,
        order: 'desc'
    };

    componentDidMount() {
        this.props.fetchMemories()
    }

    componentWillUnmount() {
        this.props.resetMemories();
    }

    signOut = () => {
        this.props.signOut();
    };

    rowRenderer = (data) => {
        const memory = data.item;
        return <MemoryBox memory={data.item} createdBy={createdBy(memory, this.props.users)}/>;
    };

    handleListEnd = () => {
        const {initialLoadFinished, fetchMemories} = this.props;
        if (initialLoadFinished) {
            fetchMemories(true, this.props.lastVisible, this.state.order)
        }
    };

    onSnap = () => {
        this.setState({
            scrollEnabled: this.state.deltaY._value <= -130 || this.props.memories.length < 1
        })
    };

    onStop = () => {
        this.setState({
            scrollEnabled: this.state.deltaY._value === -130 || this.props.memories.length < 1
        })
    };

    handleSearch = debounce((text) => {
        if(text.length === 0) {
            this.props.resetMemories();
            this.props.fetchMemories();
        } else {
            this.props.searchMemories(text);
        }
        Keyboard.dismiss();
    }, 800);

    fetchByOrder = (order) => {
        this.props.resetMemories();
        this.setState({
            order: order
        });
        this.props.fetchMemories(false, null, order);
    };

    render() {
        const {memories, loading} = this.props;

        return (
            <View style={styles.container}>
                {loading ? <Loader /> : null}
                <Filters deltaY={this.state.deltaY} fetchByOrder={this.fetchByOrder} handleSearch={this.handleSearch}/>
                <Interactable.View
                    verticalOnly={true}
                    snapPoints={[{y: 0}, {y: -130}]}
                    boundaries={{top: -130}}
                    animatedValueY={this.state.deltaY}
                    onSnap={this.onSnap}
                    onStop={this.onStop}>
                    <Animated.View style={[styles.pullUpDown, {
                        borderBottomWidth: this.state.deltaY.interpolate({
                            inputRange: [-130, -50],
                            outputRange: [2, 0]
                        })
                    }]}>
                        <View style={styles.pullUpDownIconWrapper}>
                            <Icon style={styles.pullUpDownIcon} name="ios-menu"/>
                        </View>
                    </Animated.View>
                    {
                        memories.length > 0 ?
                            <Animated.View style={styles.listWrapper}>
                                <FlatList
                                    initialNumToRender={27}
                                    removeClippedSubviews={true}
                                    windowSize={41}
                                    scrollEnabled={this.state.scrollEnabled}
                                    style={styles.list}
                                    data={this.props.memories}
                                    keyExtractor={item => item.createdAt.toString()}
                                    renderItem={this.rowRenderer}
                                    onEndReached={this.handleListEnd}
                                    onEndReachedThreshold={0.1}
                                />
                            </Animated.View>
                            : null
                    }
                </Interactable.View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.memory.loading,
        memories: state.memory.memories,
        lastVisible: state.memory.lastVisible,
        initialLoadFinished: state.memory.initialLoadFinished,
        users: state.user.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMemories: (loadMore, lastVisible, order) => dispatch(fetchMemories(loadMore, lastVisible, order)),
        searchMemories: (text) => dispatch(searchMemories(text)),
        resetMemories: () => dispatch(resetMemories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)

