import React from 'react'
import './ParamsMenu.scss';
const ParamsMenu = (props) => {
    return (
        <div className="params-menu">
            <ul className="params-links-container">
                <li className="link-param-item">Périodes</li>
                <li className="link-param-item">Constructeurs</li>
                <li className="link-param-item">Marques</li>
                <li className="link-param-item">Types</li>
                <li className="link-param-item">Echelles</li>
                <li className="link-param-item">Pays</li>
                <li className="link-param-item">Modèles</li>
            </ul>
        </div>
    )
}

export default ParamsMenu
