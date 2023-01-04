import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import {useCookies } from 'react-cookie';
import Cookies from "universal-cookie";

const Loginfetch = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(email, password);

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
        setResponseData(response.data);
        console.log("sekarang di response");
        const cookies = new Cookies();
        cookies.set('jwt_authorization', response.data.token, { path: '/' });
        return <Navigate to = "/usersetting" />;
      })
      .catch(error => {
        console.error(error);
      });
  }

  return {email, password, responseData, handleSubmit, setEmail, setPassword, setResponseData};

}

export default Loginfetch;
