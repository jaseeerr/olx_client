import React from 'react';
import Heart from '../../../assets/images/Heart';
import '../Header/Header.css';
import OlxLogo from '../../../assets/images/OlxLogo';
import Search from '../../../assets/images/Search.js';
import Arrow from '../../../assets/images/Arrow.js'; 
import SellButton from '../../../assets/images/SellButton.js';
import SellButtonPlus from '../../../assets/images/SellButtonPlus.js'; 
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast'
import { loginStatus, updateUserdata } from '../../../utils/userSlice';
import jwt from "jsonwebtoken"
function Header() {


  const dispatch = useDispatch()
  const login = useSelector(store => store.userInfo.login)

  const data = jwt.decode(JSON.parse(localStorage.getItem('user')))

  
  const name = data?.uname
  console.log(login,"BLEEHHH",name)

  const logout = ()=>{



    localStorage.removeItem('user');
    const x = false
    const y = {}
    dispatch(loginStatus(x))
 
    toast("✅ Logout successful")
    setTimeout(()=>{
     toast.dismiss()
    },1000)
    
  }


  return (
    <>
    <Toaster/>
    <div className="headerParentDiv">
      
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">

          <OlxLogo></OlxLogo>
          </Link>
          
        </div>
        <div>
          
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder='India' />
          <Arrow></Arrow>
          <div>
        
          </div>
        </div>
       
       

        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span>  </span>
          <Link to="/liked"> <Heart/> </Link>
       
        </div>
        <div className="loginPage">
          <span>
            {login ?  <Link to="/profile" style={{color:"black"}}>{`Hello ${name}`}</Link> : <Link to="/login" style={{color:"black"}}>Login</Link>}  
          
              
               </span>
              
          <hr />
        </div>
        {login ?<Link to="/" style={{textDecoration:"none",color:"black"}}
        onClick={()=>logout()}
        >Logout</Link> : null } 

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span><Link to="/sell" style={{textDecoration:"none",color:"black"}}>SELL</Link></span>
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Header;
