import {
    DATA_RECEIVE_PROTECTED_DATA,
    DATA_FETCH_PROTECTED_DATA_REQUEST,
    SURAHS_FETCHED,
    AYATS_FETCHED,
    SURAH_FETCHED,
    SURAH_INTRO_APPENDIX_FETCHED
} from '../constants/ActionTypes';

const initialState = {
    data: null,
    isFetching: false,
    surahs: null,
    ayats: null,
    surah:null,
    surahIntroAndAppendix:null
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
        case SURAHS_FETCHED:
            return Object.assign({}, state, {
                surahs: action.payload.data,
                isFetching: false
            });
        case AYATS_FETCHED:
            return Object.assign({}, state, {
                ayats: action.payload.data,
                isFetching: false
            });
        case SURAH_FETCHED:
            return Object.assign({}, state, {
                surah: action.payload.data,
                isFetching: false
            });
        case SURAH_INTRO_APPENDIX_FETCHED:
            return Object.assign({}, state, {
                surahIntroAndAppendix: action.payload.data,
            });
        default:
            return state;
    }
}
