import React from 'react'
import Navbarcomponents from './Navbarcomponents'
import Usersettingcomponents from './Usersettingcomponents'
import './Coursedetailcss.css'
import { Icon } from 'react-icons-kit'
import {chevronsRight} from 'react-icons-kit/feather/chevronsRight'

const Coursedetailcomponents = () => {
  return (
    <div>
      <div class="coursedetail-content">
        <div class="coursedetail-title">Course Detail</div>
        <div class="coursedetail-box"></div>
        <div class="coursedetail-card">
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
        </div>
      </div>
      <Usersettingcomponents />
      <Navbarcomponents />
    </div>
  )
}

export default Coursedetailcomponents
