import { useEffect } from "react";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";

function Home(){
    
    //useSelector to get value of any state presnet in redux store anytime anywhere
    //useSelector ke ander ek callback hota hai present
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    console.log(isLoggedIn);
    // if(!isLoggedIn) toast.warning('Please login to use this App!') // will give error in console ,because you’re calling toast.warning(...) directly in the render flow of Home.

    useEffect(()=>{ // useEffect hook is used to give side effects in react components
        // console.log("run only once after the component mounted!");
       if(!isLoggedIn) toast.warning('Please login to use this App!')

        // return ()=>{ // cleaunp function 
        //     console.log("component unmounted");
            
        // }
        

    },[isLoggedIn]) // if [] then this whatver return inisde useEffect will only once after the compodenet didmount first time
    // console.log("ff");
    
    

    return (
        <>
        {isLoggedIn ? <h1>Home</h1> :  <h1>Please Login to use this app!</h1>  }
        
        </>
    )
}

export default Home