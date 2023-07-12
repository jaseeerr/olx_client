import React, { Fragment, useEffect, useState } from 'react';
import './Create.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import axios from 'axios';

import jwt from 'jsonwebtoken';
import MyAxiosInstance  from '../../../utils/axios';
import toast, {Toaster} from 'react-hot-toast'
import {updateUserdata} from "../../../utils/userSlice"

const Create = () => {



  const goto = useNavigate()
  const dispatch = useDispatch()

 
  const login = useSelector(store=>store.userInfo.login)


 
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };


 
  
  const handleSubmit =async (event) => {


    event.preventDefault();

let err = false
    if(name.trim().length===0)
    {
      
      err = true
      toast("⚠️ Invalid Name")
    }
    else if(category.length===0)
    {
      err = true
      toast("⚠️ Invalid Category")
    }
    else if(imageFile===null)
    {
      err = true
      toast("⚠️ Invalid Image")
    }
    
    
    const axiosInstance = MyAxiosInstance();
  
    if(!err)
    {
      
    const newFileName = `img${Date.now()}`;
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
      
        name:name,
        price:price,
        category:category,
        image:response.data.public_id
      }

      


      axiosInstance.post(
          'uploadProduct',
          data1
        ).then((response1)=>{


          toast("✅ Product Uploaded")

          
          goto("/profile")

          

        })

      

        
     

      // Handle the response or update your application state
    } catch (error) {
      toast("ERROR OCCURED")
      console.error('Error uploading image:', error);
      // Handle the error or show an error message
    }
    }
    
  
   
  };
 

 

  
  useEffect(()=>{
    if(!login)
    {
      goto('/login')
    }

  },[])
  return (
  
    <Fragment>
      <Toaster/>
        {login ? 
        <card>
        <div className="centerDiv">
          <h4>Upload Your product To Sell</h4>
          <form  encType="multipart/form-data"  >
            <label htmlFor="fname">Name</label>
            <br />
            <input
            required
              className="input"
              type="text"
              id="fname"
              name="Name"
             onChange={(e)=>{
              setName(e.target.value)
             }}
            />
             
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <select
            required
            
             onChange={(e)=>{
              setCategory(e.target.value)
             }}
            style={{marginTop:"1rem",marginBottom:"4px"}} name="category" className='input'>
              <option value="">--Category--</option>
              <option value="BIKE">BIKE</option>
              <option value="CAR">MOBILE</option>
              <option value="CAR">CAR</option>
            </select>
            {/* <input
              className="input"
              type="text"
              id="fname"
              name="category"
           
            /> */}
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
            
             onChange={(e)=>{
              setPrice(e.target.value)
             }}
            className="input" type="number" defaultValue={price} min={"0"} max={"5000000"} id="fname" name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="170px" height="150px" src={imageFile ? imageUrl : "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"}></img>
          <form>
            <br />
            <input required type="file" name="image" onChange={handleImageChange} />
            <br />
            <button className="uploadBtn" onClick={(e)=>handleSubmit(e)} style={{overflow:"hidden"}}>upload and Submit</button>
          </form>
        </div>
      </card>
       : null}
      
      
    </Fragment>
  );
};

export default Create;
