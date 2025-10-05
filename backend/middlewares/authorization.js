import CustomError from "../utils/CustomError.js"

export const authorization =(...allowedRoles)=>{
    return (req,res,next)=>{ // authorization ek func hai jo ki aage jake as a middlware use hoga joki ek another function return krta hai (HOF) /callback/handler joki whi chayei hota hai experss ke middlware ko (req,res,next)=>
    //eg-authentication func is direclty (req,res,next)=> but authorization is a functuion that retruns (req,res,next)=> // humein end goal se mtlb hai jo ki hona chayie ye chiz/func/handler (req,res,next)=> 
        // call this ffunc  authorization as authorization("admin") once and it returns the real middleware → (req, res, next) => {...}
// which Express can execute.
        // console.log(req?.user);
        if(!req?.user) throw new CustomError(401,'Unauthorized')
        // console.log(allowedRoles);
       if(!allowedRoles.includes(req?.user?.role)) throw new CustomError(401,'Forbidden') 

            next()

    }

}