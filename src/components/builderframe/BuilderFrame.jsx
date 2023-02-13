import React from 'react'

import './BuilderFrame.scss';

const BuilderFrame = ({builder}) => {
    return (
        <div className='builderElement'>
            {builder.name} - {builder.countryName}
        </div>
    )
}

export default BuilderFrame
