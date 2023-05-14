import {useState} from 'react';

import ranks from '../../../feature/ranks';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const UserLine = ({user}) => {
    const idFirstUser=5; //To be 1
    const [userRank, setUserRank]=useState(user.rank);
    const axiosPrivate=useAxiosPrivate();
    let userRole='';
    switch(user.rank){
        case ranks.user : userRole='utilisateur';
            break;
        case ranks.moderate: userRole='Modérateur';
            break;
        case ranks.admin : userRole='Administrateur';
            break;
        default : userRole='inconnu';
    }
    const handleChange=(e)=>{
        if(window.confirm('Voulez-vous changer le role ')){
            const newRank=parseInt(e.target.value,10);
            axiosPrivate
            .patch(`${process.env.REACT_APP_API_URL}users/admin/${user.id}`,{rank:newRank})
            .then((resp)=>{
                setUserRank(newRank);
                })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    return (
        <tr>    
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.id===idFirstUser
                ?'administrateur'
                :(<select value={userRank} onChange={(e)=>handleChange(e)}>
                {Object.keys(ranks).map((key, index)=> {
                    return (<option key={ranks[key]} value={ranks[key]}>{key}</option>)
                })}

            </select>)
            }
               </td>
        </tr>
    )
}

export default UserLine
