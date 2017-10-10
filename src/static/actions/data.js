import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import { VIDEO_FETCHED, VIDEO_DATA_RECEIVED, NOTIFICATION_REQUEST_SENT, NOTIFICATION_REQUEST_COMPLETE, BANNER_DATA_RECEIVED, DATA_FETCH_PROTECTED_DATA_REQUEST, DATA_RECEIVE_PROTECTED_DATA } from '../constants/ActionTypes';
import { authLoginUserFailure } from './auth';


export function dataReceiveProtectedData(data) {
    return {
        type: DATA_RECEIVE_PROTECTED_DATA,
        payload: {
            data
        }
    };
}

export function videoDataReceived(data) {
    return {
        type: VIDEO_DATA_RECEIVED,
        payload: {
            data
        }
    };
}

export function videoFetched(data) {
    return {
        type: VIDEO_FETCHED,
        payload: {
            data
        }
    };
}

export function bannersDataReceived(data) {
    return {
        type: BANNER_DATA_RECEIVED,
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

export function notificaton_sent(data) {
    return {
        type: NOTIFICATION_REQUEST_SENT,
        payload: {
            data
        }
    };
}

export function notification_complete () {
  return {
    type: NOTIFICATION_REQUEST_COMPLETE
  };
}

export function dataFetchProtectedData(token) {
    return (dispatch, state) => {
        dispatch(dataFetchProtectedDataRequest());
        return fetch(`${SERVER_URL}/api/v1/getdata/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveProtectedData(response.data));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                        dispatch(push('/login'));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function fetchVideos() {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchVideos/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'

          }
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(videoDataReceived(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function fetchVideo(id) {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/content/fetchVideo/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'

          },
          body: JSON.stringify({id: id})
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(videoFetched(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


export function fetchBanners() {
    return (dispatch, state) => {
      return fetch(`${SERVER_URL}/api/v1/banners/fetchBanners/`, {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'

          }
      })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(bannersDataReceived(response));
            })
            .catch((error) => {
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function saveUserNotificationRequest(email,artist) {
    return (dispatch, state) => {
        return fetch(`${SERVER_URL}/api/v1/notifications/saveUserNotificationRequest/`, {
            credentials: 'include',
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({email: email, artist: artist})
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(notificaton_sent(response));
            })
            .catch((error) => {

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

export function notificationRequestComplete() {
    return (dispatch, state) => {
              dispatch(notification_complete());
    };
}
