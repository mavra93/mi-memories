import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore';
import {Actions} from 'react-native-router-flux';

export const NOTIFICATION_CREATE_FINISHED = 'NOTIFICATION_CREATE_FINISHED';
export const NOTIFICATION_CREATE_STARTED = 'NOTIFICATION_CREATE_STARTED';

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



