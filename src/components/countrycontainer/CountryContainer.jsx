import axios from 'axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import { setCountry, deleteCountry,addCountry,updateCountry } from '../../feature/Country.slice';
import { AwaitLoad } from '../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';

import './CountryContainer.scss';

const CountryContainer = () => {
    const dispatch = useDispatch();
    const countriesData = useSelector((state) => state.countries.country);
    const [isLoaded, setIsLoaded] = useState(false);
    const url = `${process.env.REACT_APP_API_URL}country`;
    const axiosPrivate=useAxiosPrivate();

    const addAction=(newData)=>{
        if(window.confirm("Voulez vous ajouter l'élément ?")){
            axiosPrivate
                .post(url,newData)
                .then(()=>{
                    dispatch(addCountry(newData));
                    dispatch(getCountries)
                })
                .catch((err)=>{
                    alert("Vous n'êtes pas autorisé à ajouter un élément.")
                })
        }
    }


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
        <section className="country-component">
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
            <FormAddSimple
            action={addAction}
             />
        </section>
    )
}

export default CountryContainer