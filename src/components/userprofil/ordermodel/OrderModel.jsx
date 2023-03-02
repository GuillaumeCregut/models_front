import { useEffect, useRef,useState } from "react";


const OrderModel = ({addModel}) => {
    const [price, setPrice]=useState(0.0);
    const [isPriceOk,setIsPriceOk]=useState(false);
    const qttyRef=useRef();

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
            Liste des modèles
            <label htmlFor="price">Prix :
            <input type="text"  id="price" value={price} onChange={(e)=>setPrice(e.target.value)}/></label>
            <label htmlFor="qtty">Quantité :
            <input type="number"  id="qtty" ref={qttyRef} /></label>
            <button onClick={handleClik}>Ajouter</button>
        </div>
    )
}

export default OrderModel
