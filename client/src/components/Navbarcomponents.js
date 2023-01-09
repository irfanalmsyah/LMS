import React from "react";
import { useState, useEffect } from "react";
import { redirect, Navigate, NavLink } from "react-router-dom";
import "./Navbarcss.css";
import { Icon } from 'react-icons-kit'
import {search} from 'react-icons-kit/feather/search'
import {useCookies } from 'react-cookie';
import axios from "axios";

function Navbarcomponents() {
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
      console.log(response.data)
    })
    .catch((error) => {
      setError(error)
    })
  }, [cookies.token])
  
  /* axios.get("http://localhost:3000/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.jwt_authorization,
      },
    })
    .then((response) => {
      
      testing = response.data.name;
      console.log("sekarang di response");
    })
    .catch((error) => {

      console.error(error);
      console.log("posisi di error");
    }); */

  return (
    <div>
      {error && <Navigate to="/" />}
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
      <div class="profilephoto">
      {data && <img src={data.avatar} alt='profile-picture' className='profilephoto-picture'></img> }
      </div>
      <div class="profile">
        {data && <div class="profilename">{data.name}</div>}
        {!(data) && <div class="profilename">Loading...</div>}
        {/* <div class="profilename">{testing}</div>
        <div class="profilenim">G6012119800</div>  */}
        {data && <div class="profilenim">{data.regnum}</div>}
      </div>
      
    </div>
  );
}

export default Navbarcomponents;
