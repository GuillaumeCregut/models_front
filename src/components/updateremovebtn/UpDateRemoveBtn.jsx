import React from 'react'
import useAuth from '../../hooks/useAuth';

import './UpDateRemoveBtn.scss';

const UpDateRemoveBtn = ({deleteAction,updateAction}) => {

    const { auth } = useAuth();
    let rankUser = auth?.rank;
    console.log(rankUser);
    if(!rankUser)
        rankUser=0;
    return (
       rankUser===5 && <div className="btn-container">
            <button onClick={updateAction}>Modifier</button>
            <button onClick={deleteAction}>Supprimer</button>
        </div>
        
    )
}

export default UpDateRemoveBtn
