import { useState } from 'react';
import './SimpleCardContainer.scss';


export const SimpleCardContainer = ({item, kind}) => {
  const [displayBack,setDisplayBack]=useState(false)

  const turnCard=()=>{
    setDisplayBack(!displayBack);
  }
  
  return (
    <article className="flip-card" onClick={turnCard}>
        <div className={displayBack? "flip-card-inner  flip-card-inner-down":"flip-card-inner"}>
            <div className="flip-card-front">
                 {item.name}
            </div>
            <div className="flip-card-back">
                {kind}
            </div>
        </div>
    </article>
    
  )
}
