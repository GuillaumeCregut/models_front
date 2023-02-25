import { NavLink } from 'react-router-dom';

import './ProfilMenu.scss';

const ProfilMenu = () => {
    return (
        <nav className='profil-menu'>
            <ul className="link-profil-list">
                <li className="link-profil-item"><NavLink to='/profil/infos' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Mes informations</NavLink></li>
                <li className="link-profil-item"><NavLink to='fournisseurs' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Mes fournisseurs</NavLink></li>
                <li className="link-profil-item"><NavLink to='commandes' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>Mes commandes</NavLink></li>
                <li className="link-profil-item"><NavLink to='' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}></NavLink></li>
                <li className="link-profil-item"><NavLink to='' className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}></NavLink></li>
            </ul>
        </nav>
    )
}

export default ProfilMenu