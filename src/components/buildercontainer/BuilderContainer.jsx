import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BuilderContainer = () => {
    const url = `${process.env.REACT_APP_API_URL}builder`;
    const [builders,setBuilders]=useState([]);

    useEffect(()=>{
        axios
        .get(url)
        .then((res)=>{
            setBuilders(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);
    return (
        <div>
            Constructeurs
            <ul>
                {builders.map((item)=>(
                    <li key={item.id}>{item.name} - {item.countryName}</li>
                ))}
            </ul>
        </div>
    )
}

export default BuilderContainer
