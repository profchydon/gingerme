"use client";

/* Core */
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { reduxStore } from "../store/store";

persistStore(reduxStore); // persist the store

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>;
};
