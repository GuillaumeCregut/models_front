import React, { useState, useRef, useEffect } from 'react'
import axios from "axios";
import './SignUp.scss';

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [validLogin, setValidLogin] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [pwd2Focus, setPwd2Focus] = useState(false);
    const [pwd1Focus, setPwd1Focus] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = PWD_REGEX.test(password1);
        setValidPwd(result);
        const match = password1 === password2;
        setValidMatch(match);
    }, [password1, password2])


    useEffect(() => {
        const result = USER_REGEX.test(login);
        setValidLogin(result);
    }, [login])

    useEffect(() => {
        setErrMsg('');
    }, [login, password1, password2])


    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

    const handleSubmit =  (e) => {
        e.preventDefault();
        if ((firstname !== '') && (lastname !== '') && (email !== '') && (login !== '') && (password1 !== '') && (password2 !== '')) {
            //Controle des mots de passe
            const u1 = USER_REGEX.test(login);
            const p1 = PWD_REGEX.test(password1) && (password1 === password2);
            if (!u1 || !p1) {
                setErrMsg('Le formulaire est invalide')
            }
            //axios
            else {
                //create  data
                axios
                .post('url','data')
                .then ((res)=>{
                    setSuccess(true);
                })
                .catch((err)=>{
                    alert(err)
                    if(err?.response){
                        setErrMsg('Aucune réponse du serveur');
                        
                    }
                    else if (err.response?.status){
                        //Afficher le message d'erreur
                        errRef.current.focus();
                    }
                })
            }
        } else {
            setErrMsg('Le formulaire est invalide. Veuillez remplir tous les champs')
        }
    }

    return (
        <>
            {success ? (
                <section>
                    OK
                </section>
            ) : (
                <section className='signup-container'>
                    <h2 className="signup-title">Enregistrez vous</h2>
                    <p ref={errRef} className={errMsg ? 'signup-err' : 'signup-err-off'} aria-live="assertive">{errMsg}</p>
                    <form className='form-signup' onSubmit={handleSubmit}>
                        <label htmlFor="firstname" className='form-signup-label'>Prénom :
                            <input
                                type="text"
                                className='form-signup-input'
                                id="firstname"
                                value={firstname}
                                onChange={(e) => { setFirstname(e.target.value) }}
                                autoComplete='off'
                                ref={userRef}
                                placeholder="prénom"
                                required />
                        </label>
                        <label htmlFor="lastname" className='form-signup-label'>Nom :
                            <input
                                type="text"
                                className='form-signup-input'
                                id="lastanme"
                                value={lastname}
                                onChange={(e) => { setLastname(e.target.value) }}
                                autoComplete='off'
                                placeholder="nom"
                                required />
                        </label>
                        <label htmlFor="email" className='form-signup-label'>Adresse mail :
                            <input
                                type="text"
                                className='form-signup-input'
                                id="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                autoComplete='off'
                                placeholder="email"
                                required />
                        </label>
                        <label htmlFor="login" className='form-signup-label'>Login :
                            <span className={validLogin ? "signup-valid" : "signup-hide"}>OK</span>
                            <span className={validLogin || !login ? "signup-hide" : "signup-invalid"}>Wrong</span>
                            <input
                                type="text"
                                className='form-signup-input'
                                id="login"
                                value={login}
                                onChange={(e) => { setLogin(e.target.value) }}
                                autoComplete='off'
                                placeholder="login"
                                aria-invalid={validLogin ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setLoginFocus(true)}
                                onBlur={() => setLoginFocus(false)}
                                required />
                        </label>
                        <p id="uidnote" className={loginFocus && login && !validLogin ? "signup-instruction" : "signup-err-off"}>
                            Doit être de 4 à 24 caractères, doit commencer par une lettre.<br />
                            Lettres, nombres underscore et tirets sont autorisés.
                        </p>
                        <label htmlFor="password1" className='form-signup-label'>Mot de passe :
                            <span className={validPwd ? "signup-valid" : "signup-hide"}>OK</span>
                            <span className={validPwd || !password1 ? "signup-hide" : "signup-invalid"}>Wrong</span>
                            <input
                                type="password"
                                className='form-signup-input'
                                value={password1}
                                onChange={(e) => { setPassword1(e.target.value) }}
                                id="password1"
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwd1Focus(true)}
                                onBlur={() => setPwd1Focus(false)}
                                required />
                        </label>
                        <p id="pwdnote" className={pwd1Focus && password1 && !validPwd ? "signup-instruction" : "signup-err-off"}>
                            Doit être de 8 à 24 caractères, Doit inclure une majuscule, un chiffre et un caracère spécial.<br />
                            Sont autorisés : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>
                        <label htmlFor="password2" className='form-signup-label'>Mot de passe (vérification) :
                            <span className={validMatch && password2 && validPwd ? "signup-valid" : "signup-hide"}>OK</span>
                            <span className={validMatch || !password2 ? "signup-hide" : "signup-invalid"}>Wrong</span>
                            <input
                                type="password"
                                className='form-signup-input'
                                value={password2}
                                onChange={(e) => { setPassword2(e.target.value) }}
                                id="password2"
                                aria-invalid={validMatch ? "false" : "true"}
                                onFocus={() => setPwd2Focus(true)}
                                onBlur={() => setPwd2Focus(false)}
                                required />
                        </label>
                        <button
                            className='form-signupbtn'
                            disabled={!validLogin || !validPwd || !validMatch || firstname === '' || lastname === '' || email === '' ? true : false}
                        >Valider</button>
                    </form>
                    <p className='signup-info'>Vous avez déjà un compte ? Connectez vous !</p>
                </section>
            )}
        </>
    )
}

export default SignUp