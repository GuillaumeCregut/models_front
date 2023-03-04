import { Outlet } from 'react-router-dom';
import KitMenu from '../../components/kits/kitmenu/KitMenu';

import './Kits.scss';

export const Kits = () => {
  return (
    <div className='kits'>
      <KitMenu />
      <Outlet />
    </div>
  )
}
