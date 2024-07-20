import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoListPage from "./pages/TodoListPage.tsx";
import NasaAppPage from "./pages/GymAppPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import Layout from "./components/Layout.tsx";
import CartPage from "./pages/CartPage.tsx";
import BookPage from "./pages/BookPage.jsx";
import configureStore from "./store/configureStore.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
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
    path: "/book",
    element: <BookPage />,
  },
]);

// const store = configureStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
