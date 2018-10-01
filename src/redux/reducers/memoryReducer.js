import {MEMORY_CREATED, FETCH_MEMORIES_FINISHED, RESET_MEMORIES}  from '../actions/memoryActions';

export default function (state = {memory: null, memories: [], memoryCreated: false, lastVisible: null, initialLoadFinished: false}, action) {
    switch(action.type) {
        case MEMORY_CREATED:
            return { ...state, memoryCreated: true};
        case FETCH_MEMORIES_FINISHED:
            return { ...state, memories: state.memories.concat(action.payload.memories), lastVisible: action.payload.lastVisible, initialLoadFinished: action.payload.initialLoadFinished};
        case RESET_MEMORIES: {
            return {...state, memories: [], initialLoadFinished: false, lastVisible: null }
        }
        default:
            return state;
    }
}