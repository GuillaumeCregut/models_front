import {useState} from 'react';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';

import './BuilderFrame.scss';
import BuilderModifier from './BuilderModifier';

const BuilderFrame = ({builder}) => {
    const [displayModifier, setDisplayModifier] = useState(false);

    const handleDelete=()=>{
        console.log(`Supprimer ${builder.id}`)
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
