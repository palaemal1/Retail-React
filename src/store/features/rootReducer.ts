import { combineReducers } from "@reduxjs/toolkit";
import LoaderSlice from "./loaderSlice";
import ItemSlice from "./itemSlice";
export const rootReducer
    = combineReducers({
    loader: LoaderSlice,
    item:ItemSlice,
})