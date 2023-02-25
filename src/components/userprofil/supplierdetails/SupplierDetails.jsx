import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

const SupplierDetails = ({supplier, setSuppliers,suppliers}) => {
    const axiosPrivate=useAxiosPrivate();
    const handleDelete=()=>{
        const id=supplier.id;
        if(window.confirm("Voulez-vous supprimer ce fournisseur ?")){
            const url = `${process.env.REACT_APP_API_URL}supplier/${supplier.id}`;
            axiosPrivate
                .delete(url)
                .then((resp)=>{
                    setSuppliers(suppliers.filter((item)=>item.id!==id))
                })
                .catch((err)=>{
                    console.error(err);
                })
        }
    }

    return (
        <li>
           <button onClick={handleDelete}>-</button> {supplier.name}
        </li>
    )
}

export default SupplierDetails
