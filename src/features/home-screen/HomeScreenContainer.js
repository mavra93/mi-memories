import React, {Component} from 'react';
import {View, StatusBar, FlatList, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../../redux/actions/userActions';
import {fetchMemories, resetMemories} from '../../redux/actions/memoryActions';
import styles from './styles';
import {LayoutUtil} from './components/LayoutUtil';
import MemoryBox from "./components/MemoryBox";

const uuid = require('uuid/v1');

class HomeScreenContainer extends Component {

    state = {
        layoutProvider: LayoutUtil.getLayoutProvider(0),
        loadMoreReady: false
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

    createdBy = (memory) => {
        return this.props.users.find(user => user.id === memory.createdBy)
    };

    rowRenderer = (data) => {
        return <MemoryBox memory={data.item} createdBy={this.createdBy(data.item)} />;
    };

    handleListEnd = () => {
        const {initialLoadFinished, fetchMemories} = this.props;
        if (initialLoadFinished) {
            fetchMemories(true, this.props.lastVisible)
        }
    };

    render() {
        const {memories} = this.props;
        return (
            <View style={{flex: 1}}>
                {
                    memories.length > 0 ?
                        <View style={styles.listWrapper}>
                            <FlatList
                                style={styles.list}
                                data={this.props.memories}
                                keyExtractor={item => uuid()}
                                renderItem={this.rowRenderer}
                                onEndReached={this.handleListEnd}
                                onEndReachedThreshold={0.1}
                            />
                        </View>
                        : null
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        memories: state.memory.memories,
        lastVisible: state.memory.lastVisible,
        initialLoadFinished: state.memory.initialLoadFinished,
        users: state.user.users
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        fetchMemories: (loadMore, lastVisible) => dispatch(fetchMemories(loadMore, lastVisible)),
        resetMemories: () => dispatch(resetMemories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)

