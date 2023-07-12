import "../header/header.css"
import { Link } from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast'



const AdminHeader = ()=>{

    return(
        <>
        <Toaster/>
          <header class="header">
  <nav>
    <div class="logo">
      <Link to="/admin">OL<span>X</span></Link>
    </div>
    <input type="checkbox" id="menu-toggle"/>
    <label for="menu-toggle" class="menu-icon">&#9776;</label>
    <ul class="menu">
      
      <li>  <Link 
      onClick={()=>{

        toast("✅ Logout Successful")
        localStorage.removeItem('admin')
        localStorage.removeItem('userList')
        setTimeout(()=>{
          location.href = "/admin/login"
        },1000)
        
      }}
      
      style={{textDecoration:"none",color:"white"}}>Logout</Link></li>
    
    </ul>
  </nav>
</header>
        </>
    )
}

export default AdminHeader