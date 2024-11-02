const HOST = import.meta.env.VITE_SERVER || 'http://localhost:3000';
const AUTH_ROUTES = '/api/auth';
const SIGN_UP_ROUTE = `${AUTH_ROUTES}/signup`;
const SIGN_IN_ROUTE = `${AUTH_ROUTES}/signin`;
const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;


export { HOST, AUTH_ROUTES, SIGN_UP_ROUTE, SIGN_IN_ROUTE, GET_USER_INFO };