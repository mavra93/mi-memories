import {AsyncStorage} from 'react-native';
import en from '../translations/en.json';
import hr from '../translations/hr.json';
import { setLocalization } from 'react-native-translate';
import 'moment/min/locales';
import moment from 'moment'

export function setLanguage(language) {
    const selectedLanguage = language || 'en';
    if(selectedLanguage === 'hr') {
        setLocalization(hr);
    } else {
        setLocalization(en);
    }
    moment.locale(selectedLanguage);
    AsyncStorage.setItem('lang', selectedLanguage);
}