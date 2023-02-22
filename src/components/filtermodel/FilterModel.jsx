import React, { useRef, useState } from 'react'
import CountrySelector from '../selectors/countryselector/CountrySelector';
import BrandSelector from '../selectors/brandselector/BrandSelector';
import CategorySelector from '../selectors/categoryselector/CategorySelector';
import PeriodSelector from '../selectors/periodSelector/PeriodSelector';
import ScaleSelector from '../selectors/scaleselector/ScaleSelector';
import BuilderSelector from '../selectors/builderselector/BuilderSelector';


const FilterModel = ({setFilter}) => {
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState(0);
    const [selectedScale, setSelectedScale] = useState(0);
    const [selectedBuilder, setSelectedBuilder] = useState(0);

    const refName=useRef();

    const handleFilter = () => {
        const newFilter={};
        if  (parseInt(selectedCountry)!==0)
            newFilter.countryId=parseInt(selectedCountry);
        if(parseInt(selectedBrand)!==0)
            newFilter.brand=parseInt(selectedBrand);
        if(parseInt(selectedCategory)!==0)
            newFilter.category=parseInt(selectedCategory);
        if(parseInt(selectedScale)!==0)
            newFilter.scale= parseInt(selectedScale);
        if(parseInt(selectedBuilder)!==0)
            newFilter.builder= parseInt(selectedBuilder);
        if(parseInt(selectedPeriod)!==0)
            newFilter.period= parseInt(selectedPeriod);
        if(refName.current.value!=='')
            newFilter.name= refName.current.value
        setFilter(newFilter);
    }


    return (
        <div className="filter-models">
            <p>Filtrage des modèles</p>
            <div className="filter-list">
                <label htmlFor="category-select">par catégorie
                    <CategorySelector
                        id="category-select"
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </label>

                <label htmlFor="scale-selector">par échelle
                    <ScaleSelector
                        selectedScale={selectedScale}
                        setSelectedScale={setSelectedScale}
                        id='scale-selector'
                    />
                </label>

                <label htmlFor="period-selector">par période
                    <PeriodSelector
                        id="period-selector"
                        selectedPeriod={selectedPeriod}
                        setSelectedPeriod={setSelectedPeriod}
                    />
                </label>

                <label htmlFor="builder-selector">par constructeur
                    <BuilderSelector
                        id='builder-selector'
                        selectedBuilder={selectedBuilder}
                        setSelectedBuilder={setSelectedBuilder}

                    />
                </label>

                <label htmlFor="brand-selector">par fabriquant
                    <BrandSelector
                        id="brand-selector"
                        selectedBrand={selectedBrand}
                        setSelectedBrand={setSelectedBrand}
                    />
                </label>

                <label htmlFor="country-selector">par pays
                    <CountrySelector
                        id="country-selector"
                        setSelectedCountry={setSelectedCountry}
                        selectedCountry={selectedCountry}
                    />
                </label>

                <label htmlFor="model-name">par nom
                <input type="text" id="model-name"  ref={refName}/>
                </label>
            </div>
            <button onClick={handleFilter}>Trier</button>
        </div>
    )
}

export default FilterModel
