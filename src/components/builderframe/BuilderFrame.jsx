import {useState} from 'react';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';

import './BuilderFrame.scss';

const BuilderFrame = ({builder}) => {
    const [displayModifier, setDisplayModifier] = useState(false)

    const handleDelete=()=>{

    }

    const handleUpdate=()=>{
        setDisplayModifier(!displayModifier)
    }

    return (
        <div className='builderElement'>
           <h3> {builder.name}</h3> 
           <p>{builder.countryName}</p>
           {displayModifier
           ?null
           :null
           }
            <UpDateRemoveBtn 
          updateAction={handleUpdate}
          deleteAction={handleDelete}
        />
        </div>
    )
}

export default BuilderFrame
