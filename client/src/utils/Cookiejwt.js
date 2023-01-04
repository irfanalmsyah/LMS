import Loginfetch from "../components/Loginfetch";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useState } from "react";

import React from 'react'

const Cookiejwt = () => {

    const {responseData, setResponseData} = Loginfetch();

    //initiate cookies
    const cookies = new Cookies();

    //initiate user state
/*     const [user, setUser] = useState(null); */

    //logout
    const logout = () => {
        setResponseData(null);
        cookies.remove('jwt_authorization');
    };

    //login
    const login = (jwt_token) => {
    //set cookie
    cookies.set('jwt_authorization', jwt_token);


};

  return (
    <div>
        {responseData ? (
            <div>
                <span>Hi {responseData.user.name}</span>
                <button onClick={logout}>Logout</button>
            </div>
         ) : (
            <div>
                <span>Hi Guest</span>
                <button onClick={() => login("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3MjgwMzM1MSwiZXhwIjoxNjcyODg5NzUxfQ.Pb0YdqWUemC-gb0UxJv3DhjHmC46eVLUB2ODfRUuabE")}>Login</button>
            </div>
         )
        } 
    </div>
        
  )
}

export default Cookiejwt