import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SimpleCardContainer.scss';


export const SimpleCardContainer = ({ item, wrapper }) => {
  const [displayModifier, setDisplayModifier] = useState(false)
  const dispatch=useDispatch();
  const{deleteAction, updateAction, kind,url}=wrapper;
  const urlApi=`${url}/${item.id}`;

  const handleDelete=()=>{
    if(window.confirm(`Voulez vous supprimer ${kind} ${item.name} ?`)){
        axios
          .delete(urlApi)
          .then(()=>{
            dispatch(deleteAction(item.id))
          })
          .catch((err)=>{
            if(err.response.status===404){
              console.log('pas trouvé')
            }
            if(err.response.status<404){
              alert("Vous n'êtes pas autoriser à supprimer")
            }
          })
    }
  }

  return (
    <div className="container-Card">
     <h3 className='card-title'>{item.name}</h3> 
     {displayModifier?
     <p>Modifie</p>
     :null}
     <div className="btn-container">
      <button onClick={()=>setDisplayModifier(!displayModifier)}>Modifier</button>
      <button onClick={handleDelete}>Supprimer</button>
     </div>
    </div>
  )
}