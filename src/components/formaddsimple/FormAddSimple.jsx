import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import './FormAddSimple.scss';

const FormAddSimple = ({action, url,refresh}) => {
    const [newName,setNewName]=useState('');
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(newName==='')
            return-1;
        const newData={name:newName}
        if(window.confirm("Voulez vous ajouter l'élément ?")){
            axios
                .post(url,newData)
                .then(()=>{
                    dispatch(action(newData));
                    dispatch(refresh)
                })
                .catch((err)=>{

                })
        }
    }
    
    return (
        <section className='form-add-simple-container'>
            <h3>Nouvel élément</h3>
            <form 
                className='form-add-simple'
                onSubmit={handleSubmit}
            >
            <label htmlFor="new-name">Nom du nouvel élément : 
                <input 
                    type="text" 
                    id="new-name" 
                    value={newName}
                    onChange={(e)=>setNewName(e.target.value)}
                    className="from-add-simple-input"
                />
            </label>
            <button className='form-add-simple-btn'>Ajouter</button>
            </form>
        </section>
    )
}

export default FormAddSimple
