import firebaseClient from "./FirebaseClient";

export function sendRemoteNotification(memory, user, users) {
    for (let value of users) {
        if (value.id !== user.uid) {
            const body = {
                to: value.token,
                data: {
                    custom_notification: {
                        title: memory.title,
                        body: memory.description,
                        color: "#42b72a",
                        sound: "default",
                        priority: "high",
                        show_in_foreground: true,
                        targetScreen: "home"
                    }
                },
                priority: 10
            };
            firebaseClient.send(JSON.stringify(body), "notification");
        }
    }
}