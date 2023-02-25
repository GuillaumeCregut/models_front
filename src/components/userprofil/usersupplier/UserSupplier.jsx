import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SupplierDetails from "../supplierdetails/SupplierDetails";

import './UserSupplier.scss';

const UserSupplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser)
        idUser = 0;

    useEffect(() => {
        const getSuppliers = () => {
            const url = `${process.env.REACT_APP_API_URL}supplier/user/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    setSuppliers(resp.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getSuppliers();
    }, []);

    return (
        <div>
            Supplier
            <div className="supplier-container">

                {suppliers.map((item) => (
                    <SupplierDetails
                        key={item.id}
                        supplier={item}
                    />
                ))}

            </div>
        </div>
    )
}

export default UserSupplier
