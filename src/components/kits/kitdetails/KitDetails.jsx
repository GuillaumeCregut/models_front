import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import FileUploader from '../fileuploader/FileUploader';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import './KitDetails.scss';


const MAX_FILE_UPLOAD = 4;

const KitDetails = () => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [modelDetail, setModelDetail] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [maxCount, setMaxCount] = useState(0);
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
                    let count = resp.data.pictures?.files.length;
                    if (count) {
                        setMaxCount(count);
                    }
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                    setIsError(true);
                })
        }
        getModel();
    }, []);

    const handleFiles = (files) => {
        console.log(files)
    }

    console.log(maxCount)
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
                                {modelDetail.picture ? <p><img src={`${urlDetail}${modelDetail.picture}`} alt={modelDetail.modelName} className="detail-img" /></p> : null}
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
                                        ? <ul className='picture-container'>
                                            {modelDetail.pictures.files.map((file) => (
                                                <li key={file} className='picture-item'>
                                                    <Zoom>
                                                        <img
                                                            src={`${urlDetail}${modelDetail.pictures.baseFolder}${file}`}
                                                            alt={file}
                                                            className='img-model'
                                                        />
                                                    </Zoom>
                                                </li>
                                            )
                                            )
                                            }
                                        </ul>
                                        : <p>Pas d'image en stock</p>
                                }
                            </div>
                            {maxCount < MAX_FILE_UPLOAD
                                ? <FileUploader
                                    label='Téléchargement'
                                    updateFilesCb={handleFiles}
                                    multiple={true}
                                    maxFile={MAX_FILE_UPLOAD}
                                />
                                : null}
                        </div>
                    </div>)
                    : isError ? (<p>Vous n'êtes pas autoriser à voir ce contenu. Contactez l'administrateur du site</p>) :
                        <AwaitLoad />
            }
            <p> <Link to="/kits/finis">Retour à la page précédente</Link></p>
        </div>
    )
}

export default KitDetails
