import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore';
import {uploadImage} from '../../helpers/uploadImage';

export const MEMORY_CREATED = 'MEMORY_CREATED';
export const FETCH_MEMORIES_BEGIN = 'FETCH_MEMORIES_BEGIN';
export const FETCH_MEMORIES_FINISHED = 'FETCH_MEMORIES_FINISHED';
export const FETCH_MEMORIES_ERROR = 'FETCH_MEMORIES_ERROR';

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

export function fetchMemories() {
    const memories = [];

    return dispatch => {
        dispatch({
            type: FETCH_MEMORIES_BEGIN
        });

        firestore.collection('memories')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const memory = doc.data();
                    memories.push(memory);
                });
                dispatch({
                    type: FETCH_MEMORIES_FINISHED,
                    payload: memories
                });
            }).catch((error) => {
            dispatch({
                type: FETCH_MEMORIES_ERROR,
                payload: {error}
            });
        });
    }
}