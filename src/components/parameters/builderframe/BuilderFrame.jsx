import { useState } from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch } from 'react-redux';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';
import BuilderModifier from './BuilderModifier';
import { updateBuilder, deleteBuilder } from '../../../feature/Builder.slice';
import './BuilderFrame.scss';


const BuilderFrame = ({ builder }) => {
    const [displayModifier, setDisplayModifier] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const url = `${process.env.REACT_APP_API_URL}builder/${builder.id}`;

    const handleDelete = () => {
        axiosPrivate
            .delete(url)
            .then((resp) => {

                dispatch(deleteBuilder(builder.id));
            })
            .catch((err) => {
                console.log(err);
                alert("Vous n'êtes pas autorisé à ajouter un élément.")
            })
    }

    const handleUpdateShow = () => {
        setDisplayModifier(!displayModifier)
    }

    const handleUpdate = (item) => {
        //Update store and BDD
        const addNewBuilder = {
            name: item.name,
            country: item.countryId
        }
        axiosPrivate
        .put(url,addNewBuilder)
        .then((resp) => {
            dispatch(updateBuilder([item,builder.id]));
        })
        .catch((err) => {
            console.log(err);
            if(err.response.status===422){
                alert(`Erreur : ${err.response.data}`)
            }
            else
                alert("Vous n'êtes pas autorisé à ajouter un élément.")
        })
        //Close modif zone
        setDisplayModifier(false);
    }
    return (
        <div className='builderElement'>
            <h3> {builder.name}</h3>
            <p>{builder.countryName}</p>
            {displayModifier
                ? <BuilderModifier
                    id={builder.id}
                    name={builder.name}
                    country={builder.countryId}
                    action={handleUpdate}
                    hide={setDisplayModifier}
                />
                : null
            }
            <UpDateRemoveBtn
                updateAction={handleUpdateShow}
                deleteAction={handleDelete}
            />
        </div>
    )
}

export default BuilderFrame
