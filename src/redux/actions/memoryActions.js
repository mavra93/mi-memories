import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';

export const MEMORY_CREATED = 'MEMORY_CREATED';
const firestore = firebaseApp.firestore();
const firebaseStorage = firebaseApp.storage();
firestore.settings({timestampsInSnapshots: true});

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
const tempWindowXMLHttpRequest = window.XMLHttpRequest;
window.Blob = Blob;

export function createMemory(memory) {
    let index;
    let memoryData = {
        title: memory.title,
        description: memory.description,
        category: memory.category,
        images: []
    };
    return dispatch => {
        memory.imagePaths.forEach((image, i) => {
            uploadImage(image).then(url => {
                index = i;
                memoryData.images.push(url);
                if (index + 1 === memory.imagePaths.length) {
                    firestore.collection('memories')
                        .add(memoryData)
                        .then(() => {
                            dispatch({
                                type: MEMORY_CREATED
                            })
                        })
                }
            });
        });
    }
}

function uploadImage(image) {
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

    return new Promise((resolve, reject) => {
        const mime = 'application/octet-stream';
        const uploadUri = image.path;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = firebaseStorage.ref('memories').child(`${sessionId}`);

        fs.readFile(uploadUri, 'base64')
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