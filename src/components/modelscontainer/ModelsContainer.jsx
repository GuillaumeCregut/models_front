import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModel } from '../../feature/Model.slice';
import { AwaitLoad } from '../awaitload/AwaitLoad';
import ModelBlock from '../modelblock/ModelBlock';
import FormAddModel from '../formaddmodel/FormAddModel';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ranks from '../../feature/ranks';
import FilterModel from '../filtermodel/FilterModel';

import './ModelsContainer.scss';

const ModelsContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter,setFilter]=useState(null);
    const [newModel, setNewModel]=useState(null);
    const modelData = useSelector((state) => state.models.model)
    const url = `${process.env.REACT_APP_API_URL}model`;
    const dispatch = useDispatch();
    const axiosPrivate=useAxiosPrivate();
    const { auth } = useAuth();
    let rankUser = auth?.rank;
    if (!rankUser)
        rankUser = 0;

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

    useEffect(()=>{
        
    },[filter]);

    return (
        <section className='model-component'>
            <h2 className="model-title">Les modèles</h2>
            <div className="main-model-container">
                
               <FilterModel setFilter={setFilter}/>
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
            </div>
           {rankUser>=ranks.user
           ? <div className="add-model">
                <FormAddModel 
                    setNewModel={setNewModel}
                />
            </div>
            :null}

        </section>
    )
}

export default ModelsContainer
