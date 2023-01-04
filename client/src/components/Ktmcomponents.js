import React from 'react'
import Navbarcomponents from './Navbarcomponents'
import Usersettingcomponents from './Usersettingcomponents'
import './Ktmcss.css'


const Ktmcomponents = () => {
  return (
    <div>
        <div class="ktm-content">
            <div class="ktm-title">KTM</div>
            <div class="ktm-box"></div>
            <div class="ktm-card"></div>
            <div class="ktm-download">
                <button class="ktm-download-button">Download</button>
            </div>
        </div>

        <Navbarcomponents />
        <Usersettingcomponents />
    </div>
  )
}

export default Ktmcomponents