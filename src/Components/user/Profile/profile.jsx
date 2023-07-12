import React, { Fragment, useEffect, useState } from 'react';
import './profile.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { BASE_URL } from '../../../config/URLS';
import jwt from 'jsonwebtoken';
import toast, {Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom';
import MyAxiosInstance  from '../../../utils/axios';
import Shimmer from "../../loader"

const Profile=()=>{


const [name,setName] = useState()
const [email,setEmail] = useState()
const [phone,setPhone] = useState()
const [picture,setPicture] = useState("")

 
  const goto = useNavigate()

    const login = useSelector(store=>store?.userInfo?.login)
    const axiosInstance = MyAxiosInstance();
    const [products,setProducts] = useState([])

    useEffect(()=>{
      if(!login)
      {
        goto('/login')
      }
      
     axiosInstance.get('products').then((response)=>{

      console.log(response)
      if(response.data.blocked)
      {
        toast("❌ Your account have been suspended!")
        localStorage.removeItem('user')
        goto('/login')
      }

      axiosInstance.get('profile').then((response1)=>{

        setName(response1.data.uname)
        setEmail(response1.data.email)
        setPhone(response1.data.phone)
        setPicture(response1.data.picture)
        
        setProducts(response.data)
  


      })

    
     })



  
    },[])


    useEffect(()=>{

      axiosInstance.get('profile').then((response1)=>{

        setName(response1.data.uname)
        setEmail(response1.data.email)
        setPhone(response1.data.phone)
        setPicture(response1.data.picture)
        
   
  


      })

    },[picture])

   


   
   
   
    
    const [imageFile, setImageFile] = useState(null);
 
    const [imageUrl, setImageUrl] = useState(null);
   
   
  


  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    };
  
  
   
    
    const handleSubmit =async (event) => {
        event.preventDefault();
        

        let err = false
        if(imageFile===null)
        {
            err = true
            toast("⚠️ Select an image first")
        }
  
  
     
  
 
      
      
      
    
      if(!err)
      {
        
      const newFileName = `dp${Date.now()}`;
      const data = new FormData()
      data?.append("file",imageFile,newFileName)
      data?.append("upload_preset","olx_img")
      data?.append("cloud_name","dfhcxw70v")
  
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dfhcxw70v/image/upload',
          data
        );
  
        const data1 = {
        
          img:response.data.public_id
       
        }

        setPicture(response.data.public_id)
      document.getElementById('dp').value = ""
  
        
  
        axiosInstance.post(
            'updateDp',
            data1
          ).then((response1)=>{


         
            
         
  
            toast("✅ Picture updated")
          
            setTimeout(()=>{

              toast.dismiss()
           
            },1000)
            
  
          })
  
        
  
          
       
  
        // Handle the response or update your application state
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle the error or show an error message
      }
      }
      
    
     
    };
   
  
    const removeDp = ()=>{
      setPicture()
      

      if(picture)
      {
        axiosInstance.get('removeDp').then((response)=>{

          if(response.data.blocked)
          {
            localStorage.removeItem('user')
            goto('/login')
          }

           
          toast("✅ Picture Removed")
          
         
         
          

      })
      }
      else
      {
        toast("⚠️ THERE'S NO IMAGE TO REMOVE")
      }

      
        
    }
   
  
  
   

      
    return (
    
      <Fragment>
        <Toaster/>
          {login ? 
          <div>
          <card>
          <div className="centerDiv">
            <h4>Profile</h4>
            <img alt="Posts" width="170px" height="150px" src={picture ? `https://res.cloudinary.com/dfhcxw70v/image/upload/v1686835716/${picture}` : imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}></img>
            <br/>
            <button
            onClick={()=>removeDp()}
            ><i class="ri-delete-bin-line"></i></button>
            <form>
              <br />
              <input required type="file" name="image" id='dp' onChange={handleImageChange} />
              <br />
              <button className="uploadBtn" onClick={(e)=>handleSubmit(e)} style={{overflow:"hidden"}}>Update Profile Picture</button> 
            </form>
            <form  encType="multipart/form-data"  >
                <br/>
                <label style={{fontWeight:"bold"}}>User Info</label>
                <br/>
                <br />
              <label htmlFor="fname">Name: {name ? name : null}</label>
              <br />
              <label htmlFor="fname">Phone:  {phone ? phone : null }</label>
              <br />
              <label htmlFor="fname">Email:  {email ? email : null }</label>
              <br />
              <label htmlFor="fname">Products Added:  {products ? products?.length : null }</label>
              <br />
             
               
              <br />
             
              {/* <input
                className="input"
                type="text"
                id="fname"
                name="category"
             
              /> */}
              <br />
            
            </form>
            <br />
           
          </div>
        </card>
        <h2>Card Container</h2>
        <div className="card-container" style={{display:"flex",flexFlow:"row",flexWrap:"wrap"}}>

       


{ 
    products.map((items)=>{

        return products.length==0 ? <Shimmer/> : (
          <Link to={"/product/"+items._id} style={{textDecoration:"none",color:"black"}}>
            <div class="card" style={{overflowY:"hidden",height:"350px"}}>
    <div class="card-img">
        <img src={`https://res.cloudinary.com/dfhcxw70v/image/upload/v1686835716/${items.image}`} alt="" />
    </div>
    <div class="card-title" style={{overflow:'hidden',height:"2rem"}}>{items.name}</div> 
    <div class="card-subtitle" style={{overflow:'hidden',height:"2rem"}}>Category:{items.category}.</div>
    <hr class="card-divider"/>
    <div class="card-footer" style={{overflow:'hidden',height:"2rem"}}>
        <div class="card-price" style={{overflow:'hidden',height:"2rem"}}><span>₹</span> {items.price.substring(0,9)}</div>
        {/* <button class="card-btn" style={{overflow:'hidden',height:"2rem"}} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
        </button> */}
    </div>
</div>
</Link>
        )
    })
}







        </div>
          
           </div>



         : null}
        
        
      </Fragment>
    );
 

}

export default Profile