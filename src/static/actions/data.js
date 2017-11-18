import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { SURAH_INTRO_APPENDIX_FETCHED, SURAH_FETCHED,AYATS_FETCHED,SURAHS_FETCHED,DATA_FETCH_PROTECTED_DATA_REQUEST, DATA_RECEIVE_PROTECTED_DATA } from '../constants/ActionTypes';


export function dataReceiveProtectedData(data) {
    return {
        type: DATA_RECEIVE_PROTECTED_DATA,
        payload: {
            data
        }
    };
}



export function dataFetchProtectedDataRequest() {
    return {
        type: DATA_FETCH_PROTECTED_DATA_REQUEST
    };
}



//artist comments

export function surahsFetched(data) {
    return {
        type: SURAHS_FETCHED,
        payload: {
            data
        }
    };
}

export function fetchSurahs() {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchSurahs/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'

          },

      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(surahsFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

//end of artist comments


export function ayatsFetched(data) {
    return {
        type: AYATS_FETCHED,
        payload: {
            data
        }
    };
}

export function fetchAyats(surah) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchAyats/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'

          },
          body: JSON.stringify({surah: surah})

      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(ayatsFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}



export function surahFetched(data) {
    return {
        type: SURAH_FETCHED,
        payload: {
            data
        }
    };
}

export function fetchSurah(surah) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchSurah/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'

          },
          body: JSON.stringify({surah: surah})

      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(surahFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


export function surahIntroAndAppendixFetched(data) {
    return {
        type: SURAH_INTRO_APPENDIX_FETCHED,
        payload: {
            data
        }
    };
}

export function fetchSurahIntroAndAppendix(surah) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchSurahIntroAndAppendix/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'

          },
          body: JSON.stringify({surah: surah})

      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(surahIntroAndAppendixFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
