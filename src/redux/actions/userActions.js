import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore'

export const GET_USER = 'GET_USER';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERR = 'AUTH_ERR';
export const USER_FETCHED = 'USER_FETCHED';
export const SIGNED_OUT = 'SIGNED_OUT';
export const FETCH_USERS_FINISHED = 'FETCH_USERS_FINISHED';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';

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

export function getUsers() {
    let users = [];
    return dispatch => {
        firestore.collection('users').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const user = doc.data();
                users.push(user);
            });
            dispatch({
                type: FETCH_USERS_FINISHED,
                payload: users
            });
        }).catch((error) => {
            dispatch({
                type: FETCH_USERS_ERROR,
                payload: error
            });
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

export function updateToken(token) {
    return dispatch => {
        const currentUser = firebaseApp.auth().currentUser;
        const user = {
            displayName: currentUser.displayName,
            email: currentUser.email,
            id: currentUser.uid,
            token: token
        };
        firestore.collection('users').doc(currentUser.uid).set(user).then(() => {
            dispatch({
                type: UPDATE_USER_TOKEN,
                payload: {token}
            })
        });
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

