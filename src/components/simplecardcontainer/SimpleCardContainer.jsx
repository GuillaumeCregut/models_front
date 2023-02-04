import { useState } from 'react';
import './SimpleCardContainer.scss';


export const SimpleCardContainer = ({item, kind}) => {
  const [displayBack,setDisplayBack]=useState(false)

  return (
   <div  className="container-Card">
  
           <div className='flip-card-front'>
                 {item.name}
            </div>
            <div className='flip-card-back'>
                {kind}
            </div>
    </div>
  )
}