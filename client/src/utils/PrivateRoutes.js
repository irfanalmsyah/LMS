import { Outlet, Navigate } from 'react-router-dom'
import {useCookies } from 'react-cookie';
import Loginfetch from '../components/Loginfetch'

const PrivateRoutes = () => {
    const [cookies, setCookie] = useCookies(['token']);

    console.log("posisi di privateroutes");

    return(
        cookies.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes