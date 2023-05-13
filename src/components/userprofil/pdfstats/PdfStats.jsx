import { useEffect,useState } from 'react';
import useAxiospdfBlob from '../../../hooks/useAxiospdfBlob';
import useAuth from '../../../hooks/useAuth';


const PdfStats = () => {
    const axiosPrivate=useAxiospdfBlob();
    const [path, setPath]=useState('');
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const {auth}=useAuth();
    let idUser=auth?.id;
    if(!idUser){
      idUser=0;
    }
    

useEffect(()=>{
    const getPdf=()=>{
        const url = `${process.env.REACT_APP_API_URL}stats/${idUser}`;
        axiosPrivate
            .get(url)
            .then((resp)=>{
                const href=URL.createObjectURL(resp.data);
                setPath(href)
            })
            .catch((err)=>{
                console.error(err)
            })
    }
    getPdf();
},[])

    return (
        <div>
           {path===''?null:(
           
             <object data={path} type="application/pdf" width="800" height="500">
          <a href={path} target='_blank'>PDF</a>
            
          </object>
     
          
           )} 
           Hello
        </div>
    )
}

export default PdfStats
