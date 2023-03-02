import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import './ProviderSelector.scss';

const ProviderSelector = ({id, provider, setProvider}) => {
    const [providers,setProviders]=useState([]);
    const axiosPrivate=useAxiosPrivate();
    const {auth}=useAuth();
    let idUser=auth?.id;
    if(!idUser){
        idUser=0;
    }
    useEffect(()=>{
        const getProviders=()=>{
            const url = `${process.env.REACT_APP_API_URL}supplier/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp)=>{
                   setProviders(resp.data)
                })
                .catch((err)=>{
                    console.error(err);
                })
        }
        getProviders();
    },[]);
    console.log(providers)
    return (
        <select
        id={id}
        value={provider}
        onChange={(e)=>setProvider(e.target.value)}>
            <option value="0">--</option>
             {providers.length>0
            ?providers.map((providerItem)=>(
                <option value={providerItem.id}>{providerItem.name}</option>
            ))
            :null
            }
        </select>
    )
}

export default ProviderSelector
