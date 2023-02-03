import axios from 'axios';
import { useEffect, useState } from 'react';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
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
        <div>CountryContainer
            {countries.map(item=>(
                <SimpleCardContainer
                    key={item.id}
                    item={item}
                    kind='country'
                />
            ))}
        </div>
    )
}

export default CountryContainer