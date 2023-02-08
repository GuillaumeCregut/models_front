import React from 'react'
import useAuth from '../../hooks/useAuth';
import {HiLockClosed, HiLockOpen} from 'react-icons/hi';

import './Welcome.scss';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const {auth}=useAuth();
    const {firstname,lastname}=auth;
    const navigate=useNavigate();
    const handleClick=()=>{
        
        if(auth?.token){
            console.log('logout')
        }
        else{
            navigate('/login');
        }
    }

    console.log('welcome: ',auth)
    return (
        <div className='welcome' onClick={handleClick}>
            {
                auth.firstname
                ?(<p><span className="welcome-name">{firstname} {lastname}</span> 
                    <HiLockOpen className='welcome-unlock'/> </p>)
                :<HiLockClosed className='welcome-lock'/>

            }
           
        </div>
    )
}

export default Welcome
