import { Outlet, Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const PrivateRoutes = () => {
    const [cookies, setCookie] = useCookies();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:3000/users/me", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies.token}`
        }
        })
        .then(res => {
            setData(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, [cookies.token])
    if (!loading && !data) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default PrivateRoutes