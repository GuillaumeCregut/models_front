import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AwaitLoad } from "../../awaitload/AwaitLoad";

import './KitInStock.scss';
import KitCard from "../kitmgmt/kitcard/KitCard";

const KitInStock = () => {
    const [kits, setKits] = useState([]);
    const [search, setSearch]=useState('');
    const [filteredKits,setFilteredKits]=useState([]);
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
                    setKits(resp.data.filter(item => item.state === 1));
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        getModelsUSer();
    }, []);

    useEffect(()=>{
        setFilteredKits(kits.filter((kit)=>kit.modelName.toLowerCase().includes(search.toLowerCase())))
    },[search,kits])

    return (
        <div>
             Kits en stock : {kits.length}
            <div className="filter">
                <label htmlFor="filter">
                   Recherche par nom : <input type="text" id="filter"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </label>
            </div>
          
           <ul>
            {
                filteredKits.map((kit)=>(
                    <li key={kit.id}>
                        <KitCard kitDetails={kit} />
                    </li>
                ))
            }
           </ul>
        </div>
    )
}

export default KitInStock
