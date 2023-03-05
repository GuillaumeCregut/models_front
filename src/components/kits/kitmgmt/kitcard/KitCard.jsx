
import './KitCard.scss';

const KitCard = ({kitDetails}) => {
    console.log(kitDetails);
    const url = `${process.env.REACT_APP_URL}`;
    const handleClick=()=>{
        alert('toto')
    }

    return (
        <div className='kit-card'  onClick={handleClick}>
            <h4>{kitDetails.modelName}</h4>
            <img src={`${url}${kitDetails.boxPicture}`} alt={kitDetails.modelName}/>
            <p>{kitDetails.brandName} - {kitDetails.scaleName} </p>
            <p>Référence : {kitDetails.reference} </p>
        </div>
    )
}

export default KitCard
