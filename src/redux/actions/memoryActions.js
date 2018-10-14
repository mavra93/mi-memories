import {firebaseApp} from '../../firebaseInit';
import '@firebase/firestore';
import {uploadImage} from '../../helpers/uploadImage';
import {Actions} from 'react-native-router-flux';
import {sendRemoteNotification} from '../../notification/notification';
const clone = require('clone');

export const MEMORY_CREATED = 'MEMORY_CREATED';
export const MEMORY_CREATE_STARTED = 'MEMORY_CREATE_STARTED';
export const FETCH_MEMORIES_BEGIN = 'FETCH_MEMORIES_BEGIN';
export const FETCH_MEMORIES_FINISHED = 'FETCH_MEMORIES_FINISHED';
export const FETCH_MEMORIES_ERROR = 'FETCH_MEMORIES_ERROR';
export const RESET_MEMORIES = 'RESET_MEMORIES';
export const FETCH_FAVORITES_BEGIN = 'FETCH_FAVORITES_BEGIN';
export const FETCH_FAVORITES_FINISHED = 'FETCH_FAVORITES_FINISHED';
export const FETCH_FAVORITES_ERROR = 'FETCH_FAVORITES_ERROR';
export const FETCH_USER_MEMORIES_BEGIN = 'FETCH_USER_MEMORIES_BEGIN';
export const FETCH_USER_MEMORIES_FINISHED = 'FETCH_USER_MEMORIES_FINISHED';
export const FETCH_USER_MEMORIES_ERROR = 'FETCH_USER_MEMORIES_ERROR';

const firestore = firebaseApp.firestore();
firestore.settings({timestampsInSnapshots: true});

export function resetMemories() {
    return dispatch => {
        dispatch({
            type: RESET_MEMORIES
        });
    }
}

export function getUserMemories(id) {
    const userMemories = [];
    return dispatch => {
        dispatch({
            type: FETCH_USER_MEMORIES_BEGIN
        });
        firestore.collection('memories').where('createdBy', '==', id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const memoryData = doc.data();
                memoryData.uid = doc.id;
                userMemories.push(memoryData);
            });
            dispatch({
                type: FETCH_USER_MEMORIES_FINISHED,
                payload: userMemories
            });
        }).catch(err => {
            dispatch({
                type: FETCH_USER_MEMORIES_ERROR,
                payload: err
            });
        })
    }
}

export function getFavoriteMemories(id) {
    const favorites = [];
    return dispatch => {
        dispatch({
            type: FETCH_FAVORITES_BEGIN
        });
        firestore.collection('memories').where('favoriteIds', 'array-contains', id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const favoriteData = doc.data();
                favoriteData.uid = doc.id;
                favorites.push(favoriteData);
            });
            dispatch({
                type: FETCH_FAVORITES_FINISHED,
                payload: favorites
            });
        }).catch(err => {
            dispatch({
                type: FETCH_FAVORITES_ERROR,
                payload: err
            });
        })
    }
}

export function addToFavorite(memory, user) {
    let clonedMemory = clone(memory);
    if (clonedMemory.favoriteIds) {
        const removeFromFavorite = clonedMemory.favoriteIds.includes(user.uid);
        if (removeFromFavorite) {
            clonedMemory.favoriteIds = clonedMemory.favoriteIds.filter(e => e !== user.uid);
        } else {
            clonedMemory.favoriteIds.push(user.uid);
        }
    } else {
        clonedMemory.favoriteIds = [user.uid];
    }

    clonedMemory.createdBy = clonedMemory.createdBy.id;

    return dispatch => {
        firestore.collection('memories').doc(clonedMemory.uid).update(clonedMemory).then({})
    }
}


export function createMemory(memory, user, users) {
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
        dispatch({
            type: MEMORY_CREATE_STARTED
        });
        memory.imagePaths.forEach(image => {
            uploadImage(image, 'memories').then(url => {
                index = index + 1;
                memoryData.images.push(url);
                if (index === memory.imagePaths.length) {
                    firestore.collection('memories')
                        .add(memoryData)
                        .then(() => {
                            dispatch({
                                type: MEMORY_CREATED
                            });
                            sendRemoteNotification(memoryData, user, users);
                            Actions.layoutScreen({refresh: true});
                        })
                }
            });
        });
    }
}

function prepareMemories(querySnapshot) {
    const memories = [];
    querySnapshot.forEach(doc => {
        const memory = doc.data();
        memory.uid = doc.id;
        memories.push(memory);
    });
    return memories;
}

export function fetchMemories(loadMore, lastVisible, order) {
    let memories;
    const query = firestore.collection('memories').orderBy('createdAt', order || 'desc');
    /*const start = 'kaj sad';
     const end = start + '\uf8ff';
     firestore.collection('memories')
     .orderBy('title')
     .limit(5)
     .startAt(start)
     .endAt(end)
     */
    return dispatch => {
        if (loadMore) {
            if (lastVisible) {
                query.startAfter(lastVisible).limit(5).get().then((querySnapshot) => {
                    memories = prepareMemories(querySnapshot);
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
            dispatch({
                type: FETCH_MEMORIES_BEGIN
            });
            query.limit(5).get().then((querySnapshot) => {
                memories = prepareMemories(querySnapshot);
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