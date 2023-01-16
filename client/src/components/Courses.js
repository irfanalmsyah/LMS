import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState(null);
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        axios.get("http://localhost:3000/courses", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.token}`
            }
        })
        .then((response) => {
            setCourses(response.data.courses)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [cookies.token])
    return (
        <div>
            <h1>Courses</h1>
            <h1>all Courses</h1>
            {courses && courses.map((course) => (
                <NavLink to={`/courses/${course.id}`}>
                    <div>
                        {course.code} |
                        {course.name}
                    </div>
                </NavLink>
            ))}
        </div>
    )
}

export default Courses;
