import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from '../../../hooks/useAuth';
import Login from '../../login/Login';
import { ToastContainer, toast } from 'react-toastify';

import './UserData.scss';
import UpdateData from './UpdateData';

const UserData = () => {
    const [user, setUser] = useState(null);
    const [isloaded, setIsLoaded] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [isReplied, setIsReplied] = useState(false);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const idUser = auth?.id;

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}users/${idUser}`;
        if (idUser) {
            axiosPrivate
                .get(url)
                .then((resp) => {
                    if (resp?.data) {
                        setUser(resp.data);
                        setIsLoaded(true)
                    }
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
    }, [idUser, isReplied])

    const updateUser = (newUser) => {
        const url = `${process.env.REACT_APP_API_URL}users/${idUser}`;
        axiosPrivate
            .put(url, newUser)
            .then((res) => {
                setIsReplied(!isReplied)
            })
            .catch((err) => {
                toast.error('Une erreur est survenue');
            })
        setIsModify(false);
    }

    return (
        idUser && isloaded
            ?
            isModify
                ? <UpdateData user={user} cancelAction={setIsModify} updateUser={updateUser} />
                : (<div className='user-data-container'>
                    <ToastContainer />
                    <h3 className='user-data-title'>Mon profil</h3>
                    <p>Nom : {user.lastname}</p>
                    <p>Prénom :{user.firstname}</p>
                    <p>Login : {user.login}</p>

                    <p>Email : {user.email}</p>
                    <button onClick={() => setIsModify(!isModify)}>Modifier les valeurs</button>
                </div>)
            : <Login />
    )
}

export default UserData
