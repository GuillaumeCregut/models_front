import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AwaitLoad } from "../../awaitload/AwaitLoad";
import InnerMgmt from "./innermgmt/InnerMgmt";

import './KitManagement.scss';

const KitManagement = () => {
    const [kits, setKits] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { auth } = useAuth();

    const axiosPrivate = useAxiosPrivate();
    let userId = auth?.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        const getModelsUSer = () => {
            const url = `${process.env.REACT_APP_API_URL}model/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setKits(resp.data);
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        getModelsUSer();
    }, []);
    return (
        <section className='kits-management-page'>
            <h2>Gestion de mes kits</h2>
            {isLoaded
                ? <InnerMgmt
                    orderedModels={kits.filter(item => item.state === 5)}
                    likedModels={kits.filter(item => item.state === 4)}
                    workbenchModels={kits.filter(item => item.state === 2)}
                    finishedModels={kits.filter(item => item.state === 3)}
                    stockModels={kits.filter(item => item.state === 1)}
                />
                :<AwaitLoad />}
        </section>
    )
}

export default KitManagement
