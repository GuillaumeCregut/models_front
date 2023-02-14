import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {setBuilder} from '../../../feature/Builder.slice';

import './BuilderSelector.scss';

const BuilderSelector = ({id,selectedBuilder, setSelectedBuilder}) => {
    const [builderLoaded, setBuilderLoaded]=useState(false);
    const dispatch=useDispatch();
    const builderData=useSelector((state)=>state.builders.builder);

    useEffect(()=>{
        const getBuilders=async()=>{
            const url = `${process.env.REACT_APP_API_URL}builder`;
            axios
                .get(url)
                .then((resp)=>{
                    dispatch(setBuilder(resp.data));
                    console.log(resp.data);
                    setBuilderLoaded(true);
                })
                .catch((err)=>{
                    console.error(err)
                })
        }
        if(!builderData)
            getBuilders();
        else
            setBuilderLoaded(true);
    },[]);

    return (
        <select
            id={id}
            value={selectedBuilder}
            onChange={(e) => setSelectedBuilder(e.target.value)}
            className='builder-selector'
        >
         {builderLoaded
         ?builderData.map((item)=>(
            <option 
                key={item.id}
                value={item.id}>{item.name}</option>
         ))
        :null
        }   
        </select>
    )
}

export default BuilderSelector
