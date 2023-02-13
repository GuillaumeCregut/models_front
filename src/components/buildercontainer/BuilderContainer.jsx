import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AwaitLoad } from '../awaitload/AwaitLoad';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { addBuilder, updateBuilder, setBuilder, deleteBuilder } from '../../feature/Builder.slice';
import BuilderFrame from '../builderframe/BuilderFrame';
const BuilderContainer = () => {
    const url = `${process.env.REACT_APP_API_URL}builder`;
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const buildersData = useSelector((state) => state.builders.builder);
    const axiosPrivate = useAxiosPrivate();

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
    return (
        <div>

            Constructeurs
            {isLoaded ?
                (<ul>
                    {buildersData.map((item) => (
                        <BuilderFrame 
                         key={item.id}
                         builder={item} />
                    ))}
                </ul>)
                : <AwaitLoad />
            }
        </div>
    )
}

export default BuilderContainer
