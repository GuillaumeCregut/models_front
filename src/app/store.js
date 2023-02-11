import {configureStore} from "@reduxjs/toolkit";
import brandSlice from "../feature/Brand.slice";
import CountrySlice from "../feature/Country.slice";
import  periodSlice  from "../feature/Period.slice";


export default configureStore({
    reducer :{
        countries : CountrySlice,
        periods : periodSlice,
        brands: brandSlice,
       
    },
    //devTools :false //to avoid visible store in dev tools
})