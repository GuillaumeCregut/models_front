import { useState } from 'react';
import { useDispatch } from 'react-redux';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';
import { ModifierCard } from './ModifierCard';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import './SimpleCardContainer.scss';


export const SimpleCardContainer = ({ item, wrapper }) => {
  const [displayModifier, setDisplayModifier] = useState(false)
  const dispatch = useDispatch();
  const { deleteAction, updateAction, kind, url } = wrapper;
  const urlApi = `${url}/${item.id}`;
  const axiosPrivate=useAxiosPrivate();
  const handleDelete = () => {
    if (window.confirm(`Voulez vous supprimer ${kind} ${item.name} ?`)) {
      axiosPrivate
        .delete(urlApi)
        .then(() => {
          dispatch(deleteAction(item.id))
        })
        .catch((err) => {
          if (err.response.status === 404) {
            alert("L'élément n'existe pas")
          }
          if (err.response.status < 404) {
            alert("Vous n'êtes pas autoriser à supprimer")
          }
          if (err.response.status === 500) {
            alert("Une erreur serveur est survenue")
          }
        })
    }
  }
  const handleUpdate=()=>{
    setDisplayModifier(!displayModifier)
  }

  return (
    <div className="container-Card">
      <h3 className='card-title'>{item.name}</h3>
      {displayModifier ?
        <ModifierCard
          id={item.id}
          name={item.name}
          url={urlApi}
          action={updateAction}
          hide={setDisplayModifier}
        />
        : null}
        <UpDateRemoveBtn 
          updateAction={handleUpdate}
          deleteAction={handleDelete}
        />
      {/* <div className="btn-container">
        <button onClick={() => setDisplayModifier(!displayModifier)}>Modifier</button>
        <button onClick={handleDelete}>Supprimer</button>
      </div> */}
    </div>
  )
}