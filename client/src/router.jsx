import {
  createBrowserRouter,
}from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home";
import Login from "./pages/logIn"
import SignUp from "./pages/signUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path:'login',
          element: <logIn></logIn>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        }
    ]
  },
]);