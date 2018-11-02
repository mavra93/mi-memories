import React, {Component} from 'react';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import globalStyles from '../../../globalStyles';
import {getRandomHour} from '../../../helpers/getRandomHour';
import calendarHr from '../../../translations/calendarHr.json';

import styles from '../styles';

class CalendarComponent extends Component {

    state = {
        markedDates: null,
        minDate: null
    };

    componentWillMount() {
        const minDate = moment().add(1, 'days').format('YYYY-MM-DD');
        const markedDates = {
            [minDate]: {selected: true, selectedColor: globalStyles.primaryColor}
        };
        this.setState({
            minDate,
            markedDates
        });
        this.setCalendarLanguage();
    }

    setCalendarLanguage = () =>  {
        const currentLocale = moment.locale();
        if(currentLocale !== 'en') {
            LocaleConfig.locales[currentLocale] = calendarHr;
        } else {
            LocaleConfig.locales.en = LocaleConfig.locales[''];
        }
        LocaleConfig.defaultLocale = currentLocale;
    };

    onDayPress = (day) => {
        let date = moment.unix(day.timestamp / 1000);
        date.hour(getRandomHour());
        this.props.onDayPress(date);
        const markedDates = {
            [date.format('YYYY-MM-DD')]: {selected: true, selectedColor: globalStyles.primaryColor}
        };
        this.setState({
            markedDates
        })
    };

    render() {
        const {minDate, markedDates} = this.state;
        return (
            <CalendarList
                style={styles.calendar}
                minDate={minDate}
                onDayPress={(day) => this.onDayPress(day)}
                pastScrollRange={0}
                futureScrollRange={50}
                markedDates={markedDates}
                theme={{
                    backgroundColor: globalStyles.secondaryBackgroundColor,
                    textDisabledColor: globalStyles.backgroundPrimaryColor,
                    calendarBackground: globalStyles.secondaryBackgroundColor,
                    selectedDayTextColor: globalStyles.textPrimaryColor,
                    todayTextColor: globalStyles.primaryColor,
                    dayTextColor: globalStyles.textPrimaryColor,
                    monthTextColor: globalStyles.textPrimaryColor,
                    textDayFontFamily: globalStyles.montserratBold,
                    textMonthFontFamily: globalStyles.montserratBold,
                    textDayHeaderFontFamily: globalStyles.montserratBold,
                }}
            />
        )
    }
}

export default CalendarComponent

