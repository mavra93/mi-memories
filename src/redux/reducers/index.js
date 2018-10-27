import {combineReducers} from 'redux'
import userReducer from './userReducer';
import memoryReducer from './memoryReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    user: userReducer,
    memory: memoryReducer,
    notification: notificationReducer
});

export default rootReducer

