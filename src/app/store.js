import {configureStore} from "@reduxjs/toolkit";
import CountrySlice from "../feature/Country.slice";
import  periodSlice  from "../feature/Period.slice";


export default configureStore({
    reducer :{
        countries : CountrySlice,
        periods : periodSlice,
       
    },
    //devTools :false //to avoid visible store in dev tools
})