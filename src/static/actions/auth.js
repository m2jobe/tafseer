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

import axios from 'axios';
import _ from 'lodash';


//--------------LOGIN CALLBACK FUNCTIONS ----------------------//


export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}


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

export function authRegisterUserSuccess(error, message) {
  //  sessionStorage.setItem('token', token);
  //  sessionStorage.setItem('user', JSON.stringify(user));
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
      return fetch(`${SERVER_URL}/rest-auth/logout/`, {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
          .then(checkHttpStatus)
          .then(parseJSON)
          .then((response) => {
            console.log(response);
           dispatch(authLogout());
            dispatch(push('/login'));
          })
          .catch((error) => {
            console.log(error);
              console.log(error.response)
          });
        return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
    };
}

//--------------LOGOUT RELATED FUNCTIONS ----------------------//

//--------------LOGIN ACTION FUNCTIONS ----------------------//

export function authLoginUser(username, password, redirect = '/') {
    return (dispatch) => {
        dispatch(authLoginUserRequest());
        return axios
          .post(`${SERVER_URL}/rest-auth/login/`, {
          username,
          password
        }).then((response) => {
              console.log(response);
                dispatch(authLoginUserSuccess(response.data.key, JSON.parse(response.config.data)));
                dispatch(push(redirect));
            })
            .catch(function (error) {
              // raise different exception if due to invalid credentials
              if (_.get(error, 'response.status') === 400) {
                    dispatch(authLoginUserFailure(400, error.response.data.non_field_errors[0]));
              } else if (error && typeof error.response !== 'undefined' && _.get(error, 'response.status') === 401) {
                  // Invalid authentication credentials
                  return error.response.then((data) => {
                      dispatch(authLoginUserFailure(401, data.non_field_errors[0]));
                  });
              } else if (error && typeof error.response !== 'undefined' && _.get(error, 'response.status') >= 500) {
                // Server side error
                dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
              } else {
                // Most likely connection issues
                dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
              }
              console.log(error.response);

              //throw error;
              return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way

            });

    };
}
//--------------LOGIN ACTION FUNCTIONS ----------------------//


//--------------REGISTEr ACTION FUNCTIONS ----------------------//

export function authRegisterUser(email, password1, password2, username, redirect = '/') {
    return (dispatch) => {
      console.log("INSIDE FUNCTION");
      dispatch(authRegisterUserRequest());
        return axios
          .post(`${SERVER_URL}/rest-auth/registration/`, {
          username,
          password1,
          password2,
          email
        }).then((response) => {
                console.log(response);
                var dataToPass = JSON.parse(response.config.data);
                dispatch(authRegisterUserSuccess(response.data.key, dataToPass));
                dispatch(authRegisterUserFailure("", "Hi " + dataToPass.username+ "! You've been sucessfully signed up, login to your new Tourmonkeys account!"));

                dispatch(push('/app/dashboard'));
            })
            .catch(function (error) {
              // raise different exception if due to invalid credentials
              console.log(error.response);
              if (_.get(error, 'response.status') === 201) {
                console.log(response);
                //dispatch(authRegisterUserSuccess(response.data.key, JSON.parse(response.config.data)));
                dispatch(authRegisterUserFailure(201, "Account created, you can login now!"));

                //dispatch(push('/app/dashboard/'));
              }


              if (_.get(error, 'response.status') === 400) {
                //throw new InvalidCredentialsException(error);
                var message = "";
                if(error.response.data.email) {
                  message += error.response.data.email[0] + "\n";
                }
                if(error.response.data.username) {
                  if(error.response.data.username[0] === "%(model_name)s with this %(field_label)s already exists.")
                  message += "A user already exists with that username." + "\n";
                }
                if(error.response.data.password) {
                  message += error.response.data.password[0] + "\n";
                }
                dispatch(authRegisterUserFailure('Oops!', message));

              }
              else if (error && typeof error.response !== 'undefined' && _.get(error, 'response.status') === 401) {
                  // Invalid authentication credentials
                  if(error.response.data.email) {
                    if(error.response.data.username) {
                      dispatch(authRegisterUserFailure(401, error.response.data.email[0] + "\n" +  error.response.data.username[0]));
                    } else {
                      dispatch(authRegisterUserFailure(401, error.response.data.email[0] + "\n"));
                    }
                  } else if(error.response.data.username) {
                    dispatch(authRegisterUserFailure(401,  error.response.data.username[0]));
                  }
              } else if (error && typeof error.response !== 'undefined' && _.get(error, 'response.status') >= 500) {
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
