import React from 'react';
import img from "../../../../public/Images/R15V3.jpg"
import Heart from '../../../assets/images/Heart';
import './Post.css';
import { IMG_CDN } from '../../../config/URLS';
import { Link } from 'react-router-dom';
import { Shimmer } from '../../loader';

function Posts({data}) {

  console.log(data)

  return data?.length==0 ? (<Shimmer/>) : (
    <div className="postParentDiv">
     
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards" style={{display:"flex",flexFlow:"row",flexWrap:"wrap"}}>


{
  data.map((items)=>{

    return(
      <Link to={"/product/"+items._id} style={{textDecoration:"none",color:"black"}}>
        <div className="card" style={{marginBottom:"10px"}}>
    <div className="favorite">
      <Heart></Heart>
    </div>
    <div className="image">
      <img src={IMG_CDN+items.image} alt="" />
    </div>
    <div className="content">
      <p className="rate">&#x20B9; {items.price}</p>
      <span className="kilometer">{items.category}</span>
      <p className="name"> {items.name}</p>
    </div>
    <div className="date">
      {/* <span>10/5/2021</span> */}
    </div>
  </div>
      </Link>
    
    )

    



  })
}

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={img} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default Posts;
