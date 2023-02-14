import React from 'react'

import './ModelBlock.scss';

const ModelBlock = ({model}) => {
    const url = `${process.env.REACT_APP_URL}`;
    return (
        <article className='model-block'>
            {model.name}   {model.picture
            ?<img src={ `${url}${model.picture}`} alt="" className='model-picture'/>
           
            :null}
        </article>
    )
}

export default ModelBlock
