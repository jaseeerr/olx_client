import React from 'react';
import { useFormik } from 'formik'
import Logo from '../../../assets/images/olx-logo.svg';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../config/URLS';
import jwt from 'jsonwebtoken';
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { loginStatus } from '../../../utils/userSlice';
import MyAxiosInstance  from '../../../utils/axiosAdmin';


function AdminLogin() {

  const goto = useNavigate()
  

  const axiosInstance = MyAxiosInstance();
const formik = useFormik({
  initialValues: {
    email: '',
    password: '',
   
  },
validate: (values) => {
  values.email = values.email.trim()

  values.password = values.password.trim()
const error = {};
if (!values.email) {
  error.email = "Email/Phone Required";
}



if (!values.password) {
  error.password = "Password Required";
}  
return error;
},
  onSubmit:(values) => {

           // Make the POST request
           axiosInstance.post("admin/login", values)
.then(response => {
    
   console.log(response.data)
   const resp = response.data
    
   if(resp.baduser)
   {
       toast("❌ Invalid Email / Phone")
   }
   else if(resp.badpass)
   {
     toast("❌ Incorrect Password")
   }
   else if(resp.success)
   {
     
    
     
     toast("✅ Login Successful")
    
     localStorage.setItem('admin',JSON.stringify(resp))
     localStorage.setItem('adminToken',JSON.stringify(response.data.token))
     
     
     setTimeout(()=>{
      location.href = "/admin"
     },1500)
   
   }
    
  

  console.log(userdata)
  // Handle the response data
})
.catch(error => {
  console.error('Error:', error);
  // Handle the error
});



    console.log("heeyyy done")
  },


})





  return (
    <>
    <Toaster/>
    <div>
      
      <div className="loginParentDiv">
      <h4 style={{display:"flex",justifyContent:"center"}}>ADMIN LOGIN</h4>
        <img width="200rem" height="200rem" src={Logo}></img>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="fname">Email/Phone</label>
          <br />
          <input
           {...formik.getFieldProps('email')}
            className="input"
            type="text"
            id="fname"
            name="email"
       
          />
           {formik.errors.email ? (
                <div style={{color:"red"}}>{formik.errors.email}</div>
              ) : null}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
           {...formik.getFieldProps('password')}
            className="input"
            type="password"
            id="lname"
            name="password"
         
          />
           {formik.errors.password ? (
                <div style={{ wordWrap: 'break-word',width:"200px",color:"red" }} >{formik.errors.password}</div>
              ) : null}
          <br />
          <br />
          <button type='submit' style={{overflow:"hidden"}}>Login</button>
        </form>
        
        <Link to="#" style={{textDecoration:"none",color:"black",marginTop:"20px"}}>Signup</Link>
      </div>
    </div>
    </>
  );
}

export default AdminLogin;
