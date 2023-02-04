import React, { useEffect, useRef, useState } from 'react';

import './ModifierCard.scss';
import close from '../../assets/pictures/close.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const ModifierCard = ({ id,name, url, action, hide }) => {
    const [newName, setNewName] = useState(name);
    const nameRef = useRef();
    const formRef = useRef();
    const dispatch=useDispatch();
    const handleClose = () => {
        hide(false);
    }

    useEffect(()=>{
        nameRef.current.focus();
    },[])

    const handleUpdate=(e)=>{
        e.preventDefault();
        if(window.confirm('Voulez vous modifier ?')){
        const newItem={name:newName};
         axios
             .put(url,newItem)
             .then(()=>{
                    dispatch(action([newItem,id]))
             })
             .catch((err)=>{
                switch(err.response.status){
                    case 401 : alert("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 403 : alert("Vous n'êtes pas autoriser à modifier");
                        break;
                    case 404 :  alert("L'élément n'existe pas");
                        break;
                    case 422 : alert("Veuillez vérifier les valeurs");
                        break;
                    case 500 : alert("Une erreur serveur est survenue.");
                        break;
                    default : alert(`action impossible : ${err.response.status}`);
                        console.error(err)
                }
             })
        }
        formRef.current.reset();
        handleClose()
    }

    const btnStyle={
        backgroundImage:`url(${close})`
    }

    return (
        <div className='form-update-card-container'>
            <form className='form-update-card' onSubmit={handleUpdate} ref={formRef}>
                <label htmlFor="new-name">
                    Nouveau nom : <br />
                    <input
                        type="text"
                        id="new-name"
                        ref={nameRef}
                        value={newName}
                        className="input-name"
                        onChange={(e)=>setNewName(e.target.value)}
                        />
                </label>
                <button>valider</button>
            </form>
            <button onClick={handleClose} className="close-btn" aria-label='Fermer' style={btnStyle}></button>
        </div>
    )
}
