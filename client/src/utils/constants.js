const HOST = import.meta.env.VITE_SERVER || 'http://localhost:3000';
const AUTH_ROUTES = '/api/auth';
const SIGN_UP_ROUTE = `${AUTH_ROUTES}/signup`;
const SIGN_IN_ROUTE = `${AUTH_ROUTES}/signin`;


export { HOST, AUTH_ROUTES, SIGN_UP_ROUTE, SIGN_IN_ROUTE };