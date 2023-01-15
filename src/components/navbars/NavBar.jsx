import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.scss';

export const NavBar = () => {
    return (
        <nav className="navbar-container">
            <div class="navlink-container">
                <input type="checkbox" class="toggle-btn"></input>
                <div class="burger-menu"></div>
                <ul className="menu">
                    <li><NavLink to='accueil'className={({isActive})=>isActive ? 'active-nav' : undefined}>Accueil</NavLink></li>
                    <li><NavLink to='params'className={({isActive})=>isActive ? 'active-nav' : undefined}>Paramètres</NavLink></li>
                    <li><NavLink to='profil'className={({isActive})=>isActive ? 'active-nav' : undefined}>Mon profil</NavLink></li>
                    <li><NavLink to='kits'className={({isActive})=>isActive ? 'active-nav' : undefined}>Mes kits</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
