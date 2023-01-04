import React from 'react'
import "./Usersettingcss.css";
import { Icon } from "react-icons-kit";
import {edit3} from 'react-icons-kit/feather/edit3'
import {Link} from "react-router-dom";
import {switchIcon} from 'react-icons-kit/icomoon/switchIcon'
import Navbarcomponents from "./Navbarcomponents";
import Usersettingcomponents from './Usersettingcomponents';

const Userdetailcomponents = () => {
  return (
    <div>
        <div class="userdetail-content">
        <div class="userdetail-title">User Detail</div>
        <div class="userdetail-box"></div>
        <div class="userdetail-user">
            <div class="userdetail-userprofile"></div>
            <div class="userdetail-username">Denada Soetanto</div>
            <button class="userdetail-logout">
                <div class="userdetail-logoutbox"></div>
                <div class="userdetail-logouttext">LOG OUT</div>
                <div class="userdetail-logouticon">
                    <Icon icon={switchIcon} size={20} />
                </div>
            </button>
        </div>
        <div class="userdetail-name">Name</div>
        <div class="userdetail-realnamebox"></div>
        <div class="userdetail-realname">Denada Soetanto</div>
        <div class="userdetail-nim">NIM</div>
        <div class="userdetail-realnimbox"></div>
        <div class="userdetail-realnim">G60121198</div>
        <div class="userdetail-email">Email</div>
        <div class="userdetail-realemailbox"></div>
        <div class="userdetail-realemailicon">
            <Icon icon={edit3} size={24} />
        </div>
        <div class="userdetail-realemail">denadasoetanto@apps.aipibi.ac.id</div>
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

    <Usersettingcomponents />
    <Navbarcomponents />
    </div>

  )
}

export default Userdetailcomponents