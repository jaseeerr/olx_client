
import Banner from "./Banner/Banner"
import Posts from "../../Components/user/Posts/Posts" 
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../config/URLS"

const Home = ()=>{



    

    const getProducts=()=>{

        axios.get(BASE_URL+'allProducts').then((response)=>{
            

            setProducts(response.data)
            
        })
    }

  
    const [products,setProducts] = useState([])

    useEffect(()=>{

        getProducts()
        

    },[])

    return(
        <>
        <Banner  />
        <Posts data={products} key={products._id}/>
        </>
    )


}

export default Home