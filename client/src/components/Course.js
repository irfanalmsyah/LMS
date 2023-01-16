import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const Courses = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        axios.get(`http://localhost:3000/courses/${id}`, {
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
            console.log(error)
        })
    }, [cookies.token, id])
    return (
        <div>
            <h1>Courses</h1>
            <h1>Courses</h1>
            <h1>{data && data.course.code}</h1>
            <h1>{data && data.course.name}</h1>
            {data && data.courseClasses.map((courseClass) => (
                courseClass.coursechildren.map((courseChild) => (
                    <div>
                        <h2>{courseChild.name}</h2>
                        <h2>{courseChild.description}</h2>
                    </div>
                ))
            ))}
        </div>
    )
}

export default Courses;