import {configureStore} from "@reduxjs/toolkit";
import brandSlice from "../feature/Brand.slice";
import  builderSlice from "../feature/Builder.slice";
import  categorySlice  from "../feature/Category.slice";
import CountrySlice from "../feature/Country.slice";
import  periodSlice  from "../feature/Period.slice";
import scaleSlice from "../feature/Scale.slice";


export default configureStore({
    reducer :{
        countries : CountrySlice,
        periods : periodSlice,
        brands: brandSlice,
        categories: categorySlice,
        scales:scaleSlice,
        builders:builderSlice,
       
    },
    //devTools :false //to avoid visible store in dev tools
})