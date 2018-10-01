import React, {Component} from 'react';
import {View, StatusBar, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../../redux/actions/userActions';
import {fetchMemories} from '../../redux/actions/memoryActions';
import styles from './styles';
import {LayoutUtil} from './components/LayoutUtil';
import MemoryBox from "./components/MemoryBox";

class HomeScreenContainer extends Component {

    state = {
        layoutProvider: LayoutUtil.getLayoutProvider(0),
        loadMoreReady: false
    };

    componentDidMount() {
        this.props.fetchMemories()
    }

    signOut = () => {
        this.props.signOut();
    };

    rowRenderer = (data) => {
        return <MemoryBox memory={data.item}/>;
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
                                keyExtractor={item => item.title}
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
        initialLoadFinished: state.memory.initialLoadFinished
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        fetchMemories: (loadMore, lastVisible) => dispatch(fetchMemories(loadMore, lastVisible))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)

