import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModel } from '../../feature/Model.slice';
import { AwaitLoad } from '../awaitload/AwaitLoad';
import ModelBlock from '../modelblock/ModelBlock';
import './ModelsContainer.scss';

const ModelsContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const modelData = useSelector((state) => state.models.model)
    const url = `${process.env.REACT_APP_API_URL}model`;
    const dispatch = useDispatch();

    useEffect(() => {
        const getModels = async () => {
            await axios
                .get(url)
                .then((resp) => {
                    console.log(resp.data)
                    dispatch(setModel(resp.data))
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

    return (
        <section className='model-component'>
            <h2 className="model-title">Les modèles</h2>
            <div className="filter-models">
                <p>Filtrage des modèles</p>
                par catégorie
                par échelle
                par période
                par constructeur
                par fabriquant
                par pays
            </div>
            <div className="model-container">
                {isLoaded
                    ? modelData.map((item) => (
                        <ModelBlock
                            key={item.id}
                            model={item}
                        />
                    )
                    )
                    : <AwaitLoad />}
            </div>
            <div className="add-model">
                
            </div>
        </section>
    )
}

export default ModelsContainer
