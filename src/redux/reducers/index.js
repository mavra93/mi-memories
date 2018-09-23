import {combineReducers} from 'redux'
import userReducer from './userReducer';
import memoryReducer from './memoryReducer';

const rootReducer = combineReducers({
    user: userReducer,
    memory: memoryReducer
});

export default rootReducer

