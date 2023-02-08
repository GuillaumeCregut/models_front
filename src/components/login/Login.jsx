import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import jwt_decode from "jwt-decode";

import './Login.scss';

const Login = (props) => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const { setAuth } = useAuth();
    const loginRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        loginRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [login, pass])

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_URL}auth/`;
        if (login === '' || pass === '') {
            alert('Veuillez remplir tous les champs');
        }
        else {
            const data = {
                login: login,
                password: pass
            }
            axios.post(url, data, { withCredentials: true })
                .then((resp) => {
                    if (resp?.data) {
                        const token = resp.data?.accessToken;
                        var decoded = jwt_decode(token);
                        const user = {
                            firstname: decoded.firstname,
                            lastname: decoded.lastname,
                            rank: decoded.rank,
                            token: token
                        }
                        setAuth(user);
                    }
                })
                .catch((err) => {
                    let errorMessage = '';
                    switch (err.response.status) {
                        case 401: errorMessage = "Login ou mot de passe invalide";
                            break;
                        case 404: errorMessage = "Utilisateur inexistant";
                            break;
                        case 422: errorMessage = "Erreur dans les données fournies";
                    }
                    setErrMsg(errorMessage);
                    errRef.current.focus();
                })
        }
    }

    return (
        <section className='login-container'>
            <h2 className="login-title">Connexion</h2>
            <p className={errMsg ? "login-error-msg" : "login-hide"} aria-live="assertive" ref={errRef}>{errMsg} </p>
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
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="login-label">Mot de passe :
                    <input
                        type="password"
                        className="input-login-form"
                        id="password"
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
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
