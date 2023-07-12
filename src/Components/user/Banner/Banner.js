import React from 'react';
import img from "../../../assets/images/banner.png"
import './Banner.css';
import Arrow from '../../../assets/images/Arrow.js'
function Banner(props) {


  
  
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src={img}
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
