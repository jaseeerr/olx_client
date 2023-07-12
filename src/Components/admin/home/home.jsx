import React, { useEffect, useState } from "react"
import "./home.css"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import toast, {Toaster} from 'react-hot-toast'
import axios from "axios"
import { BASE_URL,IMG_CDN } from "../../../config/URLS"
import Header from "../header/header"
import jwt from "jsonwebtoken"
import MyAxiosInstance  from '../../../utils/axiosAdmin';


const AdminHome = ()=>{

  const axiosInstance = MyAxiosInstance();
    const login = useSelector(store=>store.adminInfo.login)
    const goto = useNavigate()
    const [users,setUsers] = useState([])



    useEffect(  ()=>{

        if(!login)
        {
            goto('/admin/login')
        }
        else
        {
          run()
        }


        async function run()
        {
          const users = await axiosInstance.get("admin/allusers")
          console.log(users)
              const data = jwt.decode(users.data,process.env.ACCESS_TOKEN_SECRET)
              console.log("?//")
              console.log(data)
              const final = data.response
              // localStorage.setItem("userList",JSON.stringify(final))
              setUsers(data?.response)
           
        }

       
            
       


        
    },[])

    return(
        <>
        <Toaster/>
        <Header/>
        

<center>
    <h2>User Management</h2>
    <br /> <br />
</center>
<div style={{marginTop:"60px",padding:"50px",display:"flex",flexFlow:"row",flexWrap:"wrap"}}>


{ 


    users.map((items)=>{

        return(
            <Link style={{textDecoration:"none",color:"black"}}>
            <div className="card" style={{marginBottom:"10px"}}>
        <div className="favorite">
          
        </div>
        <div className="image">
          <img src={items?.picture ? IMG_CDN+items?.picture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
        </div>
        <div className="content" style={{paddingBottom:"10px",overflow:"hidden"}}>
          <p className="rate">Name: {items?.uname}</p>
          <span className="kilometer">Email:{items?.email?.substring(0,16)+".."}</span>
          <span className="kilometer"></span>
          <p className="name">Phone:{items?.phone}</p>
        </div>
        <div className="date">
          {/* <span>10/5/2021</span> */}
        </div>
        <Link to={"/admin/userInfo/"+items?._id} style={{overflow:"hidden"}}>
        <button > View More </button>
        </Link>
      
      </div>
          </Link>
        )
      
           
        
})

 
}


      

</div>

        </>
    )
}

export default AdminHome