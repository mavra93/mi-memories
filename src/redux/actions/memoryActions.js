import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore';
import {uploadImage} from '../../helpers/uploadImage';

export const MEMORY_CREATED = 'MEMORY_CREATED';
const firestore = firebaseApp.firestore();
firestore.settings({timestampsInSnapshots: true});


export function createMemory(memory) {
    let index = 0;
    let memoryData = {
        title: memory.title,
        description: memory.description,
        category: memory.category,
        images: []
    };
    return dispatch => {
        memory.imagePaths.forEach(image => {
            uploadImage(image).then(url => {
                index = index + 1;
                memoryData.images.push(url);
                if (index === memory.imagePaths.length) {
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