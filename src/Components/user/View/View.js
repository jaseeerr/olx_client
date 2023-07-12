import React, { useEffect, useState } from 'react';

import './View.css';
import { useParams } from 'react-router';
import axios from 'axios';
import { BASE_URL, IMG_CDN } from '../../../config/URLS';
function View() {


  
const {id} = useParams()
const [product,setProduct] = useState({})

useEffect(()=>{

  axios.get(BASE_URL+"product/"+id).then((response)=>{

    console.log(response)
    setProduct(response.data)
  })
},[])


  return ( 

    
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={IMG_CDN+product.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p style={{overflow:"hidden"}}>&#x20B9; {product.price} </p>
          <span>{product.name}</span>
          <p>{product.category}</p>
          <span></span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{product.oname}</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
