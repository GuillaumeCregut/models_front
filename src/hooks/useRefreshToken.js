import useAuth from "./useAuth"
import axios from 'axios';
const useRefreshToken=()=>{
    const {setAuth}=useAuth();

    const refresh=async()=>{
        let newToken='';
        const url= `${process.env.REACT_APP_API_URL}refresh/`;
        await axios
        .get(url,{withCredentials:true})
        .then((resp)=>{
            console.log(resp.data);
            newToken=resp.data;
            setAuth(prev=>{
                console.log(prev);
                return {...prev,token:newToken}
            })
        })
        .catch((err)=>{
            newToken=''
            console.log('erreur refesh'); //to modify
        })
        return newToken;
    }
    return refresh;
}

export default useRefreshToken;