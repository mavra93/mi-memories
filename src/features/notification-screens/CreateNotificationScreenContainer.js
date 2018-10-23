import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux'

class CreateNotificationScreenContainer extends Component {

    render() {
        return (
            <View style={{}}>
                <Text>Create New</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotificationScreenContainer)

