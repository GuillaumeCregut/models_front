import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
import { AwaitLoad } from '../../awaitload/AwaitLoad';

import './FinishedModel.scss';

const FinishedModel = () => {
    const [listModel, setListModel] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [display, setDisplay] = useState(false);
    const [idModel,setIdModel]=useState(0);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    let userId = auth.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        const getModelsUSer = () => {
            const url = `${process.env.REACT_APP_API_URL}model/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setListModel(resp.data);
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        getModelsUSer();
    }, []);

    const handleClick = (model) => {
        setIdModel(model);
        setDisplay(true);
    }

    return (
        <div className='finished-models'>
            <div className="finished-top-page">
                <h2>Modèles finis</h2>
                <div className="list-finished-model-container">
                    <ul className='list-finished-model'>
                        {isLoaded
                        ?listModel.filter(item => item.state === 3).map((item) => (
                            <li key={item.id} className='list-finished-item'><Link to={`details/${item.id}`}>{item.modelName}</Link></li>
                        ))
                        :<AwaitLoad />}
                    </ul>
                </div>
            </div>
            {/* <div className={display?"finished-bottom-page":"finished-bottom-page page-hidden"}>
                <button onClick={()=>setDisplay(false)}>Fermer</button>
                <FinishDetail model={idModel}/>
            </div> */}
        </div>
    )
}

export default FinishedModel
