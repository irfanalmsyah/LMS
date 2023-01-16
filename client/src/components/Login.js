import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../assets/styles/Login.css"
import Loginfetch from "./Loginfetch";

import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import {Link} from "react-router-dom";

const Login = () => {

    //yang dibawah ini untuk masalah token dan auth login
    const {email, password, data, handleSubmit, setEmail, setPassword} = Loginfetch();

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
            {data && <Navigate to="/userdetail" />}
            <div class="Loginpage">
                <div class="imgsamping"></div>
                <div class="logoipb"></div>
                <span class="Loginlms">Login LMS</span>
                <span class="Logindesc">Login untuk memulai aktivitas pembelajaran</span>
                <form onSubmit={handleSubmit}>
                    <div class="emailadd">
                        <input type="text" placeholder="Email Address" class="emailaddbox" value={email} onChange={event => setEmail(event.target.value)}></input>
                    </div>
                    <div class="passadd">
                        <input type={pass} placeholder="Password" class="passaddbox" value={password} onChange={event => setPassword(event.target.value)}></input>
                        <span class="passeye" onClick={handleTogglepass}>
                            <Icon icon={icon} size={20} />
                        </span>
                    </div>
                    <Link to="/" class="passforgot">Forgot Password?</Link>
                    <input type="submit" placeholder="test" class="test" value="Sign In & Start Studying"></input>
                </form>
            </div>
        </div>
    );
};

export default Login;
