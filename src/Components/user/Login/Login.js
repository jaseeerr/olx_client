import React from 'react';
import { useFormik } from 'formik'
import Logo from '../../../assets/images/olx-logo.svg';
import './Login.css';
import { Link, Navigate } from 'react-router-dom';
import MyAxiosInstance  from '../../../utils/axios';
import { BASE_URL } from '../../../config/URLS';
import jwt from 'jsonwebtoken';
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { loginStatus } from '../../../utils/userSlice';
import { updateUserdata } from '../../../utils/userSlice';

function Login() {

  const goto = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((store) => store?.userInfo?.userdata?.token);
  const changeLoginStatus = (status)=>{

    dispatch(loginStatus(status))
  }

  
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

   

      // Create the Axios instance with the token
      const axiosInstance = MyAxiosInstance(token);
           // Make the POST request
           axiosInstance.post('login', values)
.then(response => {
    
   
   console.log(response)
    
   if(response.data.baduser)
   {
       toast("❌ Invalid Email / Phone")
   }
   else if(response.data.badpass)
   {
     toast("❌ Incorrect Password")
   }
   else if(response.data.blocked)
   {
    toast("❌ Your account have been suspended!")
   }
   else if(response.data.success)
   {
     
    
     
     toast("✅ Login Successful")
     let x = true
     let data = response.data.token
   
    
     dispatch(loginStatus(x))
     localStorage.setItem('user',JSON.stringify(data))
     
     changeLoginStatus(x)
     setTimeout(()=>{
      toast.dismiss();
     goto('/')
     },1000)
   
   }
    
  

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
      <h4 style={{display:"flex",justifyContent:"center"}}>LOGIN</h4>
      <Link to="/">
      <img width="200rem" height="200rem" src={Logo}></img>
      </Link>
       
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
        
        <Link to="/signup" style={{textDecoration:"none",color:"black",marginTop:"20px"}}>Signup</Link>
      </div>
    </div>
    </>
  );
}

export default Login;
