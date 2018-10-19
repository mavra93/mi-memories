import {
    MEMORY_CREATED,
    MEMORY_CREATE_STARTED,
    FETCH_MEMORIES_BEGIN,
    FETCH_MEMORIES_FINISHED,
    RESET_MEMORIES,
    FETCH_FAVORITES_BEGIN,
    FETCH_FAVORITES_FINISHED,
    FETCH_USER_MEMORIES_BEGIN,
    FETCH_USER_MEMORIES_FINISHED,
    REMOVE_FAVORITE_MEMORY,
}  from '../actions/memoryActions';

const clone = require('clone');

export default function (state = {memory: null, memories: [], memoryCreationStarted: false, lastVisible: null, initialLoadFinished: false, favoriteMemories: [], loading: true, reRender: false, userMemories: []}, action) {
    switch (action.type) {
        case MEMORY_CREATED:
            return {...state, memoryCreationStarted: false};
        case MEMORY_CREATE_STARTED:
            return {...state, memoryCreationStarted: true};
        case FETCH_MEMORIES_BEGIN: {
            return {...state, loading: true}
        }
        case FETCH_MEMORIES_FINISHED:
            return {...state, memories: state.memories.concat(action.payload.memories), lastVisible: action.payload.lastVisible, initialLoadFinished: action.payload.initialLoadFinished, loading: false};
        case RESET_MEMORIES: {
            return {...state, memories: [], initialLoadFinished: false, lastVisible: null}
        }
        case FETCH_FAVORITES_BEGIN: {
            return {...state, loading: true}
        }
        case FETCH_FAVORITES_FINISHED: {
            return {...state, favoriteMemories: action.payload, loading: false}
        }
        case FETCH_USER_MEMORIES_BEGIN: {
            return {...state, loading: true}
        }
        case FETCH_USER_MEMORIES_FINISHED: {
            return {...state, userMemories: action.payload, loading: false}
        }
        case REMOVE_FAVORITE_MEMORY: {
            let cloneFavoriteMemories = clone(state.favoriteMemories);
            cloneFavoriteMemories = cloneFavoriteMemories.filter(e => e.uid !== action.payload.uid);
            return {...state, favoriteMemories: cloneFavoriteMemories}
        }
        default:
            return state;
    }
}