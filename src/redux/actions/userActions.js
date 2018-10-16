import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore'
import {Actions} from 'react-native-router-flux';
import {uploadImage} from "../../helpers/uploadImage";

export const GET_USER = 'GET_USER';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERR = 'AUTH_ERR';
export const USER_FETCHED = 'USER_FETCHED';
export const SIGNED_OUT = 'SIGNED_OUT';
export const FETCH_USERS_FINISHED = 'FETCH_USERS_FINISHED';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';
export const GET_USER_STARTED = 'GET_USER_STARTED';
export const UPDATE_PROFILE_STARTED = 'UPDATE_PROFILE_STARTED';
export const UPDATE_PROFILE_FINISHED = 'UPDATE_PROFILE_FINISHED';

const firestore = firebaseApp.firestore();
firestore.settings({timestampsInSnapshots: true});

export function getUser() {
    return dispatch => {
        dispatch({
            type: GET_USER_STARTED,
        });
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
            token: token
        };
        firestore.collection('users').doc(currentUser.uid).update(user).then(() => {
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

function updateUserInDatabase(dispatch, data, imageUrl) {
    firebaseApp.auth().currentUser.updateProfile({displayName: data.displayName}).then(() => {
        const currentUser = firebaseApp.auth().currentUser;
        const user = {
            displayName: currentUser.displayName,
            profileImage: imageUrl || data.profileImage
        };
        firestore.collection('users').doc(currentUser.uid).update(user).then(() => {
            dispatch({
                type: UPDATE_PROFILE_FINISHED
            });
            Actions.layoutScreen({refresh: true});
        });
    })
}

export function editUser(data, profileImageChanged) {
    return dispatch => {
        dispatch({
            type: UPDATE_PROFILE_STARTED
        });
        if (profileImageChanged) {
            uploadImage(data.profileImage, 'profileImages').then(url => {
                updateUserInDatabase(dispatch, data, url);
            });
        } else {
            updateUserInDatabase(dispatch, data);
        }
    }
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

