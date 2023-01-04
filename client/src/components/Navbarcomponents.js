import React from "react";
import { useState } from "react";
import "./Navbarcss.css";
import { Icon } from 'react-icons-kit'
import {search} from 'react-icons-kit/feather/search'
import {useCookies } from 'react-cookie';
import axios from "axios";

function Navbarcomponents() {

  const [cookies, setCookie] = useCookies(['jwt_authorization']);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  let testing

  axios.get("http://localhost:3000/users/me", {
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
    });

  return (
    <div>
      <div class="navbar"></div>
      <div class="gambarlogo"></div>
      <div class="searchbar">
        <input type="text" placeholder="Search" class="searchbarbox"></input>
      </div>
      <span class="searchicon">
        <Icon icon={search} size={24} />
      </span>

      <div class="profilephoto"></div>
      <div class="profile">
        <div class="profilename">{testing}</div>
        <div class="profilenim">G6012119800</div>
      </div>
    </div>
  );
}

export default Navbarcomponents;
