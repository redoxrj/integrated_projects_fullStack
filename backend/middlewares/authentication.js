import CustomError from "../utils/CustomError.js"
import jwt from 'jsonwebtoken'

export const authentication= (req,res,next)=>{ // since it will be used a middlware in express for any route,it will have acecess of req,res,next
 const accessToken = req?.cookies?.accessToken || req?.headers?.['authorization']?.replace('bearer ','')
//  console.log(accessToken);
if(!accessToken) throw new CustomError(401,'Invalid Request')
let decoded;
    try {
        decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        
    } catch (error) {
        throw new CustomError(401,error?.message)
        
    }
    // console.log(decoded);
   req.user=decoded

 next()
}
