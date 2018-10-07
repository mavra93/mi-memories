import {GET_USER, AUTH_SUCCESS, AUTH_ERR, USER_FETCHED, SIGNED_OUT, FETCH_USERS_FINISHED, FETCH_USERS_ERROR, UPDATE_USER_TOKEN}  from '../actions/userActions';
export default function (state = {users: [], user: null, err: null, isLoggedIn: false, userFetched: false, registerFinished: false}, action) {
    switch(action.type) {
        case USER_FETCHED:
            return { ...state, userFetched: true, registerFinished: false};
        case GET_USER:
            return { ...state, user: action.payload, isLoggedIn: true, userFetched: true, registerFinished: false};
        case AUTH_SUCCESS:
            return { ...state, user: action.payload, isLoggedIn: true, registerFinished: false};
        case AUTH_ERR:
            return { ...state, err: action.payload, isLoggedIn: false};
        case SIGNED_OUT:
            return { ...state, user: null, userFetched: false, isLoggedIn: false};
        case FETCH_USERS_FINISHED:
            return { ...state, users: action.payload};
        case FETCH_USERS_ERROR:
            return { ...state, err: action.payload};
        case UPDATE_USER_TOKEN:
            let updatedUser = {
                ...state.user,
                ...action.payload
            };
            return { ...state, user: updatedUser};
        default:
            return state;
    }
}