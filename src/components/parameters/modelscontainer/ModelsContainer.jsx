import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModel } from '../../../feature/Model.slice';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import ModelBlock from '../modelblock/ModelBlock';
import FormAddModel from '../formaddmodel/FormAddModel';
import useAuth from '../../../hooks/useAuth';
import ranks from '../../../feature/ranks';
import FilterModel from '../filtermodel/FilterModel';

import './ModelsContainer.scss';

const ModelsContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter, setFilter] = useState({});
    const [modelsFiltered, setModelsFiltered] = useState([]);
    const modelData = useSelector((state) => state.models.model)
    const url = `${process.env.REACT_APP_API_URL}model`;
    const dispatch = useDispatch();
    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;

    useEffect(() => {
        const getModels = async () => {
            await axios
                .get(url)
                .then((resp) => {
                    dispatch(setModel(resp.data));
                    setModelsFiltered(resp.data)
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
            setModelsFiltered([...modelData]);
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const temp = modelData.filter((item) => {
                if (filter) {
                    for (const property in filter) {
                        if (property === 'name' && item.name.toLowerCase().includes(filter[property].toLowerCase()))
                            return true;
                        if (filter[property] !== item[property])
                            return false
                    }
                    return true;
                }
                else
                    return true;
            })
            setModelsFiltered([...temp]);
        }

    }, [filter, modelData]);

    return (
        <section className='model-component'>
            <h2 className="model-title">Les modèles</h2>
            <div className="main-model-container">

                <FilterModel setFilter={setFilter} />
                <div className="model-container">
                    {isLoaded
                        ? modelsFiltered.map((item) => (
                            <ModelBlock
                                key={item.id}
                                model={item}
                            // showModal={setModal}
                            />
                        )
                        )
                        : <AwaitLoad />}
                </div>
            </div>
            {rankUser >= ranks.user
                ? <div className="add-model">
                    <FormAddModel />
                </div>
                : null}

        </section>
    )
}

export default ModelsContainer