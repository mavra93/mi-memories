import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore';
import {uploadImage} from '../../helpers/uploadImage';
import {Actions} from 'react-native-router-flux';

export const MEMORY_CREATED = 'MEMORY_CREATED';
export const FETCH_MEMORIES_BEGIN = 'FETCH_MEMORIES_BEGIN';
export const FETCH_MEMORIES_FINISHED = 'FETCH_MEMORIES_FINISHED';
export const FETCH_MEMORIES_ERROR = 'FETCH_MEMORIES_ERROR';
export const RESET_MEMORIES = 'RESET_MEMORIES';

const firestore = firebaseApp.firestore();
firestore.settings({timestampsInSnapshots: true});

export function resetMemories() {
    return dispatch => {
        dispatch({
            type: RESET_MEMORIES
        });
    }
}

export function createMemory(memory) {
    let index = 0;
    let memoryData = {
        title: memory.title,
        description: memory.description,
        category: memory.category,
        images: [],
        createdAt: memory.createdAt,
        createdBy: memory.createdBy
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
                            });
                            Actions.layoutScreen({loadHomeScreen: true});
                        })
                }
            });
        });
    }
}

export function fetchMemories(loadMore, lastVisible) {
    const memories = [];

    return dispatch => {
        dispatch({
            type: FETCH_MEMORIES_BEGIN
        });
        if (loadMore) {
            if (lastVisible) {
                firestore.collection('memories').orderBy("createdAt", "desc").startAfter(lastVisible).limit(5).get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        const memory = doc.data();
                        memories.push(memory);
                    });
                    dispatch({
                        type: FETCH_MEMORIES_FINISHED,
                        payload: {
                            memories,
                            lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
                            initialLoadFinished: true
                        }
                    });
                }).catch((error) => {
                    dispatch({
                        type: FETCH_MEMORIES_ERROR,
                        payload: {error}
                    });
                });
            }
        } else {
            firestore.collection('memories').orderBy("createdAt", "desc").limit(5).get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    const memory = doc.data();
                    memories.push(memory);
                });
                dispatch({
                    type: FETCH_MEMORIES_FINISHED,
                    payload: {
                        memories,
                        lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
                        initialLoadFinished: true
                    }
                });
            }).catch((error) => {
                dispatch({
                    type: FETCH_MEMORIES_ERROR,
                    payload: {error}
                });
            });
        }

    }
}