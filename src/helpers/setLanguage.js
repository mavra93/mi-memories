import en from '../translations/en.json';
import { setLocalization } from 'react-native-translate';

export function setLanguage(language) {
    setLocalization(en);
}