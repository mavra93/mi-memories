import React, {Component} from 'react';
import {View, StatusBar, Text, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../../redux/actions/userActions';
import {fetchMemories} from '../../redux/actions/memoryActions';
import styles from './styles';

class HomeScreenContainer extends Component {

    componentDidMount() {
        this.props.fetchMemories();
    }

    signOut = () => {
        this.props.signOut();
    };

    render() {
        const {memories} = this.props;

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <View>
                    <FlatList
                        style={styles.list}
                        data={memories}
                        renderItem={({item}) =>
                            <View style={styles.memoryBox}>
                                <Image
                                    style={{width: 300, height: 58}}
                                    source={{uri: item.images[0]}}
                                />
                                <Text style={styles.memoryTitle}>{item.title}</Text>
                                <Text style={styles.memoryTitle}>{item.description}</Text>
                            </View>
                        }
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
        fetchMemories: () => dispatch(fetchMemories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer)

