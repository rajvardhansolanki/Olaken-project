import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type initialState = {
   language : string
}
const initialState : initialState = {
    language: ''
}
const language = createSlice({
    initialState,
    name: 'language',
    reducers: {
        saveLanguage(state: initialState, action: PayloadAction<initialState>){
            state.language = action.payload.language;
        },
    }
})
export const { saveLanguage} = language.actions;
export default language.reducer;
