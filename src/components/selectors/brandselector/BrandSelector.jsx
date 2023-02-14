import { useEffect, useState } from 'react';
import axios from 'axios';
import { setBrand } from '../../../feature/Brand.slice';
import { useDispatch, useSelector } from 'react-redux';

const BrandSelector = ({ selectedBrand, setSelectedBrand }) => {
    const [brandLoaded, setBrandLoaded] = useState(false);
    const brandData = useSelector((state) => state.brands.brand);
    const dispatch = useDispatch();

    useEffect(() => {
        const getBrands = () => {
            const url = `${process.env.REACT_APP_API_URL}brand`;
            axios.get(url)
                .then((res) => {
                    dispatch(setBrand(res.data))
                    setBrandLoaded(true);
                });
        }
        if (!brandData) {
            getBrands();
        }
        else
            setBrandLoaded(true);
    }, [])

    return (
        <select
            id="brand-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className='brand-selector'
        >

            {brandLoaded
                ? brandData.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}>{item.name}</option>
                ))
                : null
            }
        </select>
    )
}

export default BrandSelector
