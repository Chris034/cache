import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_ENV === 'production'
? process.env.REACT_APP_API_PROD_ENDPOINT
: process.env.REACT_APP_API_DEV_ENDPOINT

export const socket = io(URL);