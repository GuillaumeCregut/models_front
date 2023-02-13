import React from 'react'

const BuilderFrame = ({builder}) => {
    return (
        <li>
            {builder.name} - {builder.countryName}
        </li>
    )
}

export default BuilderFrame
