import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';
import Login from '../login/Login';

import './UserData.scss';
import UpdateData from './UpdateData';

const UserData = () => {
    const [user, setUser]=useState(null);
    const [isloaded,setIsLoaded]=useState(false);
    const [isModify,setIsModify]=useState(false);
    const {auth}=useAuth();
    const axiosPrivate=useAxiosPrivate();
    const idUser=auth?.id;

    useEffect(()=>{
        const url = `${process.env.REACT_APP_API_URL}users/${idUser}`;
        if(idUser){
            axiosPrivate
                .get(url)
                .then((resp)=>{
                    if(resp?.data){
                        setUser(resp.data);
                        setIsLoaded(true)
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    },[idUser])

    const updateUser=(newUser)=>{
        alert('on envoie')
    }

    return (
        idUser&&isloaded
        ?  
            isModify
                    ?<UpdateData  user={user} cancelAction={setIsModify} updateUser={updateUser}/>
                    : (<div className='user-data-container'> 
                        <h3 className='user-data-title'>Mon profil</h3>
                        <p>Nom : {user.lastname}</p>
                        <p>Prénom :{user.firstname}</p>
                        <p>Login : {user.login}</p>
                        
                        <p>Email : {user.email}</p>
                        <button onClick={()=>setIsModify(!isModify)}>Modifier les valeurs</button>
                        </div>)
        :<Login /> 
    )
}

export default UserData
