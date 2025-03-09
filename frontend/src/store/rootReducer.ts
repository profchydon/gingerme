"use client";

import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import customStorage from "./cutomStorage";
import { globalSlice } from "./slices/globalSlice";



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
};
