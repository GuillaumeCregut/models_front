import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip';
import useAuth from '../../hooks/useAuth';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';
import ranks from '../../feature/ranks';
import { deleteModel } from '../../feature/Model.slice';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

import './ModelBlock.scss';

const ModelBlock = ({ model }) => {
    const url = `${process.env.REACT_APP_URL}`;
    const [displayBack, setDisplayBack] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;

    const turnCard = () => {
        setDisplayBack(!displayBack);
    }

    const handleUpdate = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleDelete = () => {
        const urlApi = `${process.env.REACT_APP_API_URL}model/${model.id}`
        if (window.confirm(`Voulez vous supprimer  ${model.name} ?`)) {
            axiosPrivate
                .delete(urlApi)
                .then(() => {
                    dispatch(deleteModel(model.id))
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }
    Modal.setAppElement('#root');
    return (
        <article className='model-block'>
            <div className="model-card-container" onClick={turnCard} >
                <ReactCardFlip isFlipped={displayBack} flipDirection="horizontal" containerClassName="card-settings">
                    <div className='flip-card-front'>
                        {model.picture
                            ? <img src={`${url}${model.picture}`} alt="" className='model-picture' />
                            : null}
                    </div>
                    <div className='flip-card-back'>
                        Constructeur :{model.builderName} <br />
                        Pays : {model.countryName}<br />
                        Catégorie : {model.categoryName}<br />
                        Période : {model.periodName}
                        {model.link
                            ? <p> <a href={model.link} target="_blank" rel='noreferrer'>Lien Scalemates </a></p>
                            : null}
                    </div>
                </ReactCardFlip>
            </div>
            <h3 className='model-card-title'> {model.brandName}<br />
                {model.name}</h3>
            <p className='model-reference'>{model.reference} - {model.scaleName}</p>
            <div className={rankUser === ranks.admin ? "card-btn-container" : ''}><UpDateRemoveBtn
                deleteAction={handleDelete}
                updateAction={handleUpdate} /></div>
            <Modal
                isOpen={showModal}
                className="model-modal"
                onRequestClose={closeModal}>
                <button onClick={closeModal}>close</button>
            </Modal>
        </article>
    )
}

export default ModelBlock
