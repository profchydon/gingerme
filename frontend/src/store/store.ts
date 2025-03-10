import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

/* Instruments */
import { reducer } from "./rootReducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "../api/baseQueries/productsApi";
import { orderApi } from "../api/baseQueries/orderApi";


const middleWares = [
  productsApi.middleware,
  orderApi.middleware
];

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      middleWares,
    );
  },
});

setupListeners(reduxStore.dispatch);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> =
  useReduxSelector;

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export type ReduxDispatch = typeof reduxStore.dispatch;
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
