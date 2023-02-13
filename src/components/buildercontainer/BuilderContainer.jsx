import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AwaitLoad } from '../awaitload/AwaitLoad';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { addBuilder, updateBuilder, setBuilder, deleteBuilder } from '../../feature/Builder.slice';
import { setCountry } from '../../feature/Country.slice';
import BuilderFrame from '../builderframe/BuilderFrame';
import useAuth from '../../hooks/useAuth';
import ranks from '../../feature/ranks';

import './BuilderContainer.scss';

const BuilderContainer = () => {
    const url = `${process.env.REACT_APP_API_URL}builder`;
    const [isLoaded, setIsLoaded] = useState(false);
    const [findElement, setFindElement] = useState('');
    const [filteredBuiler, setFilteredBuilder] = useState([]);
    const [countryLoaded, setCountryLoaded] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(1);
    const [newBuilder, setNewBuilder] = useState('');
    const buildersData = useSelector((state) => state.builders.builder);
    const countryData = useSelector((state) => state.countries.country);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if(!rankUser)
        rankUser=1; //to be 0
    useEffect(() => {
        //Loading countries if null
        const getCountries = () => {
            const urlCountry = `${process.env.REACT_APP_API_URL}country`;
            axios.get(urlCountry)
                .then((res) => {
                    dispatch(setCountry(res.data))
                    setCountryLoaded(true);
                });
        }

        if (!countryData) {
            getCountries();
        }
        else
            setCountryLoaded(true);
    }, [])

    useEffect(() => {
        const getBuilders = () => {
            axios
                .get(url)
                .then((res) => {
                    dispatch(setBuilder(res.data));
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        if (!buildersData)
            getBuilders();
        else
            setIsLoaded(true);
    }, []);

    useEffect(() => {
        console.log('Filtrage');
        let tempBuilder = [];
        if (isLoaded) {
            tempBuilder = buildersData.filter((item) => item.name.toLowerCase().includes(findElement.toLowerCase()))
        }
        setFilteredBuilder([...tempBuilder]);
    }, [findElement, isLoaded])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newBuilder!==''){
            const addNewBuilder={
                name:newBuilder,
                country:selectedCountry
            }
            console.log(addNewBuilder);
        }
        else{
            alert("Veuillez remplir tous les champs");
        }

    }

    return (
        <section className='builders-container-page'>
            <h2 className='builders-container-title'>Constructeurs</h2>
            <label htmlFor="find-builder" className='builder-search-label'>Rechercher un constructeur :
                <input
                    type="text"
                    id="find-builder"
                    value={findElement}
                    onChange={(e) => setFindElement(e.target.value)}
                    className='find-builder-input'
                />
            </label>
            <div className="builder-container">
                {isLoaded ?
                    filteredBuiler.map((item) => (
                        <BuilderFrame
                            key={item.id}
                            builder={item} />
                    ))
                    : <AwaitLoad />
                }
            </div>
            {rankUser===ranks.user
            ?
            <section className='add-builder-container'>
                <h2 className='add-builder-title'>Ajouter un constructeur</h2>
                <form className="builder-add-form" onSubmit={handleSubmit}>
                    <label htmlFor="builder-name" className='builder-add-label'>Nom du constructeur :
                        <input
                            type="text"
                            id="builder-name"
                            value={newBuilder}
                            onChange={(e) => setNewBuilder(e.target.value)}
                            required
                            autoComplete='off'
                            className='builder-add-name'
                        />
                    </label>
                    <label htmlFor="country-select" className='builder-add-label'>Pays :
                        <select 
                            id="country-select" 
                            value={selectedCountry} 
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className='builder-add-select'
                            >
                            {countryLoaded
                                ? countryData.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}>{item.name}</option>
                                ))
                                : null
                            }
                        </select>
                    </label>
                    <button className='builder-add-btn'>Ajouter</button>
                </form>
            </section>
            :null
        }   
        </section>
    )
}

export default BuilderContainer
