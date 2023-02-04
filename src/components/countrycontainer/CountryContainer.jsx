import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import { setCountry } from '../../feature/Country.slice';

import './CountryContainer.scss';
import { AwaitLoad } from '../awaitload/AwaitLoad';

const CountryContainer = () => {
    const dispatch=useDispatch();
    const countriesData=useSelector((state)=>state.countries.country);
    const [isLoaded,setIsLoaded]=useState(false);
    const getCountries=()=>{
        const url=`${process.env.REACT_APP_API_URL}country`;
         axios.get(url)
            .then((res)=>{
                dispatch(setCountry(res.data))
                setIsLoaded(true);
            });
    }
    useEffect(()=>{
        getCountries();
    },[]);
    return (
        <div className='country-container'>
            {isLoaded?countriesData.map(item=>(
                <SimpleCardContainer
                    key={item.id}
                    item={item}
                    kind='country'
                />
            ))
            :<AwaitLoad />
            }
        </div>
    )
}

export default CountryContainer