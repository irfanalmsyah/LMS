import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/Navbar.css"
import { Icon } from 'react-icons-kit'
import {search} from 'react-icons-kit/feather/search'
import {useCookies } from 'react-cookie';
import axios from "axios";

function Navbar() {
    const [cookies, setCookie] = useCookies();
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
        })
        .catch((error) => {
        setError(error)
        })
    }, [cookies.token])

    return (
        <div>
        <div class="navbar"></div>

            <NavLink to={"/dashboard"}>
            <div class="gambarlogo">
            </div>
            </NavLink>
        
        <div class="searchbar">
            <input type="text" placeholder="Search" class="searchbarbox"></input>
        </div>
        <span class="searchicon">
            <Icon icon={search} size={24} />
        </span>

        <NavLink to={"/userdetail"}>
        <div class="profilephoto">
        {data && <img src={data.avatar} alt='profile-picture' className='profilephoto-picture'></img> }
        </div>
        <div class="profile">
            {data && <div class="profilename">{data.name}</div>}
            {!(data) && <div class="profilename">Loading...</div>}
            {data && <div class="profilenim">{data.regnum}</div>}
        </div>
        </NavLink>
        
        </div>
    );
}

export default Navbar;
