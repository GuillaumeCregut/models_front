import {configureStore} from "@reduxjs/toolkit";
import CountrySlice from "../feature/Country.slice";


export default configureStore({
    reducer :{
        countries : CountrySlice,
       
    },
    //devTools :false //to avoid visible store in dev tools
})