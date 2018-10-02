import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore'

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
            if (user) {
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
        firebaseApp.auth().signInWithEmailAndPassword(user.email.value, user.password.value).then(user => {
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

function updateProfile(username) {
    firebaseApp.auth().currentUser.updateProfile({displayName: username}).then(() => {
        const currentUser = firebaseApp.auth().currentUser;
        const user = {
            displayName: currentUser.displayName,
            email: currentUser.email,
            id: currentUser.uid
        };
        firestore.collection('users').doc(currentUser.uid).set(user);
    })
}

export function signUp(user) {
    let userInfo = user;
    return dispatch => {
        firebaseApp.auth().createUserWithEmailAndPassword(user.email.value, user.password.value).then(() => {
            updateProfile(userInfo.username.value);
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
        firebaseApp.auth().signOut().then(() => {
            dispatch({
                type: SIGNED_OUT,
            })
        }).catch(err => {
            // An error happened.
        });
    }
}

