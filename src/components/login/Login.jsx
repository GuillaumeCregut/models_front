import React, { useEffect, useRef, useState } from 'react'

import './Login.scss';

const Login = (props) => {
    const [login, setLogin]=useState('');
    const[pass,setPass]=useState('');
    const [validLogin, setvalidLogin]=useState(false);
    const [validPass,setValidPass]=useState(false);
    const loginRef=useRef();

    useEffect(()=>{
        loginRef.current.focus();
    },[])
    useEffect(()=>{

    },[])
    useEffect(()=>{

    },[])

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return (
        <section className='login-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="login" className="login-label">Login :
                    <input 
                    type="text" 
                    className="input-login-form" 
                    id="login" 
                    required
                    ref={loginRef}
                    value={login}
                    onChange={(e)=>setLogin(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="login-label">Mot de passe :
                    <input 
                    type="text" 
                    className="input-login-form" 
                    id="password" 
                    required
                    value={pass}
                    onChange={(e)=>setPass(e.target.value)}
                    />
                </label>
                <button>Connexion</button>
            </form>
            <p className="login-footer">
                Pas encore de compte ? Inscrivez-vous
            </p>
        </section>
    )
}

export default Login
