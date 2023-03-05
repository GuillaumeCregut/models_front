import { NavLink } from 'react-router-dom';
import './KitMenu.scss';
const KitMenu = () => {
    return (
        <div className='kit-menu'>
            <ul className="kit-links-container">
                <li className="link-param-item">
                    <NavLink to="gestion" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Gestion du stock</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="test" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits commandés</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="test" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits en stock</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="test" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits en cours</NavLink>
                </li>
                <li className="link-param-item">
                    <NavLink to="test" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Kits terminés</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default KitMenu
