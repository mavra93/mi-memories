import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';

import styles from '../styles';

class CalendarComponent extends Component {

    render() {
        const currentDate = moment().format('YYYY-MM-DD');
        return (
            <CalendarList
                style={styles.calendar}
                minDate={currentDate}
                onDayPress={(day) => {this.props.onDayPress(day)}}
                pastScrollRange={0}
                futureScrollRange={50}
    />
        )
    }
}

export default CalendarComponent

