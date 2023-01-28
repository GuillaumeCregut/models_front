import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.scss';

export const NavBar = () => {
    return (
        <nav className="navbar-container">
            <div className="navlink-container">
                <input type="checkbox" className="toggle-btn"></input>
                <div className="burger-menu"></div>
                <ul className="menu">
                    <li><NavLink to='accueil'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Accueil</NavLink></li>
                    <li><NavLink to='params'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Paramètres</NavLink></li>
                    <li><NavLink to='profil'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Mon profil</NavLink></li>
                    <li><NavLink to='kits'className={({isActive})=>isActive ? 'main-font-20 active' : 'main-font-20'}>Mes kits</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
