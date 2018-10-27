import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore';
import {Actions} from 'react-native-router-flux';

export const NOTIFICATION_CREATE_FINISHED = 'NOTIFICATION_CREATE_FINISHED';
export const NOTIFICATION_CREATE_STARTED = 'NOTIFICATION_CREATE_STARTED';
export const FETCH_CREATED_NOTIFICATIONS_BEGIN = 'FETCH_CREATED_NOTIFICATIONS_BEGIN';
export const FETCH_CREATED_NOTIFICATIONS_FINISHED = 'FETCH_CREATED_NOTIFICATIONS_FINISHED';
export const FETCH_RECEIVED_NOTIFICATIONS_BEGIN = 'FETCH_RECEIVED_NOTIFICATIONS_BEGIN';
export const FETCH_RECEIVED_NOTIFICATIONS_FINISHED = 'FETCH_RECEIVED_NOTIFICATIONS_FINISHED';

const firestore = firebaseApp.firestore();
firestore.settings({timestampsInSnapshots: true});

export function createNotification(notification) {
    return dispatch => {
        dispatch({
            type: NOTIFICATION_CREATE_STARTED
        });
        firestore.collection('notifications')
            .add(notification)
            .then(() => {
                dispatch({
                    type: NOTIFICATION_CREATE_FINISHED
                });
                Actions.layoutScreen({refresh: true});
            })
    }
}

export function getCreatedNotifications(id) {
    const createdNotifications = [];
    return dispatch => {
        dispatch({
            type: FETCH_CREATED_NOTIFICATIONS_BEGIN
        });
        firestore.collection('notifications').where('createdBy', '==', id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                createdNotifications.push(doc.data());
            });
            dispatch({
                type: FETCH_CREATED_NOTIFICATIONS_FINISHED,
                payload: createdNotifications
            });
        })
    }
}

export function getReceivedNotifications(id) {
    const receivedNotifications = [];
    return dispatch => {
        dispatch({
            type: FETCH_RECEIVED_NOTIFICATIONS_BEGIN
        });
        firestore.collection('notifications').where('to', '==', id).where('delivered', '==', true).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                receivedNotifications.push(doc.data());
            });
            dispatch({
                type: FETCH_RECEIVED_NOTIFICATIONS_FINISHED,
                payload: receivedNotifications
            });
        })
    }
}




