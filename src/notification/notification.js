import firebaseClient from "./FirebaseClient";
import {getUser} from '../helpers/getUserFromUsers';

export function sendRemoteNotification(memory, user, users) {
    const currentUser = getUser(user.uid, users);
    for (let value of users) {
        if (value.id !== user.uid && value.token !== currentUser.token) {
            const body = {
                to: value.token,
                data: {
                    custom_notification: {
                        title: memory.title,
                        body: memory.description,
                        color: '#42b72a',
                        sound: 'default',
                        icon: 'ic_launcher',
                        priority: 'high',
                        show_in_foreground: true,
                        targetScreen: 'home'
                    }
                },
                priority: 10
            };
            firebaseClient.send(JSON.stringify(body));
        }
    }
}