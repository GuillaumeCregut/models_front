import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth';
import Login from '../login/Login';

const UserData = () => {
    const [user, setUser]=useState(null);
    const [isloaded,setIsLoaded]=useState(false);
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

    return (
        idUser&&isloaded
        ?   <div>
            <h3>Mon profil</h3>
               <p>Nom : {user.lastname}</p>
               <p>Prénom :{user.firstname}</p>
               <p>Login : {user.login}</p>
               <p>Mot de passe :</p>
               <p>Email : {user.email}</p>
            </div>
        :<Login /> 
    )
}

export default UserData
