import React from "react";
import "../assets/styles/UserSettingSidebar.css"
import { NavLink } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/feather/user";
import { book } from "react-icons-kit/feather/book";
import { creditCard } from "react-icons-kit/feather/creditCard";
import { globe } from "react-icons-kit/feather/globe";
import { Outlet } from "react-router-dom";


const UserSettingSidebar = () => {
    return (
        <div>
        <div class="usersetting-sidebar">
            <div class="usersetting-page"></div>
            <div class="usersetting-title">User Setting</div>
            <div class="usersetting-menus">
            <NavLink to={"/userdetail"}>
                <div class="usersetting-detailicon">
                <Icon icon={user} size={24} />
                </div>
                <div class="usersetting-detail">User Detail</div>
            </NavLink>
            <NavLink to={"/coursedetail"}>
                <div class="usersetting-courseicon">
                <Icon icon={book} size={24} />
                </div>
                <div class="usersetting-course">Course Detail</div>
            </NavLink>
            <NavLink to={"/ktm"}>
                <div class="usersetting-ktmicon">
                <Icon icon={creditCard} size={24} />
                </div>
                <div class="usersetting-ktm">KTM</div>
            </NavLink>
            <NavLink to={"/language"}>
                <div class="usersetting-languageicon">
                <Icon icon={globe} size={24} />
                </div>
                <div class="usersetting-language">Language</div>
            </NavLink>
            </div>
        </div>
        <Outlet />
        </div>
    );
};

export default UserSettingSidebar;
