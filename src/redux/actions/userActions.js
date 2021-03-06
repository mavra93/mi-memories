import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore'
import {Actions} from 'react-native-router-flux';

export const GET_USER = 'GET_USER';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERR = 'AUTH_ERR';
export const USER_FETCHED = 'USER_FETCHED';
export const SIGNED_OUT = 'SIGNED_OUT';

const firestore = firebaseApp.firestore();
firestore.settings({timestampsInSnapshots: true});

export function getUser() {
    return dispatch => {
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user) {
                dispatch({
                    type: GET_USER,
                    payload: user
                })
            } else {
                dispatch({
                    type: USER_FETCHED
                })
            }
        });
    }
}

export function login(user) {
    return dispatch => {
        firebaseApp.auth().signInWithEmailAndPassword(user.email, user.password).then(user => {
            dispatch({
                type: AUTH_SUCCESS,
                payload: user
            })
        }).catch(err => {
            dispatch({
                type: AUTH_ERR,
                payload: err
            })
        })
    }
}

export function updateProfile(username, inRegistration) {
    firebaseApp.auth().currentUser.updateProfile({displayName: username}).then(() => {
        const currentUser = firebaseApp.auth().currentUser;
        firestore.collection('users').doc(currentUser.uid).set({
            displayName: currentUser.displayName,
            email: currentUser.email
        }).then(() => {
            if (inRegistration) {
                Actions.loginScreen()
            }
            console.log(currentUser.uid);
        }).catch((error) => {
            console.error(error);
        });
    })
}

export function signUp(user) {
    let userInfo = user;
    return dispatch => {
        firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password).then(() => {
            updateProfile(userInfo.username, true);
        }).catch(err => {
            dispatch({
                type: AUTH_ERR,
                payload: err
            })
        })
    }
}

export function signOut() {
    return dispatch => {
        firebaseApp.auth().signOut().then(function() {
            dispatch({
                type: SIGNED_OUT,
            })
        }).catch(err => {
            // An error happened.
        });
    }
}

