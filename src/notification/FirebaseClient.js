const axios = require('axios');
import {SERVER_KEY} from '../config/FirebaseConfig';

const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

    send(body) {
        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'key=' + SERVER_KEY
            }
        };

        axios.post(API_URL, body, axiosConfig)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("ERROR: ", err);
            })
    }
}

const firebaseClient = new FirebaseClient();
export default firebaseClient;