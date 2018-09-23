import {MEMORY_CREATED}  from '../actions/memoryActions';
import {Actions} from 'react-native-router-flux';
export default function (state = {memory: null, memories: null, memoryCreated: false}, action) {
    switch(action.type) {
        case MEMORY_CREATED:
            Actions.layoutScreen();
            return { ...state, memoryCreated: true};
        default:
            return state;
    }
}