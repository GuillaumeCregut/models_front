import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModel } from '../../feature/Model.slice';
import { AwaitLoad } from '../awaitload/AwaitLoad';
import CountrySelector from '../selectors/countryselector/CountrySelector';
import ModelBlock from '../modelblock/ModelBlock';
import BrandSelector from '../selectors/brandselector/BrandSelector';
import CategorySelector from '../selectors/categoryselector/CategorySelector';
import PeriodSelector from '../selectors/periodSelector/PeriodSelector';
import ScaleSelector from '../selectors/scaleselector/ScaleSelector';
import BuilderSelector from '../selectors/builderselector/BuilderSelector';
import FormAddModel from '../formaddmodel/FormAddModel';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ranks from '../../feature/ranks';

import './ModelsContainer.scss';

const ModelsContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState(0);
    const [selectedScale, setSelectedScale] = useState(0);
    const [selectedBuilder,setSelectedBuiler]=useState(0);
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

    return (
        <section className='model-component'>
            <h2 className="model-title">Les modèles</h2>
            <div className="main-model-container">
                <div className="filter-models">
                    <p>Filtrage des modèles</p>
                    <p>par catégorie
                        <CategorySelector
                            id="category-select"
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </p>
                    <p>par échelle
                        <ScaleSelector
                            selectedScale={selectedScale}
                            setSelectedScale={setSelectedScale}
                            id='scale-selector'
                        />
                    </p>
                    <p>par période
                        <PeriodSelector
                            id="period-selector"
                            selectedPeriod={selectedPeriod}
                            setSelectedPeriod={setSelectedPeriod}
                        />
                    </p>
                    <p>par constructeur
                        <BuilderSelector 
                            id='builder-selector'
                            selectedBuilder={selectedBuilder}
                            setSelectedBuiler={setSelectedBuiler}

                        />    
                    </p>
                    <p>par fabriquant
                        <BrandSelector
                            id="brand-selector"
                            selectedBrand={selectedBrand}
                            setSelectedBrand={setSelectedBrand}
                        />
                    </p>
                    <p>par pays
                        <CountrySelector
                            id="country-selector"
                            setSelectedCountry={setSelectedCountry}
                            selectedCountry={selectedCountry}
                        />
                    </p>
                    par nom
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
