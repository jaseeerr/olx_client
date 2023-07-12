import React, { useState } from 'react';
import { useFormik } from 'formik'
import Logo from '../../../assets/images/olx-logo.svg';
import './Signup.css';
import axios from 'axios';
import { BASE_URL } from '../../../config/URLS';
import jwt from 'jsonwebtoken';
import toast, {Toaster} from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom';




export default function Signup() {


 
const goto = useNavigate()


const formik = useFormik({
  initialValues: {
    email: '',
    name: '',
    phone: '',
    password: '',
   
  },
validate: (values) => {
  values.name = values.name.trim()
  values.email = values.email.trim()
  values.phone = values.phone.trim()
  values.password = values.password.trim()
const error = {};
if (!values.email) {
  error.email = "Email Required";
}
if (!values.name) {
  error.name = "Name Required";
}
if (values.phone.length!==10 && values.phone.length!==0 ) {
  console.log("eerr")
  console.log(values.phone.length)
  error.phone = "Number Required";
}

if (!values.password) {
  error.password = "Password Required";
} else if (
  !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(
    values.password
  )
) {
  error.password =
    "Password must contain at least 8 characters, including at least 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character";
} 
return error;
},
  onSubmit:(values) => {

           // Make the POST request
axios.post(BASE_URL+'signup', values)
.then(response => {
    
   const userdata = jwt.decode(response.data)
   
    if(userdata.exemail)
    {
        toast.error("Existing Email \n Please Login")
    }
    else if(userdata.exphone)
    {
      toast.error("Existing Phone \n Please Login")
    }
    else if(userdata.success)
    {
      
     
      toast("✅ Signup Successful \n Please Login")
      setTimeout(()=>{
        goto('/login')
      },2000)
    
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
    <div>
      <Toaster/>
      <div className="signupParentDiv">
        <h4 style={{display:"flex",justifyContent:"center"}}>SIGN UP</h4>
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
           {...formik.getFieldProps('name')}
            className="input"
            type="text"
            id="fname"
            name="name"
          
           
        
          />
          {formik.errors.name ? (
                <div style={{color:"red"}}>{formik.errors.name}</div>
              ) : null}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            {...formik.getFieldProps('email')}
            className="input"
            type="email"
           
            name="email"
            
          
          />
          {formik.errors.email ? (
                <div style={{color:"red"}}>{formik.errors.email}</div>
              ) : null}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            {...formik.getFieldProps('phone')}
            className="input"
            type="text"
            
            name="phone"
            
          
          />
           {formik.errors.phone ? (
                <div style={{color:"red"}}>{formik.errors.phone}</div>
              ) : null}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
           {...formik.getFieldProps('password')}
            className="input"
            type="password"
         
            name="password"
           
          />
              {formik.errors.password ? (
                <div style={{ wordWrap: 'break-word',width:"200px",color:"red" }} >{formik.errors.password}</div>
              ) : null}
          <br />
          <br />
          <button
        type="submit"
        style={{cursor:"pointer",marginBottom:"15px"}}>Signup</button>
        </form>
     <Link style={{textDecoration:"none",color:"black"}} to="/login">Login</Link>
  
      </div>
    </div>
  );
}
