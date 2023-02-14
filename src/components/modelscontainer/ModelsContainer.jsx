import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModel } from '../../feature/Model.slice';
import { AwaitLoad } from '../awaitload/AwaitLoad';
import CountrySelector from '../selectors/countryselector/CountrySelector';
import ModelBlock from '../modelblock/ModelBlock';
import './ModelsContainer.scss';
import BrandSelector from '../selectors/brandselector/BrandSelector';
import CategorySelector from '../selectors/categoryselector/CategorySelector';

const ModelsContainer = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState(1);
    const [selectedCategory, setSelectedCategory]=useState(1);
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
                    par échelle
                    par période
                    par constructeur
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
            <div className="add-model">
                <h2>Ajouter un modèle</h2>
            </div>

        </section>
    )
}

export default ModelsContainer
