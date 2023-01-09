import React from "react";
import { useState } from "react";
import axios from "axios";
import { redirect, Navigate } from "react-router-dom";
import "./Logincss.css";
import Loginfetch from "./Loginfetch";

import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import {Link} from "react-router-dom";
import { render } from "@testing-library/react";

const Logincomponents = () => {

  //yang dibawah ini untuk masalah token dan auth login
  const {email, password, data, handleSubmit, setEmail, setPassword, setData, error, setError} = Loginfetch();


  //yang dibawah ini const untuk setting hide/unhide password
  const [pass, setPass] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleTogglepass = () => {
    if (pass === "password") {
      setPass("text");
      setIcon(eye);
    } else {
      setPass("password");
      setIcon(eyeOff);

    }
  };

    return (
      <div>
        {data && <Navigate to="/usersetting" />}
        {/* <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email Address" class="emailaddbox" value={email} onChange={event => setEmail(event.target.value)}></input>
        <input type={pass} placeholder="Password" class="passaddbox" value={password} onChange={event => setPassword(event.target.value)}></input>
        <button type="submit" placeholder="test" class="test" value="Sign In & Start Studying"></button>
        </form> */}
        <div class="Loginpage">
          <div class="imgsamping"></div>
          <div class="logoipb"></div>

          <span class="Loginlms">Login LMS</span>
          <span class="Logindesc">Login untuk memulai aktivitas pembelajaran</span>

          {/* <div>
            {
              data ? (
                <span class="Logindesc">Anda telah login, {data.user.name}</span>
              ) :
              (
                <span class="Logindesc">Login untuk memulai aktivitas pembelajaran</span>
              )
            }
          </div> */}


          <form onSubmit={handleSubmit}>
          <div class="emailadd">
          <input type="text" placeholder="Email Address" class="emailaddbox" value={email} onChange={event => setEmail(event.target.value)}></input>
          </div>
          {/* <input type="submit" class="emailaddbox"></input> */}

          <div class="passadd">
          <input type={pass} placeholder="Password" class="passaddbox" value={password} onChange={event => setPassword(event.target.value)}>
          </input>

          <span class="passeye" onClick={handleTogglepass}>
          <Icon icon={icon} size={20} />
          </span>
          </div>

          <Link to="/" class="passforgot">Forgot Password?</Link>
          
          <input type="submit" placeholder="test" class="test" value="Sign In & Start Studying"></input>

          </form>
         {/* {error && <div class="Errordesc">{error}</div>} */}


          

          {/* if (responseData) {
            <div>
            <span class="Logindesc">Login untuk memulai aktivitas pembelajaran {responseData.user.name}</span>
            </div>
          } else {
            <span class="Logindesc">Login untuk memulai aktivitas pembelajaran tidak ada user</span>
          } */}
      </div>
      </div>
    );

};

export default Logincomponents;
