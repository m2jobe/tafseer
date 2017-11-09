import {
    DATA_RECEIVE_PROTECTED_DATA,
    DATA_FETCH_PROTECTED_DATA_REQUEST,
    VIDEO_DATA_RECEIVED,
    BANNER_DATA_RECEIVED,
    NOTIFICATION_REQUEST_SENT,
    NOTIFICATION_REQUEST_COMPLETE,
    VIDEO_FETCHED,
    EVENTS_SUBSCRIBED_TO,
    COMMENTS_FETCHED,
    ARTIST_FETCHED,
    SURAHS_FETCHED
} from '../constants/ActionTypes';

const initialState = {
    data: null,
    isFetching: false,
    videos: null,
    banners: null,
    triggerNotification: 'no',
    video: null,
    eventsSubscribed: null,
    comments: null,
    surahs: null

};

export default function dataReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_RECEIVE_PROTECTED_DATA:
            return Object.assign({}, state, {
                data: action.payload.data,
                isFetching: false
            });

        case DATA_FETCH_PROTECTED_DATA_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case VIDEO_DATA_RECEIVED:
            return Object.assign({}, state, {
                videos: action.payload.data,
                isFetching: false
            });
        case BANNER_DATA_RECEIVED:
            return Object.assign({}, state, {
                banners: action.payload.data,
            });
        case NOTIFICATION_REQUEST_SENT:
            return Object.assign({}, state, {
                triggerNotification: action.payload.data,
            });
        case NOTIFICATION_REQUEST_COMPLETE:
            return Object.assign({}, state, {
                triggerNotification: 'no',
            });
        case VIDEO_FETCHED:
            return Object.assign({}, state, {
                video: action.payload.data,
                isFetching: false
            });
        case EVENTS_SUBSCRIBED_TO:
            return Object.assign({}, state, {
                eventsSubscribed: action.payload.data,
                isFetching: false
            });
        case COMMENTS_FETCHED:
            return Object.assign({}, state, {
                comments: action.payload.data,
                isFetching: false
            });
        case SURAHS_FETCHED:
            return Object.assign({}, state, {
                surahs: action.payload.data,
                isFetching: false
            });
        default:
            return state;
    }
}
