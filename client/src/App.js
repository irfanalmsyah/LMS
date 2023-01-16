import React from "react";
import "./assets/styles/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import UserDetail from "./components/UserDetail";
import MyCourse from "./components/MyCourse";
import IdCard from "./components/IdCard";
import Language from "./components/Language";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard";
import UserSettingSidebar from "./components/UserSettingSidebar";
import Courses from "./components/Courses";
import Course from "./components/Course";

function App() {
    return (
        <Router>
        <div className="App">
            <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route exact path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<Course />} />
                <Route element={<UserSettingSidebar />}>
                    <Route path="/userdetail" element={<UserDetail />} />
                    <Route path="/coursedetail" element={<MyCourse />} />
                    <Route path="/ktm" element={<IdCard />} />
                    <Route path="/language" element={<Language />} /> 
                </Route>
            </Route>
            </Routes>
        </div>
        </Router>
    );
}

export default App;
