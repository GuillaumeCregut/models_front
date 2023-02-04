import React,{useState} from 'react'
import axios from "axios";
import './SignIn.scss';

const SignIn = () => {
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [login,setLogin]=useState('');
    const [password1,setPassword1]=useState('');
    const [password2,setPassword2]=useState('');

    const handleSubmit=(e)=>{
      //  alert('OK');
        e.preventDefault();
        if((firstname!=='')&&(lastname!=='')&&(email!=='')&&(login!=='')&&(password1!=='')&&(password2!=='')){
            //Controle des mots de passe

            //axios
           
        }else{
            alert("Veuillez remplir tous les champs, merci.")
            return -1;
        }
    }

    return (
        <section className='signin-container'>
            <h2 className="signin-title">Enregistrez vous</h2>
            <form className='form-signin' onSubmit={handleSubmit}>
                <label htmlFor="firstname" className='form-signin-label'>Prénom :
                    <input 
                        type="text" 
                        className='form-signin-input'
                        id="firstname" 
                        value={firstname}
                        onChange={(e)=>{setFirstname(e.target.value)}}
                        autoComplete='off' />
                </label>
                <label htmlFor="lastname" className='form-signin-label'>Nom :
                    <input 
                        type="text" 
                        className='form-signin-input'
                        id="lastanme" 
                        value={lastname}
                        onChange={(e)=>{setLastname(e.target.value)}}
                        autoComplete='off' />
                </label>
                <label htmlFor="email" className='form-signin-label'>Adresse mail :
                    <input 
                        type="text" 
                        className='form-signin-input'
                        id="email" 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        autoComplete='off' />
                </label>
                <label htmlFor="login" className='form-signin-label'>Login :
                    <input 
                        type="text" 
                        className='form-signin-input'
                        id="login"
                        value={login}
                        onChange={(e)=>{setLogin(e.target.value)}} 
                        autoComplete='off' />
                </label>
                <label htmlFor="password1" className='form-signin-label'>Mot de passe :
                    <input 
                        type="password" 
                        className='form-signin-input'
                        value={password1}
                        onChange={(e)=>{setPassword1(e.target.value)}}
                        id="password1" />
                </label>
                <label htmlFor="password2" className='form-signin-label'>Mot de passe (vérification) :
                    <input 
                        type="password" 
                        className='form-signin-input'
                        value={password2}
                        onChange={(e)=>{setPassword2(e.target.value)}}
                        id="password2" />
                </label>
                <button className='form-signinbtn'>Valider</button>
            </form>
        </section>
    )
}

export default SignIn