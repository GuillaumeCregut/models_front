import {createSlice} from "@reduxjs/toolkit";
export const StockUserSlice=createSlice({
    name:"stockUsers",
    initialState:{
        stockUser:null
    },
    reducers:{
        setStock:(state,{payload})=>{
            state.stockUser=payload;
        },
        addStock:(state,{payload})=>{
            state.stockUser.push(payload);
        },
        updateScale:(state,{payload})=>{
            state.stockUser=state.stockUser.map((item)=>{
                if(item.id===payload[1]){
                    //Changer cette partie
                    const name=payload[0].name;
                    //Peut être celle-ci
                    return {...item,name}
                }else
                    return item;
            })
        },
        deleteScale:(state,{payload})=>{
            state.stockUser=state.stockUser.filter((item)=>item.id!==payload);
        }
    }
});

export const{setScale,addScale,updateScale,deleteScale}=StockUserSlice.actions;
export default StockUserSlice.reducer;