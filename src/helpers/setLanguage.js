import {AsyncStorage} from 'react-native';
import en from '../translations/en.json';
import hr from '../translations/hr.json';
import { setLocalization } from 'react-native-translate';
import 'moment/min/locales';
import moment from 'moment'

export function setLanguage(language) {
    if(language === 'en') {
        setLocalization(en);
    } else {
        setLocalization(hr);
    }
    moment.locale(language);
    AsyncStorage.setItem('lang', language);
}