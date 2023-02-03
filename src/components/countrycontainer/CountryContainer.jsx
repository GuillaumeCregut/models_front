import axios from 'axios';
import { useEffect, useState } from 'react';
import './CountryContainer.scss';

const CountryContainer = () => {
    const [countries, setCountries]=useState([]);
    useEffect(()=>{
        const getCountries=async()=>{
            const url=`${process.env.REACT_APP_API_URL}country`;
            await axios.get(url)
                .then(res=>{
                    
                    setCountries(res.data);});
        }
        getCountries();
    },[]);
    return (
        <div>CountryContainer</div>
    )
}

export default CountryContainer