import React, {Component} from 'react';
import {View, StatusBar, Text, Button} from 'react-native';
import {connect} from 'react-redux'
import {signOut} from '../../redux/actions/userActions'

class HomeScreenContainer extends Component {
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

