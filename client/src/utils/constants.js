const HOST = import.meta.env.VITE_SERVER || 'http://localhost:3000';
const AUTH_ROUTES = '/api/auth';
const SIGN_UP_ROUTE = `${AUTH_ROUTES}/signup`;
const SIGN_IN_ROUTE = `${AUTH_ROUTES}/signin`;
const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`;
const ADD_PROFILE_IMAGE = `${AUTH_ROUTES}/add-profile-image`;
const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTES}/remove-profile-image`;
const LOGOUT = `${AUTH_ROUTES}/logout`;



const CONTACTS_ROUTES = '/api/contacts';
const SEARCH_CONTACTS = `${CONTACTS_ROUTES}/search`;



const MESSAGES_ROUTES = '/api/messages';
const GET_ALL_MESSAGES = `${MESSAGES_ROUTES}/get-messages`;

export {
    HOST,
    AUTH_ROUTES,
    SIGN_UP_ROUTE,
    SIGN_IN_ROUTE,
    GET_USER_INFO,
    UPDATE_PROFILE,
    ADD_PROFILE_IMAGE,
    REMOVE_PROFILE_IMAGE,
    LOGOUT,
    CONTACTS_ROUTES,
    SEARCH_CONTACTS,
    MESSAGES_ROUTES,
    GET_ALL_MESSAGES
};