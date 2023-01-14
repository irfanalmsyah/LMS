import React from 'react'
import { useState, useEffect } from "react";
import "../assets/styles/UserSettingSidebar.css"
import { Icon } from "react-icons-kit";
import {edit3} from 'react-icons-kit/feather/edit3'
import {switchIcon} from 'react-icons-kit/icomoon/switchIcon'
import {useCookies } from 'react-cookie';
import axios from "axios";

const UserDetail = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        axios.get("http://localhost:3000/users/me", {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies.token}`
            }
        })
        .then((response) => {
            setData(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            setError(error)
        })
    }, [cookies.token])


    const Logout = () => {
        removeCookie("token");
        window.location.reload();
    }

    return (
        <div>
            <div class="userdetail-content">
                <div class="userdetail-title">User Detail</div>
                <div class="userdetail-box"></div>
                <div class="userdetail-user">
                    <div class="userdetail-userprofile"></div>
                    {data && <div class="userdetail-username">{data.name}</div>}
                    <button class="userdetail-logout" onClick={Logout}>
                        <div class="userdetail-logoutbox"></div>
                        <div class="userdetail-logouttext">LOG OUT</div>
                        <div class="userdetail-logouticon">
                            <Icon icon={switchIcon} size={20} />
                        </div>
                    </button>
                </div>
                <div class="userdetail-name">Name</div>
                <div class="userdetail-realnamebox"></div>
                {data && <div class="userdetail-realname">{data.name}</div>}
                <div class="userdetail-nim">NIM</div>
                <div class="userdetail-realnimbox"></div>
                {data && <div class="userdetail-realnimbox">{data.regnum}</div>}
                <div class="userdetail-email">Email</div>
                <div class="userdetail-realemailbox"></div>
                {data && <div class="userdetail-realemail">{data.email}</div>}
                <div class="userdetail-phone">Phone</div>
                <div class="userdetail-realphonebox"></div>
                <div class="userdetail-realphoneicon">
                    <Icon icon={edit3} size={24} />
                </div>
                <div class="userdetail-realphone">+6281287654332</div>
                <div class="userdetail-dob">Date of Birth</div>
                <div class="userdetail-realdobbox"></div>
                <div class="userdetail-realdob">12 - 04 - 2002</div>
            </div>
        </div>
    )
}

export default UserDetail