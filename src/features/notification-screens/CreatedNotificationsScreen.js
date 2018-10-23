import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux'

class CreatedNotificationsScreen extends Component {

    render() {
        return (
            <View>
                <Text>Create</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatedNotificationsScreen)

