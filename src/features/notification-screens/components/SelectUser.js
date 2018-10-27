import React, {Component} from 'react';
import Carousel from 'react-native-snap-carousel-tabs';
import {Picker} from 'react-native';
import globalStyles from "../../../globalStyles";
import styles from '../styles';

class SelectUser extends Component {

    state = {
        selectedUser: null
    };

    componentDidMount() {
        const {user, users} = this.props;
        const data = users.filter(item => item.id !== user.uid);
        this.props.selectUser(data[0].id);
    }

    selectUser = (uid) => {
        this.props.selectUser(uid);
    };

    render() {
        const {user, users} = this.props;
        const {selectedUser} = this.state;
        const data = users.filter(item => item.id !== user.uid);
        return (
            <Picker
                selectedValue={selectedUser}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.selectUser(itemValue)}>
                {data.map((item, i) => {
                    return (
                        <Picker.Item key={i} label={item.displayName} value={item.id}
                                     color={globalStyles.borderPrimaryColor}/>
                    )
                })}
            </Picker>
        )
    }
}

export default SelectUser

