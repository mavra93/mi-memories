import {
    FETCH_CREATED_NOTIFICATIONS_BEGIN,
    FETCH_CREATED_NOTIFICATIONS_FINISHED,
    FETCH_RECEIVED_NOTIFICATIONS_BEGIN,
    FETCH_RECEIVED_NOTIFICATIONS_FINISHED
}  from '../actions/notificationActions';

const clone = require('clone');

export default function (state = {createdNotifications: [], receivedNotifications: [], loading: false}, action) {
    switch (action.type) {
        case FETCH_CREATED_NOTIFICATIONS_BEGIN:
            return {...state, loading: true};
        case FETCH_CREATED_NOTIFICATIONS_FINISHED:
            return {...state, loading: false, createdNotifications: action.payload};
        case FETCH_RECEIVED_NOTIFICATIONS_BEGIN:
            return {...state, loading: true};
        case FETCH_RECEIVED_NOTIFICATIONS_FINISHED:
            return {...state, loading: false, receivedNotifications: action.payload};
        default:
            return state;
    }
}