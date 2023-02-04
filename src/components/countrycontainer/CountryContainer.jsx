import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import { setCountry, deleteCountry,addCountry,updateCountry } from '../../feature/Country.slice';

import './CountryContainer.scss';
import { AwaitLoad } from '../awaitload/AwaitLoad';

const CountryContainer = () => {
    const dispatch = useDispatch();
    const countriesData = useSelector((state) => state.countries.country);
    const [isLoaded, setIsLoaded] = useState(false);
    const url = `${process.env.REACT_APP_API_URL}country`;

    const getCountries = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setCountry(res.data))
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        getCountries();
    }, []);

    //Bundling datas for card
    const wrapper={
        deleteAction: deleteCountry,
        updateAction: updateCountry,
        kind: "le pays",
        url:url
    }

    return (
        <div className="country-component">
            <h2 className='country-title'>Les pays</h2>
            <div className='country-container'>
                {isLoaded ? countriesData.map(item => (
                    <SimpleCardContainer
                        key={item.id}
                        item={item}
                        wrapper={wrapper}
                    />
                ))
                    : <AwaitLoad />
                }
            </div>
        </div>
    )
}

export default CountryContainer