import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux'
import { Text} from 'native-base';
import { signOut } from '../../redux/actions/userActions'

class CreateMemoryContainer extends Component {
    signOut = () => {
        this.props.signOut();
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <Text>create memory</Text>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

export default connect(null, mapDispatchToProps)(CreateMemoryContainer)

