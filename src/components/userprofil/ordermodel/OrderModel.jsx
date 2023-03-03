
import { useEffect, useRef,useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { setModel } from '../../../feature/Model.slice';

import './OrderModel.scss';
import useAuth from "../../../hooks/useAuth";
import { AwaitLoad } from "../../awaitload/AwaitLoad";

const OrderModel = ({addModel}) => {
    const [price, setPrice]=useState(0.0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFavoriteLoaded,setIsFavoriteLoaded]=useState(false);
    const [favoriteModels,setFavoriteModels]=useState([]);
    const [isPriceOk,setIsPriceOk]=useState(false);
    const qttyRef=useRef();
    const modelData = useSelector((state) => state.models.model)
    const axiosPrivate=useAxiosPrivate();
    const dispatch = useDispatch();
    const { auth } = useAuth();
    let idUser=auth?.id;
    if(!idUser){
        idUser=0;
    }

    useEffect(()=>{
        const getFavorites=()=>{
            const url = `${process.env.REACT_APP_API_URL}model/favorite/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp)=>{
                    setFavoriteModels(resp.data)
                    setIsFavoriteLoaded(true);
                })
                .catch((err)=>{
                    console.error(err);
                })
        }
        getFavorites();
    },[]);

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
    useEffect(()=>{
        setIsPriceOk(!isNaN(price))
    },[price]);

    const handleClik=()=>{
        if(isPriceOk&&qttyRef.current.value!==0){
            const item={
                qtty:qttyRef.current.value,
                idModel:1,
                price:price
            }
            addModel(item)
        }
    }
    return (
        <div>
            Liste des modèles favoris
            <div className="order-model-favorite">
            {isFavoriteLoaded
            ?favoriteModels.map((item)=>(
                <p key={item.id}>{item.modelName}</p>
            ))
            :<AwaitLoad />}
            </div>
            Liste des modèles
            <div className="order-model-all-models">
                {isLoaded
                ?modelData.map((model)=>(
                    <p key={model.id}>{model.name}</p>
                ))
                :null}
            </div>
            <label htmlFor="price">Prix :
            <input type="text"  id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/></label>
            <label htmlFor="qtty">Quantité :
            <input type="number"  id="qtty" ref={qttyRef} /></label>
            <button onClick={handleClik}>Ajouter</button>
        </div>
    )
}

export default OrderModel
