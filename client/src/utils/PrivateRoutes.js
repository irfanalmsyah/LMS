import { Outlet, Navigate } from 'react-router-dom'
import {useCookies } from 'react-cookie';
import Loginfetch from '../components/Loginfetch'

const PrivateRoutes = () => {
    const [cookies, setCookie] = useCookies(['jwt_authorization']);

    console.log("posisi di privateroutes");

    return(
        cookies.jwt_authorization ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes