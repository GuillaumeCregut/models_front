import { useState, useEffect, useRef } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ProviderSelector from '../../selectors/provideselector/ProviderSelector';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [provider,setProvider]=useState(0);
    const axiosPrivate = useAxiosPrivate();
    const orderRefRef=useRef();
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser) {
        idUser = 0;
    }

    useEffect(() => {
        const getOrders = () => {
            const url = `${process.env.REACT_APP_API_URL}order/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    console.log(resp.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        getOrders();
    }, []);

    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    return (idUser !== 0
        ? (<div>
            Mes commandes :
            {orders.length > 0
                ? <ul>
                    {orders.map((order) => {
                        <li key={order.reference}>{order.reference}</li>
                    })}
                </ul>
                : <p>Vous n'avez pas de commandes enregistrées</p>
            }
            <div className="new-order-container">
                <h2 className='new-order-form-title'>Ajouter une nouvelle commande</h2>
                <form className='new-order-form' onSubmit={handleSubmit}>
                    <label htmlFor="">
                        <input type="text" id="" ref={orderRefRef}/>
                    </label>
                    <label htmlFor="provider">
                       <ProviderSelector 
                       id="provider"
                       provider={provider}
                       setProvider={setProvider}/>
                    </label>
                </form>
            </div>
        </div>)
        : <p>Vous n'êtes pas connecté</p>
    )
}

export default Orders
