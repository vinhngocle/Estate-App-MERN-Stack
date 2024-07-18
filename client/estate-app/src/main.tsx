import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage.tsx";
import NasaAppPage from "./pages/GymAppPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Layout from "./components/Layout.tsx";
import CartPage from "./pages/CartPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: "/todo-list",
    element: <TodoListPage />,
  },
  {
    path: "/gym-app",
    element: <NasaAppPage />,
  },
  {
    path: "/product",
    element: (
      <Layout>
        <ProductPage />
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <CartPage />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
