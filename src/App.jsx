import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Signup from "./Components/user/Signup/Signup";
import Header from "./Components/user/Header/Header";
import Home from "./Components/user/home";
import { Provider } from "react-redux"
import Store from "./utils/store";
import Login from "./Components/user/Login/Login"
import { useDispatch } from "react-redux";
import Create from "../src/Components/user/Create/Create"
import Profile from "./Components/user/Profile/profile";
import View from "./Components/user/View/View";
import AdminLogin from "./Components/admin/Login/Login"
import AdminHome from "./Components/admin/home/home"
import Error from "./Components/error";
import UserInfo from "./Components/admin/userInfo/profile";
import AdminHeader from "./Components/admin/header/header";


const AppLayout = ()=>{

    
   

    return(
        <>
        <Provider store={Store}>
            
        <Header/>
        <Outlet/>
        </Provider>
        </>
    )
}





const AppRouter = createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/",
                element:<Home/>

            },
            {
                path:"/sell",
                element:<Create/>

            },
            {
                path:"/profile",
                element:<Profile/>
            },
            {
                path:"/product/:id",
                element:<View/>
            }
        ]
        
        
        
    },
    {
        path:"/signup",
        element:<Signup/>
    },
    {
        path:"/login",
        element:<Provider store={Store}><Login/></Provider>
    },

    { 
        path:"/admin/login",
        element:<Provider store={Store}><AdminLogin/></Provider>
    },
    {
        path:"/admin",
        element:<Provider store={Store}><AdminHome/></Provider>
    },
    {
        path:"/admin/userInfo/:id",
        element:<Provider store={Store}><UserInfo/></Provider>
    }
    
])





const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<RouterProvider router={AppRouter}/>)

