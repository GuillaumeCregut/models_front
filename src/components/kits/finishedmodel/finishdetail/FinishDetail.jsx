import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { AwaitLoad } from '../../../awaitload/AwaitLoad';

import './FinishDetail.scss';

const FinishDetail = ({ model }) => {
    const [modelDetail, setModelDetail] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const urlDetail = `${process.env.REACT_APP_URL}`;
    useEffect(() => {
        const getInfos = () => {
            const url = `${process.env.REACT_APP_API_URL}model/info/${model}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setModelDetail(resp.data);
                    console.log(url)
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        getInfos();
    }, [model]);

    return (
        <div>
            {
                isLoaded
                    ? (<div className="detail-container">
                        <div className='detail-zone'>
                            <div className="detailk-kit">
                                <h3>{modelDetail.builderName} {modelDetail.modelName}</h3>
                                <p>Période : {modelDetail.periodName} </p>
                                <p>Catégorie : {modelDetail.categoryName}</p>
                                <p>{modelDetail.brandName} - {modelDetail.scaleName} - {modelDetail.reference}</p>
                                {modelDetail.picture?<p><img src={`${urlDetail}${modelDetail.picture}`} alt={modelDetail.modelName} className="detail-img"/></p>:null}
                                {modelDetail.scalemates ? <a href={modelDetail.scalemates} no-referrer no-opener target='_blank'>Lien scalemates</a> : null}
                            </div>
                            {modelDetail.providerName
                                ? (<div className="detail-order">
                                    <p>Fournisseur  : {modelDetail.providerName}</p>
                                    <p>Prix d'achat : {modelDetail.price}</p>
                                </div>)
                                : null}
                            <div className="picturebox">
                                {
                                    modelDetail.pictures
                                    ?<p>Images en stock</p>
                                    :<p>Pas d'image en stock</p>
                                }
                            </div>
                        </div>
                    </div>)
                    : <AwaitLoad />
            }
        </div>
    )
}

export default FinishDetail

/*
{
 
    "provider": null,
    "pictures": null, 
    "price": null, -
    "modelName": "Photo Paris 2",-
    "picture": "uploads\\models\\20220729_020348.jpg",-
    "reference": "référence", -
    "scalemates": null, -
    "brandName": "Special Hobby", -
    "periodName": "WWII", -
    "scaleName": "1/24", -
    "builderName": "Focke Wulf", -
    "categoryName": "Véhicules", -
    "providerName": null -
}
*/