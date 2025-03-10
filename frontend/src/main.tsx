import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./lib/providers.tsx";
import ProductList from "./components/product/ProductList.tsx";
import Orders from "./components/order/Orders.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/products" element={<ProductList />} />
          {/* <Route path="/products/top-selling" element={<ProductToSelling />} /> */}
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
