import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { AwaitLoad } from "../../awaitload/AwaitLoad";
import { setStock } from "../../../feature/stockUser.slice";
import './KitInStock.scss';
import KitCard from "../kitmgmt/kitcard/KitCard";
import { useDispatch,useSelector } from "react-redux";

const KitInStock = () => {
    const [kits, setKits] = useState([]);
    const [search, setSearch]=useState('');
    const [filteredKits,setFilteredKits]=useState([]);
    const StocksData = useSelector((state) => state.stockUsers.stockUser);
    const [isLoaded, setIsLoaded] = useState(false);
    const { auth } = useAuth();
    const dispatch=useDispatch();
    const axiosPrivate = useAxiosPrivate();
    let userId = auth?.id;
    if (!userId)
        userId = 0;

    useEffect(() => {
        
        const getModelsUser = () => {
            const url = `${process.env.REACT_APP_API_URL}model/user/${userId}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setKits(resp.data.filter(item => item.state === 1));
                    dispatch(setStock(resp.data))
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        if(! StocksData)
            getModelsUser();
        else{
            setIsLoaded(true);
            setKits(StocksData.filter(item => item.state === 1));
        }
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
            { isLoaded
                ? filteredKits.map((kit)=>(
                    <li key={kit.id}>
                        <KitCard kitDetails={kit} />
                    </li>
                ))
                : <AwaitLoad />
            }
           </ul>
        </div>
    )
}

export default KitInStock
