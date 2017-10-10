import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_REGISTER_USER_REQUEST,
    AUTH_REGISTER_USER_FAILURE,
    AUTH_REGISTER_USER_SUCCESS,
    AUTH_REGISTER_USER,
    AUTH_LOGOUT_USER
} from '../constants/ActionTypes';


//--------------LOGIN CALLBACK FUNCTIONS ----------------------//

export function authLoginUserSuccess(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token,
            user
        }
    };
}

export function authLoginUserFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authLoginUserRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

//--------------LOGIN CALLBACK FUNCTIONS ----------------------//


//--------------REGISTER CALLBACK FUNCTIONS ----------------------//

export function authRegisterUserSuccess() {
    //sessionStorage.setItem('token', token);
    //sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_REGISTER_USER_SUCCESS

    };
}

export function authRegisterUserFailure(error, message) {
    //sessionStorage.removeItem('token');
    return {
        type: AUTH_REGISTER_USER_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    };
}

export function authRegisterUserRequest() {
    return {
        type: AUTH_REGISTER_USER_REQUEST
    };
}

//--------------REGISTER CALLBACK FUNCTIONS ----------------------//


//--------------LOGOUT RELATED FUNCTIONS ----------------------//

export function authLogout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    return {
        type: AUTH_LOGOUT_USER
    };
}

export function authLogoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(authLogout());
        dispatch(push('/login'));
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

//--------------LOGOUT RELATED FUNCTIONS ----------------------//

//--------------LOGIN ACTION FUNCTIONS ----------------------//

export function authLoginUser(email, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        const auth = btoa(`${email}:${password}`);
        return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(authLoginUserSuccess(response.token, response.user));
                dispatch(push(redirect));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
//--------------LOGIN ACTION FUNCTIONS ----------------------//


//--------------REGISTEr ACTION FUNCTIONS ----------------------//

export function authRegisterUser(email, password, first_name, last_name, redirect = '/') {
    return (dispatch) => {
        dispatch(authRegisterUserRequest());
        return fetch(`${SERVER_URL}/api/v1/accounts/register/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({email: email, password:password, first_name: first_name, last_name: last_name })
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
              console.log(response);
              dispatch(authRegisterUserSuccess());
              //dispatch(push(redirect)); push to login page
            })
            .catch((error) => {
              console.log(error);
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                     dispatch(authRegisterUserFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                  dispatch(authRegisterUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                  dispatch(authRegisterUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

//--------------REGISTEr ACTION FUNCTIONS ----------------------//
