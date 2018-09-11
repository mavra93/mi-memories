import * as firebase from 'firebase';
import {FirebaseConfig} from './config/FirebaseConfig';
import '@firebase/firestore';

export const firebaseApp = firebase.initializeApp(FirebaseConfig);