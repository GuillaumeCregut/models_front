import { useState, useEffect, useRef } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ProviderSelector from '../../selectors/provideselector/ProviderSelector';
import OrderModel from '../ordermodel/OrderModel';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [listModel, setListModel] = useState([]);
    const [provider, setProvider] = useState(0);
    const axiosPrivate = useAxiosPrivate();
    const orderRefRef = useRef();
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
                    setOrders(resp.data)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        getOrders();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderRefRef.current.value === '') {
            alert('Veuillez saisir la référence')
        }
        else {
            if (parseInt(provider) !== 0) { //penser à tester si la liste est vide.
                const dataSend = {
                    owner: idUser,
                    supplier: parseInt(provider),
                    reference: orderRefRef.current.value,
                    list: []
                }
                /*
                    {idModel
                    price
                    qtty}
                */
                if (window.confirm('voulez vous valider la commande ?')) {
                    console.log(dataSend);
                }
            }
            else
                alert('Veuillez choisir un fournisseur')
        }
    }

    const addModel = (model) => {
        let newList = [];
        const id = listModel.findIndex((item) => item.idModel === model.idModel);
        //Si on a  le modele dans la liste
        if (id !== -1) {
            const oldModel = listModel[id];
            const newQtty = parseInt(oldModel.qtty) + parseInt(model.qtty);
            if (newQtty < 0) {
                oldModel.qtty = 0; //remove from array
                newList=listModel.filter((item)=>item.idModel!==model.idModel)
            }
            else {
                oldModel.qtty = newQtty;
                //Rajouter le modèle au tableau
                    newList = listModel.map((item) => {
                    if (item.idModel === model.idModel)
                        return oldModel;
                    else return item;
                }); 
            }
            setListModel([...newList]);
        } //On a pas le modele dans la liste, on le rajoute
        else {
            setListModel([...listModel, model]);
        }
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
                    <label htmlFor="">Référence de la commande :
                        <input type="text" id="" ref={orderRefRef} />
                    </label>
                    <label htmlFor="provider">Fournisseur :
                        <ProviderSelector
                            id="provider"
                            provider={provider}
                            setProvider={setProvider} />
                    </label>
                    <button>Valider</button>
                </form>
            </div>
            <OrderModel
                addModel={addModel} />
        </div>)
        : <p>Vous n'êtes pas connecté</p>
    )
}

export default Orders
