import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FileUploader from '../fileuploader/FileUploader';

import './KitDetails.scss';

const KitDetails = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [modelDetail, setModelDetail] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError,setIsError]=useState(false);
    const urlDetail = `${process.env.REACT_APP_URL}`;
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser) {
        idUser = 0;
    }

    useEffect(() => {
        const getModel = () => {
            const url = `${process.env.REACT_APP_API_URL}model/info/${id}/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                   setModelDetail(resp.data);
                   setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                    setIsError(true);
                })
        }
        getModel();
    }, []);

    const handleFiles=(files)=>{
        console.log(files)
    }

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
                            <FileUploader
                            label='Téléchargement'
                            updateFilesCb ={handleFiles}
                            multiple={true}
                            maxFile={4}
                            />
                        </div>
                    </div>)
                    : isError?(<p>Vous n'êtes pas autoriser à voir ce contenu. Contactez l'administrateur du site</p>):
                    <AwaitLoad />
            }
           <p> <Link to="/kits/finis">Retour à la page précédente</Link></p>
        </div>
    )
}

export default KitDetails
