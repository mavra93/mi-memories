import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {connect} from 'react-redux'
import { Button,  Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import { signOut } from '../../redux/actions/userActions'

class HomeScreenContainer extends Component {
    signOut = () => {
        this.props.signOut();
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    backgroundColor="white"
                    barStyle="light-content"
                />
                <Button rounded info title='signOut' onPress={() => this.signOut()}>
                    <Text>Sign out</Text>
                </Button>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    };
};

export default connect(null, mapDispatchToProps)(HomeScreenContainer)

