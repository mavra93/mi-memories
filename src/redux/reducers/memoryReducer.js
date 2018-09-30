import {MEMORY_CREATED, FETCH_MEMORIES_FINISHED}  from '../actions/memoryActions';

export default function (state = {memory: null, memories: [], memoryCreated: false, lastVisible: null, initialLoadFinished: false}, action) {
    switch(action.type) {
        case MEMORY_CREATED:
            return { ...state, memoryCreated: true};
        case FETCH_MEMORIES_FINISHED:
            return { ...state, memories: [...state.memories, ...action.payload.memories], lastVisible: action.payload.lastVisible, initialLoadFinished: action.payload.initialLoadFinished};
        default:
            return state;
    }
}