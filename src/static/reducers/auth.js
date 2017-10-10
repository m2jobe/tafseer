import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_REGISTER_USER_REQUEST,
    AUTH_REGISTER_USER_SUCCESS,
    AUTH_REGISTER_USER_FAILURE,
    AUTH_LOGOUT_USER
} from '../constants/ActionTypes';


const initialState = {
    token: null,
    userEmail: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null
            });

        case AUTH_LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload.token,
                userEmail: action.payload.user.email,
                statusText: 'You have been successfully logged in.'
            });

        case AUTH_LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                userEmail: null,
                statusText: `Authentication Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        case AUTH_LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                userEmail: null,
                statusText: 'You have been successfully logged out.'
            });

        case AUTH_REGISTER_USER_REQUEST:
            return Object.assign({}, state, {
                statusText: null
            });


        case AUTH_REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                statusText: 'You have been successfully registered.'
            });

        case AUTH_REGISTER_USER_FAILURE:
            return Object.assign({}, state, {
                statusText: `Registration Error: ${action.payload.status} - ${action.payload.statusText}`
            });
        default:
            return state;
    }
}
