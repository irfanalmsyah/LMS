import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import {useCookies } from 'react-cookie';


const Loginfetch = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!cookies.token) return;
        axios.get('http://localhost:3000/users/me', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.token}`
        }
        })
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            removeCookie('token', { path: '/' });
        })
    }, [cookies.token, removeCookie]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth', {
            username: email,
            password: password
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer setYourSuperSecretMasterTokenHere'
            }
        })
        .then(response => {
            setCookie('token', response.data.token, { path: '/'})
            setData(response.data);
        })
        .catch(error => {
            setError(error);
        });
    }

    return {email, password, data, handleSubmit, setEmail, setPassword, setData, error, setError, cookies, setCookie};

}

export default Loginfetch;
