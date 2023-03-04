import { NavLink } from 'react-router-dom';
import './KitMenu.scss';
const KitMenu = () => {
    return (
        <div className='kit-menu'>
             <ul className="kit-links-container">
             <li className="link-param-item">
                <NavLink to="test" className={({isActive})=>isActive ? 'nav-item active' : 'nav-item'}>test</NavLink></li>
             </ul>
        </div>
    )
}

export default KitMenu
