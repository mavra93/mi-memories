import {MEMORY_CREATED, FETCH_MEMORIES_FINISHED, RESET_MEMORIES, FETCH_FAVORITES_FINISHED}  from '../actions/memoryActions';

export default function (state = {memory: null, memories: [], memoryCreated: false, lastVisible: null, initialLoadFinished: false, favoriteMemories: []}, action) {
    switch(action.type) {
        case MEMORY_CREATED:
            return { ...state, memoryCreated: true};
        case FETCH_MEMORIES_FINISHED:
            return { ...state, memories: state.memories.concat(action.payload.memories), lastVisible: action.payload.lastVisible, initialLoadFinished: action.payload.initialLoadFinished};
        case RESET_MEMORIES: {
            return {...state, memories: [], initialLoadFinished: false, lastVisible: null }
        }
        case FETCH_FAVORITES_FINISHED: {
            return {...state, favoriteMemories: action.payload}
        }
        default:
            return state;
    }
}