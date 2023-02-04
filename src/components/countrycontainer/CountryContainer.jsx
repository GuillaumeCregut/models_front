import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import './CountryContainer.scss';

const CountryContainer = () => {
    const [countries, setCountries]=useState([]);
    const dispatch=useDispatch();
    const countriesData=useSelector((state)=>state.countries.country);

    useEffect(()=>{
        const getCountries=async()=>{
            const url=`${process.env.REACT_APP_API_URL}country`;
            await axios.get(url)
                .then(res=>{
                    dispatch(setCountries(res.data))
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