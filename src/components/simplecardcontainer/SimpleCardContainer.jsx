import './SimpleCardContainer.scss';
export const SimpleCardContainer = ({item, kind}) => {
  return (
    <article className="flip-card">
        <div className="flip-card-inner">
            <div className="flip-card-front">
                 {item.name} id : {item.id}
            </div>
            <div className="flip-card-back">
                {kind}
            </div>
        </div>
    </article>
    
  )
}
