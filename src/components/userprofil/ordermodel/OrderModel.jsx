
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { setModel } from '../../../feature/Model.slice';

import useAuth from "../../../hooks/useAuth";
import { AwaitLoad } from "../../awaitload/AwaitLoad";

import './OrderModel.scss';

const OrderModel = ({ addModel }) => {
    const [price, setPrice] = useState(0.0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFavoriteLoaded, setIsFavoriteLoaded] = useState(false);
    const [favoriteModels, setFavoriteModels] = useState([]);
    const [isPriceOk, setIsPriceOk] = useState(false);
    const [selectedModel,setSelectedModel]=useState(0);
    const [filteredModel,setFilteredModel]=useState([]);
    const [filter,setFilter]=useState('');
    const qttyRef = useRef();
    const modelData = useSelector((state) => state.models.model)
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser) {
        idUser = 0;
    }

    useEffect(()=>{
        if(filter===''){
            setFilteredModel([...modelData]);
        }
        else{
            const newArray=modelData.includes((item)=>item.name=filter);
            setFilteredModel([...newArray])
        }
    },[filter])

    useEffect(() => {
        const getFavorites = () => {
            const url = `${process.env.REACT_APP_API_URL}model/favorite/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setFavoriteModels(resp.data)
                    setIsFavoriteLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        getFavorites();
    }, []);

    useEffect(() => {
        const getModels = async () => {
            const url = `${process.env.REACT_APP_API_URL}model`;
            await axiosPrivate
                .get(url)
                .then((resp) => {
                    dispatch(setModel(resp.data));
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        if (!modelData) {
            getModels();
        }
        else
            setIsLoaded(true);
    }, []);

    useEffect(() => {
        setIsPriceOk(!isNaN(price))
    }, [price]);

    const handleClik = () => {
        if (isPriceOk && qttyRef.current.value !== 0) {
            const selectedModelItem=modelData.find((item)=>item.id===selectedModel);
            const item = {
                qtty: qttyRef.current.value,
                idModel: selectedModel,
                price: price,
                name:selectedModelItem.name,
                brand: selectedModelItem.brandName,
                scale : selectedModelItem.scaleName,
                builder : selectedModelItem.builderName
            }
            console.log(item)
            addModel(item)
        }
    }
   
    const changeModel=(e)=>{
        console.log(e.target.value)
        setSelectedModel(parseInt(e.target.value));
    } 

    return (
        <div className="order-model-container">
            <div className="order-model-list-container">
                <div className="order-model-favorite">
                Liste des modèles favoris
                    {isFavoriteLoaded
                        ? favoriteModels.map((item) => (
                            <p key={item.id}> <input
                                                 type="radio" 
                                                 name="model" 
                                                 value={item.modelId} 
                                                 checked={selectedModel===item.modelId} 
                                                 onChange={changeModel}/>
                                {item.modelName}</p>
                        ))
                        : <AwaitLoad />}
                </div>
                <div className="order-model-all-models">
                    Liste des modèles
                    {isLoaded
                        ? filteredModel.map((model) => (
                            <p key={model.id}><input 
                                                type="radio" 
                                                name="model" 
                                                value={model.id} 
                                                checked={selectedModel===model.id} 
                                                onClick={changeModel}
                            />{model.name}</p>
                        ))
                        : null}
                </div>
            </div>
                <label htmlFor="price">Prix :
                    <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} /></label>
                <label htmlFor="qtty">Quantité :
                    <input type="number" id="qtty" ref={qttyRef} min="1" /></label>
                <button onClick={handleClik}>Ajouter</button>
        </div>
    )
}

export default OrderModel
