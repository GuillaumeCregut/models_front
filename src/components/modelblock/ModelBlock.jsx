import React, { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip';
import useAuth from '../../hooks/useAuth';
import UpDateRemoveBtn from '../updateremovebtn/UpDateRemoveBtn';
import ranks from '../../feature/ranks';
import { deleteModel } from '../../feature/Model.slice';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { FileDrop } from 'react-file-drop';
import BrandSelector from '../selectors/brandselector/BrandSelector';
import BuilderSelector from '../selectors/builderselector/BuilderSelector';
import CategorySelector from '../selectors/categoryselector/CategorySelector';
import ScaleSelector from '../selectors/scaleselector/ScaleSelector';
import PeriodSelector from '../selectors/periodSelector/PeriodSelector';

import './ModelBlock.scss';

const ModelBlock = ({ model }) => {
    const url = `${process.env.REACT_APP_URL}`;
    const [displayBack, setDisplayBack] = useState(false);
    const [showModal, setShowModal] = useState(false);
    ////
    const [selectedBrand, setSelectedBrand] = useState(model.brand);
    const [selectedCategory, setSelectedCategory] = useState(model.category);
    const [selectedPeriod, setSelectedPeriod] = useState(model.period);
    const [selectedScale, setSelectedScale] = useState(model.scale);
    const [selectedBuilder, setSelectedBuilder] = useState(model.builder);
    const [fileUpload, setFileUpload] = useState(null);
    const [urlImage, setUrlImage] = useState('');
    ////
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;

    useEffect(() => {
        if (fileUpload) {
            console.log('On passe')
            const img = URL.createObjectURL(fileUpload)
            setUrlImage(img)
        }

    }, [fileUpload])

    const turnCard = () => {
        setDisplayBack(!displayBack);
    }

    const handleModalUpdate = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleUpdate = () => {
        alert('toto')
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
                updateAction={handleModalUpdate} /></div>
            <Modal
                isOpen={showModal}
                className="model-modal"
                onRequestClose={closeModal}>
                <div className="modal-supra">
                    <div className="modal-container">
                        <label htmlFor='brand-mod'>Marque :
                            <BrandSelector
                                id='brand-mod'
                                selectedBrand={selectedBrand}
                                setSelectedBrand={setSelectedBrand} />
                        </label>
                        <label htmlFor='builder-mod'>Constructeur :
                            <BuilderSelector
                                id='builder-mod'
                                selectedBuilder={selectedBuilder}
                                setSelectedBuilder={setSelectedBuilder} />
                        </label>
                        <label htmlFor='cat-mod'>Catégorie :
                            <CategorySelector
                                id='cat-mod'
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory} />
                        </label>
                        <label htmlFor='scale-mod'>Echelle :
                            <ScaleSelector
                                id='scale-mod'
                                selectedScale={selectedScale}
                                setSelectedScale={setSelectedScale} />
                        </label>
                        <label htmlFor='period-mod'>période :
                            <PeriodSelector
                                id='period-mod'
                                selectedPeriod={selectedPeriod}
                                setSelectedPeriod={setSelectedPeriod} />
                        </label>
                        <label htmlFor="">Nom :

                        </label>
                        <label htmlFor="">Référence :

                        </label>
                        <label htmlFor="">Lien scalmates :

                        </label>
                    </div>
                    <div className='modal-dropzone'>
                        <label htmlFor="new-picture">Photo</label>
                        <div className="modal-drop-zone-file">
                            <FileDrop
                                onDrop={(files, event) => {
                                    setFileUpload(files[0]);
                                }}

                            > {fileUpload
                                ? <img src={urlImage} alt={fileUpload.name} className='form-add-model-img' />
                                : 'Glisser la photo'}</FileDrop>

                        </div>
                    </div>
                </div>
                <div className="modal-btn-container">
                    <button onClick={handleUpdate}>Modifier</button>
                    <button onClick={closeModal}>Fermer</button>
                </div>
            </Modal>
        </article>
    )
}

export default ModelBlock
