import {useState} from 'react';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';
import {  updateBuilder,  deleteBuilder } from '../../feature/Builder.slice';
import { useDispatch } from 'react-redux';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import './BuilderFrame.scss';
import BuilderModifier from './BuilderModifier';

const BuilderFrame = ({builder}) => {
    const [displayModifier, setDisplayModifier] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const url = `${process.env.REACT_APP_API_URL}builder/${builder.id}`;

    const handleDelete=()=>{
        console.log(url);
        //axiosPrivate.delete(url)
    }

    const handleUpdateShow=()=>{
        setDisplayModifier(!displayModifier)
    }

    const handleUpdate=(item)=>{
        //Update store and BDD
        console.log(item);
        //Close modif zone
        setDisplayModifier(false);
    }
    return (
        <div className='builderElement'>
           <h3> {builder.name}</h3> 
           <p>{builder.countryName}</p>
           {displayModifier
           ?<BuilderModifier 
                id={builder.id}
                name={builder.name}
                country={builder.countryId}
                action={handleUpdate}
                hide={setDisplayModifier}
           />
           :null
           }
            <UpDateRemoveBtn 
          updateAction={handleUpdateShow}
          deleteAction={handleDelete}
        />
        </div>
    )
}

export default BuilderFrame
