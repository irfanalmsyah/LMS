import React from 'react'
import {useCookies } from 'react-cookie';
import Cookies from "universal-cookie";

const Cookieset = () => {

    const [cookies, setCookie] = useCookies(['jwt_authorization']);

    console.log(cookies.jwt_authorization)
  return (
    <div>
        test
    </div>
  )
}

export default Cookieset