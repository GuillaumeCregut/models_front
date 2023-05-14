import { NavLink } from 'react-router-dom';

import './AdminMenu.scss';

const AdminMenu = () => {
    return (
        <nav className='admin-menu'>
            <ul className="admin-links-container">
            <li className="link-param-item">
                    <NavLink to="logs" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Logs serveur</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AdminMenu
