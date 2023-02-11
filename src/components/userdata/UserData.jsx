import axios from 'axios';
import React, { useEffect } from 'react'
import { Navigate,useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const UserData = () => {
    const {auth}=useAuth();
    const location=useLocation();
    const idUser=auth?.id;
    useEffect(()=>{
        const url = `${process.env.REACT_APP_API_URL}users/${idUser}`;
       // axios.get
    },[])

    return (
        idUser
        ?   <div>
             Toto
            </div>
        :<Navigate to='/login' state={{from:location}} replace /> 
    )
}

export default UserData
