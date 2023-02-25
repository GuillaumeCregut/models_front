import React from 'react'
import { Outlet } from 'react-router-dom';
import ProfilMenu from '../../components/profilmenu/ProfilMenu';

import './Profil.scss';

export const Profil = () => {
  return (
    <main className='profil-page'>
      <ProfilMenu />
      <Outlet />
    </main>
  )
}
