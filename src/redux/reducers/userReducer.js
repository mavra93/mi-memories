import {GET_USER, AUTH_SUCCESS, AUTH_ERR, USER_FETCHED, SIGNED_OUT}  from '../actions/userActions';
export default function (state = {user: null, err: null, isLoggedIn: false, userFetched: false, registerFinished: false}, action) {
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
        default:
            return state;
    }
}