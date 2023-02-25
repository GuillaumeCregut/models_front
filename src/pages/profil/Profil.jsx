import React from 'react'
import ProfilMenu from '../../components/profilmenu/ProfilMenu';
import UserData from '../../components/userdata/UserData'

import './Profil.scss';

export const Profil = () => {
  return (
    <main className='profil-page'>
      <ProfilMenu />
      <UserData />
    </main>
  )
}
