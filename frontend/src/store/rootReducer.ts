"use client";

import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import customStorage from "./cutomStorage";
import { globalSlice } from "./slices/globalSlice";
import { productsApi } from "../api/baseQueries/productsApi";
import { orderApi } from "../api/baseQueries/orderApi";



// REDUCERS SHOULD ONLY BE ADDED TO THIS CONFIG FOR PERSISTENCY
const rootReducer = combineReducers({
  global: globalSlice,
});

const persistedReducers = persistReducer(
  {
    key: "rv2app",
    version: 2,
    storage: customStorage,
  },
  rootReducer,
);

export const reducer = {
  persistedReducers,
  [productsApi.reducerPath]: productsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
};
