import { useState, useEffect, useRef } from 'react'
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ProviderSelector from '../../selectors/provideselector/ProviderSelector';
import OrderModel from '../ordermodel/OrderModel';
import ModelLine from './ModelLine';

import './Orders.scss';

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
    //const referenceCde=
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

    useEffect(()=>{
        const orderStore={
            provider:parseInt(provider),
            reference: orderRefRef.current.value,
            list: listModel
        }
        window.localStorage.setItem("myOrder",JSON.stringify(orderStore));
    },[listModel,provider,orderRefRef.current.value]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orderRefRef.current.value === '') {
            alert('Veuillez saisir la référence')
        }
        else {
            if (parseInt(provider) !== 0) { //penser à tester si la liste est vide.
                const list = listModel.map((model) => {
                    return { idmodel: model.idModel, qtty: model.qtty, price: model.price }
                })
                const dataSend = {
                    owner: idUser,
                    supplier: parseInt(provider),
                    reference: orderRefRef.current.value,
                    list: list
                }
                if (window.confirm('voulez vous valider la commande ?')) {
                    console.log(dataSend);
                }
            }
            else
                alert('Veuillez choisir un fournisseur')
        }
    }


    const addModel = (model) => {
        if (parseInt(model.qtty) < 1)
            return -1;
        let newList = [];
        const id = listModel.findIndex((item) => item.idModel === model.idModel);
        //Si on a  le modele dans la liste
        if (id !== -1) {
            const oldModel = listModel[id];
            const newQtty = parseInt(oldModel.qtty) + parseInt(model.qtty);
            if (newQtty < 0) {
                oldModel.qtty = 0; //remove from array
                newList = listModel.filter((item) => item.idModel !== model.idModel)
            }
            else {
                oldModel.qtty = newQtty;
                oldModel.price = parseFloat(oldModel.price);
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
            setListModel([...listModel, { ...model,idModel: model.idModel, price: parseFloat(model.price), qtty: parseInt(model.qtty) }]);
        }
       
    }

    const setNewQtty=(id,newQtty)=>{
        const modelMod=listModel.find((item=>item.idModel===id));
        console.log(modelMod)
        if(newQtty>0){
            modelMod.qtty=newQtty;
            setListModel(listModel.map((item)=>{
                if(item.idModel===id)
                    return modelMod;
                else return item;
            }))
        }
        else{
            setListModel(listModel.filter((item)=>item.idModel!==id))
        }
    }

    return (idUser !== 0
        ? (<section className='orders-container'>
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
                    <div className="model-list-added">
                        <table className='order-model-table'>
                            <caption>Résumé de la commande</caption>
                            <thead>
                                <tr className='order-head-line-container'>
                                    <th className='order-head-cells'>nom du modèle</th>
                                    <th className='order-head-cells'>marque</th>
                                    <th className='order-head-cells'>Echelle</th>
                                    <th className='order-head-cells qtty-cell'>Quantité</th>
                                    <th className='order-head-cells'>Prix unitaire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listModel.map((model) => (
                                    <ModelLine key={model.idModel} model={model} setNewQtty={setNewQtty}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button>Valider</button>
                </form>
            </div>
            <OrderModel
                addModel={addModel} />
        </section>)
        : <p>Vous n'êtes pas connecté</p>
    )
}

export default Orders
