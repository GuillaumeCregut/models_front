import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import { setCountry } from '../../feature/Country.slice';

import './CountryContainer.scss';

const CountryContainer = () => {
    const dispatch=useDispatch();
    const countriesData=useSelector((state)=>state.countries.country);

    const getCountries=()=>{
        const url=`${process.env.REACT_APP_API_URL}country`;
         axios.get(url)
            .then((res)=>{
                dispatch(setCountry(res.data))
                //setCountries(res.data);
            });
    }
    useEffect(()=>{
        getCountries();
    },[]);
    return (
        <div className='country-container'>
            {countriesData?.map(item=>(
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