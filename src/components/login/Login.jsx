import React, { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './Login.scss';

const Login = (props) => {
    const [login, setLogin]=useState('');
    const[pass,setPass]=useState('');
    const [errMsg, setErrMsg]=useState(false);
  
    const loginRef=useRef();
    const errRef=useRef();

    useEffect(()=>{
        loginRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[login, pass])


    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

    const handleSubmit=(e)=>{
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_URL}auth/`;
    }

    return (
        <section className='login-container'>
            <h2 className="login-title">Connexion</h2>
            <p className={errMsg?"login-error-msg": "login-hide"} aria-live="assertive">{errMsg}</p>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="login" className="login-label">Login :
                    <input 
                    type="text" 
                    className="input-login-form" 
                    id="login" 
                    required
                    autoComplete='off'
                    ref={loginRef}
                    value={login}
                    onChange={(e)=>setLogin(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="login-label">Mot de passe :
                    <input 
                    type="password" 
                    className="input-login-form" 
                    id="password" 
                    required
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}
                    />
                </label>
                <button className='login-btn'>Connexion</button>
            </form>
            <p className="login-footer">
                Pas encore de compte ? Inscrivez-vous
            </p>
        </section>
    )
}

export default Login
