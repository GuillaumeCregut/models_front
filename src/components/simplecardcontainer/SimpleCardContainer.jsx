import { useState } from 'react';
import './SimpleCardContainer.scss';


export const SimpleCardContainer = ({ item, kind }) => {
  const [displayModifier, setDisplayModifier] = useState(false)

  return (
    <div className="container-Card">
     <h3 className='card-title'>{item.name}</h3> 
     {displayModifier?
     <p>Modifie</p>
     :null}
     <div className="btn-container">
      <button onClick={()=>setDisplayModifier(!displayModifier)}>Modifier</button>
      <button>Supprimer</button>
     </div>
    </div>
  )
}