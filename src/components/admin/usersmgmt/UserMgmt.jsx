import {useState,useEffect} from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import UserLine from './UserLine';

import './UserMgmt.scss';

const UserMgmt = () => {
    const [users,setUsers]=useState([]);
    const axiosPrivate=useAxiosPrivate();

    useEffect(()=>{
        const getUsers=()=>{
            axiosPrivate
                .get(`${process.env.REACT_APP_API_URL}users`)
                .then((resp)=>{
                    setUsers(resp.data);
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
        getUsers();
    },[]);

    return (
        <section className='admin-user'>
           <h1 className='admin-user-title'>Gestion des utilisateurs</h1> 
            <table>
                <thead>
                    <tr>
                        <th className='userArray-head column'> Prénom</th>
                        <th className='userArray-head column'>Nom</th>
                        <th className='userArray-head column'>Rang</th>
                    </tr>
                </thead>
                <tbody>
                {users.length>0&&
                    users.map((user)=>(
                        <UserLine key={user.id} user={user}/>
                    ))
                }
                </tbody>
            </table>
        </section>
    )
}

export default UserMgmt
