import { useRef, useState } from "react";
import BrandSelector from "../selectors/brandselector/BrandSelector";
import BuilderSelector from "../selectors/builderselector/BuilderSelector";
import CategorySelector from "../selectors/categoryselector/CategorySelector";
import PeriodSelector from "../selectors/periodSelector/PeriodSelector";
import ScaleSelector from "../selectors/scaleselector/ScaleSelector";


const FormAddModel = ({ setNewModel }) => {
    const [selectedScale, setSelectedScale] = useState(0);
    const [selectedBuilder, setSelectedBuilder] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState(0);
    const [selectedCateogry, setSelectedCategory] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState(0);
    const nameRef = useRef();
    const refRef = useRef();
    const linkRef = useRef();
    //Prévoir le fichier photo

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h2>Ajouter un modèle</h2>
            <form onSubmit={handleSubmit} className='form-add-model' encType="multipart/form-data">
                <label htmlFor="new-name">Nom du modèle :
                    <input type="text" id="new-name" ref={nameRef} />
                </label>
                <label htmlFor="new-reference">Référence :
                    <input type="text" id="new-reference" ref={refRef} />
                </label>
                <label htmlFor="new-brand">Marque du kit :
                    <BrandSelector
                        id='new-brand'
                        selectedBrand={selectedBrand}
                        setSelectedBrand={setSelectedBrand}
                    />
                </label>
                <label htmlFor="new-builder">Constructeur :
                    <BuilderSelector
                        id='new-builder'
                        selectedBuilder={selectedBuilder}
                         setSelectedBuilder={setSelectedBuilder}
                    />
                </label>
                <label htmlFor="new-scale">Echelle :
                    <ScaleSelector
                        id='new-scale'
                        selectedScale={selectedScale}
                        setSelectedScale={setSelectedScale}
                    />
                </label>
                <label htmlFor="new-category">Catégorie :
                    <CategorySelector
                        id='new-category'
                        selectedCateogry={selectedCateogry}
                        setSlectedCategory={setSelectedCategory}
                    />
                </label>
                <label htmlFor="new-period">Période :
                    <PeriodSelector
                        id='new-period'
                        selectedPeriod={selectedPeriod}
                        setSlectedPeriod={setSelectedPeriod}
                    />
                </label>
                <label htmlFor="new-picture">Photo</label>
            </form>

        </div>
    )
}

export default FormAddModel
