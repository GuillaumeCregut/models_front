import { Outlet } from 'react-router-dom';
import CountryContainer from '../../components/countrycontainer/CountryContainer';
import ParamsMenu from '../../components/paramsmenu/ParamsMenu';
import './Params.scss';

export const Params = () => {
  return (
    <div className='params'>
      <ParamsMenu />
      <Outlet />
    </div>
  )
}
