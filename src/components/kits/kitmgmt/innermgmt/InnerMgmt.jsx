import { useReducer, useCallback } from 'react';
import { dragReducer } from '../../../../reducers/dragReducer';
import KitCard from '../kitcard/KitCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './InnerMgmt.scss';

const InnerMgmt = ({ orderedModels, likedModels, workbenchModels, finishedModels, stockModels }) => {
    const [state, dispatch] = useReducer(dragReducer, {
        ordered: orderedModels,
        liked: likedModels,
        workbench: workbenchModels,
        finished: finishedModels,
        stocked: stockModels,
    });

    const handleDragEnd = useCallback((result) => {
        if (result.reason === 'DROP') {
            if (!result.destination) {
                return
            }
            console.log(result)
            dispatch({
                type: 'MOVE',
                from: result.source.droppableId,
                to: result.destination.droppableId,
                fromIndex: result.source.index,
                toIndex: result.destination.index,
                itemId: result.draggableId,
            })
        }
    }, []);

    return (
        <div className='inner-management-container'>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='drop-container'>
                    <p>Modèle likés</p>
                    <Droppable droppableId='liked' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className={snapshot.isDraggingOver?'dropzone dropOK':'dropzone'}>
                                    {state.liked.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided,snapshot)=>{ //snapshot should be use for style
                                                    return(
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging?'line moving':'line'}>
                                                    <KitCard kitDetails={item} />
                                                </li>
                                                )
                                            }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p>Modèle en stock</p>
                    <Droppable droppableId='stocked' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef}  className={snapshot.isDraggingOver?'dropzone dropOK':'dropzone'}>
                                    {state.stocked.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided,snapshot)=>{ //snapshot should be use for style
                                                    return(
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging?'line moving':'line'}>
                                                    <KitCard kitDetails={item} />
                                                </li>
                                                )
                                            }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p>Modèle commandés</p>
                    <Droppable droppableId='ordered' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef}  className={snapshot.isDraggingOver?'dropzone dropOK':'dropzone'}>
                                    {state.ordered.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided,snapshot)=>{ //snapshot should be use for style
                                                    return(
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging?'line moving':'line'}>
                                                    <KitCard kitDetails={item} />
                                                </li>
                                                )
                                            }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p>Modèle en cours</p>
                    <Droppable droppableId='workbench' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef}  className={snapshot.isDraggingOver?'dropzone dropOK':'dropzone'}>
                                    {state.workbench.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided,snapshot)=>{ //snapshot should be use for style
                                                    return(
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging?'line moving':'line'}>
                                                    <KitCard kitDetails={item} />
                                                </li>
                                                )
                                            }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
                <div className='drop-container'>
                    <p>Modèle terminés</p>
                    <Droppable droppableId='finished' type="PERSON">
                        {(provided, snapshot) => {
                            return (
                                <ul {...provided.droppableProps} ref={provided.innerRef}  className={snapshot.isDraggingOver?'dropzone dropOK':'dropzone'}>
                                    {state.finished.map((item, index) => {
                                        return (
                                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                                {(provided,snapshot)=>{ //snapshot should be use for style
                                                    return(
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={snapshot.isDragging?'line moving':'line'}>
                                                    <KitCard kitDetails={item} />
                                                </li>
                                                )
                                            }}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )
                        }}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export default InnerMgmt
