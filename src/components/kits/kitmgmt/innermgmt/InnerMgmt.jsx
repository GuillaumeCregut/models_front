import { useReducer, } from 'react';
import { dragReducer } from '../../../../reducers/dragReducer';
import KitCard from '../kitcard/KitCard';


import './InnerMgmt.scss';

const InnerMgmt = ({ orderedModels, likedModels, workbenchModels, finishedModels, stockModels }) => {
    console.log(likedModels);
    const [state, dispatch] = useReducer(dragReducer, {
        ordered: orderedModels,
        liked: likedModels,
        workbench:workbenchModels,
        finished:finishedModels,
        stocked:stockModels,
    });
    console.log(state)

    return (
        <div className='inner-management-container'>
            <div className='drop-container'>
                <p>Modèle likés</p>
                <ul>
                    {state.liked.map((item) => (
                        <li key={item.id}><KitCard kitDetails={item} /></li>
                    ))}
                </ul>
            </div>
            <div className='drop-container'>
                <p>Modèle en stock</p>
                <ul>
                    {state.stocked.map((item) => (
                        <li key={item.id}><KitCard kitDetails={item} /></li>
                    ))}
                </ul>
            </div>
            <div className='drop-container'>
                <p>Modèle commandés</p>
                <ul>
                    {state.ordered.map((item) => (
                        <li key={item.id}><KitCard kitDetails={item} /></li>
                    ))}
                </ul>
            </div>
            <div className='drop-container'>
                <p>Modèle en cours</p>
                <ul>
                    {state.workbench.map((item) => (
                        <li key={item.id}><KitCard kitDetails={item} /></li>
                    ))}
                </ul>
            </div>
            <div className='drop-container'>
                <p>Modèle terminés</p>
                <ul>
                    {state.finished.map((item) => (
                        <li key={item.id}><KitCard kitDetails={item} /></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default InnerMgmt
