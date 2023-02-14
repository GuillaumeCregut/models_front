import React from 'react'

import './ModelBlock.scss';

const ModelBlock = ({model}) => {
    const url = `${process.env.REACT_APP_URL}`;
    return (
        <div>
            {model.name}   {model.picture?`${url}${model.picture}`:null}
        </div>
    )
}

export default ModelBlock
