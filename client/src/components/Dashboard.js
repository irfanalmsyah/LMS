import React, {useState} from 'react'
import Navbar from './Navbar'
import "../assets/styles/Dashboard.css"
import Calendar from 'react-calendar';
import "../utils/Calendarcss.css"


const Dashboard = () => {
    const [date, setDate] = useState(new Date())
    return (
        <div>
        <div className='dashboardtitle'>Dashboard</div>
        <div className='dashboardback'></div>
        <div className='coursetoday'>
            <span className='coursetoday title'>Course Today</span>
            <div className='coursetoday-card'>
                <div className='coursetoday-card1'>
                    <div className='coursetoday-card-title'>KOM133A</div>
                    <div className='coursetoday-card-subtitle'>Sistem Informasi</div>
                </div>
                <div className='coursetoday-card2'>
                    <div className='coursetoday-card-title'>KOM1221</div>
                    <div className='coursetoday-card-subtitle'>Metode Kuantitatif</div>
                </div>
                <div className='coursetoday-card3'>
                    <div className='coursetoday-card-title'>KOM1120H</div>
                    <div className='coursetoday-card-subtitle'>Struktur Data</div>
                </div>
            </div>
        </div>
        <div className='mycourse'>
            <span className='mycourse title'>My Course</span>
            <div className='mycourse card'>
                <div className='mycourse-card1'>
                    <div className='mycourse-card-title'>KOM133A</div>
                    <div className='mycourse-card-subtitle'>Sistem Informasi</div>
                </div>
                <div className='mycourse-card2'>
                    <div className='mycourse-card-title'>KOM1121</div>
                    <div className='mycourse-card-subtitle'>Metode Kuantitatif</div>
                </div>
                <div className='mycourse-card3'>
                    <div className='mycourse-card-title'>KOM1304</div>
                    <div className='mycourse-card-subtitle'>GKV</div>
                </div>
                <div className='mycourse-card4'>
                    <div className='mycourse-card-title'>KOM1120H</div>
                    <div className='mycourse-card-subtitle'>Struktur Data</div>
                </div>
                <div className='mycourse-card5'>
                    <div className='mycourse-card-title'>KOM1313</div>
                    <div className='mycourse-card-subtitle'>Sistem Operasi</div>
                </div>
                <div className='mycourse-card6'>
                    <div className='mycourse-card-title'>KOM133A</div>
                    <div className='mycourse-card-subtitle'>Jaringan Komputer</div>
                </div>
            </div>
        </div>
        <div className='splitter'></div>
        <div className='calendar'>
            <div className='calendar-box'>
                <div className="calendar-container">
                    <Calendar onChange={setDate} value={date}/>
                </div>
                <div className="text-center">
                    Selected date: {date.toDateString()}
                </div>
            </div>
        </div>
        <div className='assignment'>
            <div className='assignment-box'></div>
            <div className='assignment-title'>Assignment & Quiz</div>
            <div className='assignment-all'>See All</div>
            <div className='assignment-splitter'></div>
        </div>
        <Navbar />
        </div>
    )
}

export default Dashboard