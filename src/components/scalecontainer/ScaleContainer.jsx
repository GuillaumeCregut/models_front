import axios from 'axios';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleCardContainer } from '../simplecardcontainer/SimpleCardContainer';
import { addScale,setScale,updateScale,deleteScale } from '../../feature/Scale.slice';
import { AwaitLoad } from '../awaitload/AwaitLoad';
import FormAddSimple from '../formaddsimple/FormAddSimple';

import './ScaleContainer.scss';

const ScaleContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const scalesData = useSelector((state) => state.scales.scale);
    const url = `${process.env.REACT_APP_API_URL}scale`;
    const axiosPrivate=useAxiosPrivate();

    const addAction=(newData)=>{
        if(window.confirm("Voulez vous ajouter l'élément ?")){
            axiosPrivate
                .post(url,newData)
                .then((resp)=>{
                    const newScale=resp.data;
                    dispatch(addScale(newScale));
                })
                .catch((err)=>{
                    console.log(err);
                    alert("Vous n'êtes pas autorisé à ajouter un élément.")
                })
        }
    }

    const getScales = () => {
        axios.get(url)
            .then((res) => {
                dispatch(setScale(res.data))
                setIsLoaded(true);
            });
    }


    const wrapper={
        deleteAction: deleteScale,
        updateAction: updateScale,
        kind: "l'échelle'",
        url:url
    }


    return (
        <div>
            Echelles
        </div>
    )
}

export default ScaleContainer
