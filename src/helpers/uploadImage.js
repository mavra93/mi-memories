import RNFetchBlob from 'rn-fetch-blob';
import {firebaseApp} from '../firebaseInit';

const uuid = require('uuid/v1');
const firebaseStorage = firebaseApp.storage();

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
const tempWindowXMLHttpRequest = window.XMLHttpRequest;
window.Blob = Blob;

export function uploadImage(image) {
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

    return new Promise((resolve, reject) => {
        const mime = 'application/octet-stream';
        const sessionId = uuid();
        let uploadBlob = null;
        const imageRef = firebaseStorage.ref('memories').child(`${sessionId}`);

        fs.readFile(image, 'base64')
            .then((data) => {
                return Blob.build(data, {type: `${mime};BASE64`});
            })
            .then((blob) => {
                uploadBlob = blob;
                return imageRef.put(blob, {contentType: mime});
            })
            .then(() => {
                uploadBlob.close();
                return imageRef.getDownloadURL();
            })
            .then((url) => {
                resolve(url);
                window.XMLHttpRequest = tempWindowXMLHttpRequest;
            })
            .catch((error) => {
                reject(error);
            })
    })
}