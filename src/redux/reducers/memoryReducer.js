import {MEMORY_CREATED, FETCH_MEMORIES_FINISHED}  from '../actions/memoryActions';

export default function (state = {memory: null, memories: [], memoryCreated: false}, action) {
    switch(action.type) {
        case MEMORY_CREATED:
            return { ...state, memoryCreated: true};
        case FETCH_MEMORIES_FINISHED:
            return { ...state, memories: action.payload};
        default:
            return state;
    }
}