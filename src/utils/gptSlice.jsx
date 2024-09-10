import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch : false,
    },
    reducers:{
        togleGptSearchView:(state)=>{
            state.showGptSearch =!state.showGptSearch;
        },

    }
})


export const  {togleGptSearchView} = gptSlice.actions;
export default gptSlice.reducer;