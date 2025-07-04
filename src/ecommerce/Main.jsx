import React from "react";
import First from "./pages/First";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import "./components/ProductDisplay.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import UserContext from "./components/UseContext";
import Login from "./pages/login";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute";
import About from "./pages/About";
//  const user = JSON.parse(localStorage.getItem("user"));
//  console.log(user);
 
const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    
      {
        path: "cart",
        element:
        <ProtectedRoute>
            <Cart />
          </ProtectedRoute>,  
      },
      {
        path: "wishlist",
        element: <ProtectedRoute> <Wishlist /> </ProtectedRoute>,
      },

      {
        path: "/about",
        element: <ProtectedRoute> <About /> </ProtectedRoute> ,
      },

      {
        path: "product/:id",
        element: <SingleProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function Main() {
  return (
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  );
}

export default Main;
