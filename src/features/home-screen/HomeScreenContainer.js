import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {RecyclerListView, DataProvider} from 'recyclerlistview';
import {signOut} from '../../redux/actions/userActions';
import {fetchMemories} from '../../redux/actions/memoryActions';
import styles from './styles';
import {LayoutUtil} from './components/LayoutUtil';
import MemoryBox from "./components/MemoryBox";

class HomeScreenContainer extends Component {

    state = {
        dataProvider: new DataProvider((r1, r2) => {
            return r1 !== r2;
        }),
        layoutProvider: LayoutUtil.getLayoutProvider(0)
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.memories && (nextProps.memories.length >= this.props.memories.length)) {
            this.setState({
                dataProvider: this.state.dataProvider.cloneWithRows(
                    nextProps.memories
                ),
            });
        }
    }

    componentDidMount() {
        this.props.fetchMemories()
    }

    signOut = () => {
        this.props.signOut();
    };

    rowRenderer = (type, data) => {
        return <MemoryBox memory={data}/>;
    };

    render() {

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <View style={styles.listWrapper}>
                    <RecyclerListView
                        style={styles.list}
                        dataProvider={this.state.dataProvider}
                        rowRenderer={this.rowRenderer}
                        layoutProvider={this.state.layoutProvider}
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        memories: state.memory.memories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        fetchMemories: () => dispatch(fetchMemories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)

