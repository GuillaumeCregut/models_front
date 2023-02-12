import { useState } from 'react';

import './UpdateData.scss';

const UpdateData = ({ user,cancelAction }) => {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [login, setLogin] = useState(user.login);
    const [email, setEmail] = useState(user.email);
    const [isPwdChecked, setIsPwdChecked] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');


    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return (
        <div className='update-user-info-container'>
            <h3 className='update-user-info-title'>Mon profil : Modifications</h3>
            <form onSubmit={handleSubmit} className='update-user-info-form'>
                <label htmlFor='lastname'>Nom : <input type='text' id='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} /></label>
                <label htmlFor='firstname'>Prénom : <input type='text' id='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} /></label>
                <label htmlFor='login'>Login : <input type='text' id='login' value={login} onChange={(e) => setLogin(e.target.value)} /></label>

                <label htmlFor='email'>Email : <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                <label htmlFor='change-password'>Modifier le mot de passe ? <input type="checkbox" id="change-password" checked={isPwdChecked} onChange={e => setIsPwdChecked(!isPwdChecked)} /> </label>
                {isPwdChecked
                    ? <><label htmlFor='pass1'>Nouveau mot de passe : <input type="password" id="pass1" value={pass1} onChange={(e)=>setPass1(e.target.value)}/> </label>
                        <label htmlFor='pass2'>Nouveau mot de passe (validation): <input type="password" id="pass2" value={pass2} onChange={(e)=>setPass2(e.target.value)}/> </label>
                        </>
                    : null
                }
                <button>Valider les modifications</button>
            </form>
            <button onClick={()=>cancelAction(false)}> Annuler</button>
        </div>
    )
}

export default UpdateData
