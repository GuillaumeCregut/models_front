import { useEffect, useRef, useState } from "react";
import { FileDrop } from 'react-file-drop';
import useAxiosPrivateMulti from '../../hooks/useAxiosMulti';
import BrandSelector from "../selectors/brandselector/BrandSelector";
import BuilderSelector from "../selectors/builderselector/BuilderSelector";
import CategorySelector from "../selectors/categoryselector/CategorySelector";
import PeriodSelector from "../selectors/periodSelector/PeriodSelector";
import ScaleSelector from "../selectors/scaleselector/ScaleSelector";
import { useDispatch } from 'react-redux';
import {addModel } from '../../feature/Model.slice';

import './FormAddModel.scss';

const FormAddModel = () => {
    const [selectedScale, setSelectedScale] = useState(0);
    const [selectedBuilder, setSelectedBuilder] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState(0);
    const [fileUpload, setFileUpload]=useState(null);
    const [urlImage,setUrlImage]=useState('');
    const nameRef = useRef();
    const refRef = useRef();
    const linkRef = useRef();
    const axiosPrivate = useAxiosPrivateMulti();
    const dispatch=useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const url=`${process.env.REACT_APP_API_URL}model`;
        if ((parseInt(selectedBrand) !== 0) && (parseInt(selectedBuilder) !== 0) && (parseInt(selectedScale) !== 0) && (parseInt(selectedCategory) !== 0) && (parseInt(selectedPeriod) !== 0) && (nameRef.current.value !== '') && (refRef.current.value !== '')) {
            const formData=new FormData();
            formData.append('file',fileUpload);
            formData.append('name',nameRef.current.value);
            formData.append('reference',refRef.current.value);
            formData.append('brand',selectedBrand);
            formData.append('builder',selectedBuilder);
            formData.append('scale',selectedScale);
            formData.append('category',selectedCategory);
            formData.append('period',selectedPeriod);
            formData.append('scalemates',linkRef.current.value);
            axiosPrivate
                .post(url,formData)
                .then((resp)=>{
                    dispatch(addModel(resp.data));
                })
                .catch((err)=>{
                    console.error(err);
                })
        }

    }

    useEffect(()=>{
        if(fileUpload){
            const img = URL.createObjectURL(fileUpload) 
            setUrlImage(img)
        }
  
    },[fileUpload])
    return (
        <div className="form-add-model-container">
            <h2>Ajouter un modèle</h2>
            <form onSubmit={handleSubmit} className='form-add-model' encType="multipart/form-data">
                <label htmlFor="new-name">Nom du modèle :
                    <input
                        type="text"
                        id="new-name"
                        ref={nameRef}
                        className='add-model-form-input'
                        autoComplete="off"
                        required
                    />
                </label>
                <label htmlFor="new-reference">Référence :
                    <input
                        type="text"
                        id="new-reference"
                        ref={refRef}
                        className='add-model-form-input'
                        autoComplete="off"
                        required
                    />
                </label>
                <label htmlFor="new-brand">Marque du kit :
                    <BrandSelector
                        id='new-brand'
                        selectedBrand={selectedBrand}
                        setSelectedBrand={setSelectedBrand}
                    />
                </label>
                <label htmlFor="new-builder">Constructeur :
                    <BuilderSelector
                        id='new-builder'
                        selectedBuilder={selectedBuilder}
                        setSelectedBuilder={setSelectedBuilder}
                    />
                </label>
                <label htmlFor="new-scale">Echelle :
                    <ScaleSelector
                        id='new-scale'
                        selectedScale={selectedScale}
                        setSelectedScale={setSelectedScale}
                    />
                </label>
                <label htmlFor="new-category">Catégorie :
                    <CategorySelector
                        id='new-category'
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </label>
                <label htmlFor="new-period">Période :
                    <PeriodSelector
                        id='new-period'
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={setSelectedPeriod}
                    />
                </label>
                <label htmlFor="new-reference">Lien scalemates :
                    <input
                        type="text"
                        id="new-reference"
                        ref={linkRef}
                        className='add-model-form-input'
                        autoComplete="off"
                    />
                </label>
                <label htmlFor="new-picture">Photo</label>
                <div className="drop-zone-file">
                    <FileDrop
                    onDrop={(files, event) => {
                        setFileUpload(files[0]);
                    }}
                    
                    > {fileUpload
                        ?<img src={urlImage} alt={fileUpload.name} className='form-add-model-img'/>
                        :'Glisser la photo'}</FileDrop>
                    
                </div>
                <button>Ajouter</button>
            </form>
        </div>
    )
}

export default FormAddModel
