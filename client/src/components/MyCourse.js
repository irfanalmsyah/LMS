import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import "../assets/styles/MyCourse.css"
import { Icon } from 'react-icons-kit'
import {chevronsRight} from 'react-icons-kit/feather/chevronsRight'
import { NavLink } from 'react-router-dom';


const MyCourse = () => {
    const [data, setData] = useState(null)
    const [cookies, setCookie] = useCookies();
    useEffect(() => {
        axios.get("http://localhost:3000/courses/me", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies.token}`
        }
        })
        .then((response) => {
            setData(response.data.courses)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [cookies.token])
    
    return (
        <div>
            <div class="coursedetail-content">
                <div class="coursedetail-title">Course Detail</div>
                <div class="coursedetail-box">
                    {data && data.map((course) => (
                            <div>
                                <NavLink to={`/courses/${course.id}`}>
                                    <div>
                                        {course.code} | {course.name}
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                </div>
                {/* <div class="coursedetail-card">
                    <div class="coursedetail-card1">
                        <div class="coursedetail-card-title">KOM133A</div>
                        <div class="coursedetail-card-subtitle">Sistem Informasi</div>
                        <div class="coursedetail-card-icon">
                        <Icon icon={chevronsRight} size={20} />
                        </div>
                    </div>
                    <div class="coursedetail-card2">
                        <div class="coursedetail-card-title">KOM1221</div>
                        <div class="coursedetail-card-subtitle">Metode Kuantitatif</div>
                        <div class="coursedetail-card-icon">
                        <Icon icon={chevronsRight} size={20} />
                        </div>
                    </div>
                    <div class="coursedetail-card3">
                        <div class="coursedetail-card-title">KOM1304</div>
                        <div class="coursedetail-card-subtitle">GKV</div>
                        <div class="coursedetail-card-icon">
                        <Icon icon={chevronsRight} size={20} />
                        </div>
                    </div>
                    <div class="coursedetail-card4">
                        <div class="coursedetail-card-title">KOM1120H</div>
                        <div class="coursedetail-card-subtitle">Struktur Data</div>
                        <div class="coursedetail-card-icon">
                        <Icon icon={chevronsRight} size={20} />
                        </div>
                    </div>
                    <div class="coursedetail-card5">
                        <div class="coursedetail-card-title">KOM1313</div>
                        <div class="coursedetail-card-subtitle">Sistem Operasi</div>
                        <div class="coursedetail-card-icon">
                        <Icon icon={chevronsRight} size={20} />
                        </div>
                    </div>
                    <div class="coursedetail-card6">
                        <div class="coursedetail-card-title">KOM133A</div>
                        <div class="coursedetail-card-subtitle">Jaringan Komputer</div>
                        <div class="coursedetail-card-icon">
                        <Icon icon={chevronsRight} size={20} />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
        
    )
}

export default MyCourse
