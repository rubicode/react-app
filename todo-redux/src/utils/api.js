import axios from 'axios'
import { Fragment } from 'react';
import { Navigate } from "react-router-dom";

export const request = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    //headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
});

request.interceptors.request.use(function (config) {
    const token = localStorage.getItem('user');
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
    } else {
        config.headers.Authorization = '';
    }
    return config;
});

export const LoggedIn = () => {
    const user = localStorage.getItem('user')
    return (
        <Fragment>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
        </Fragment>
    )
}