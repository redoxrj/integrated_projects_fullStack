import argon2  from 'argon2'
import CustomError from './CustomError.js';
import jwt from 'jsonwebtoken'

export const hashPlainText= async(plainText)=>{
    try {
        const hash = await argon2.hash(plainText);
        return hash
    } catch (error) {
        throw new CustomError(500,error.message)
        
    }

}
export const verifyPlainText= async(hash,plainText)=>{
    try {
        const result = await argon2.verify(hash,plainText);
        return result
    } catch (error) {
        throw new CustomError(500,error.message)
        
    }

}

// hashPlainText("hello").then((value)=>{
//     console.log(value);

// }).catch((error)=>{
//     console.log(error);
    
// })
// verifyPlainText("$argon2id$v=19$m=65536,t=3,p=4$/feUHFpFHhIrxUVJdpMbsA$CDoGLg0eAszndHCqhqMbjmW7gEjDJ0GspX61/CzVk/Y","hello").then((value)=>{
//     console.log(value);

// }).catch((error)=>{
//     console.log(error);
    

// })

export const generateJwtToken = (payload,secret,expiryTime)=>{
    try {
        const token = jwt.sign(payload,secret,{expiresIn:expiryTime})
        return token
        
    } catch (error) {
        throw new CustomError(500,error.message)
        
    }
}
export const generateAccessToken = (data)=>{
    try {
        const payload = {
            _id: data?._id,
            fullName: data?.fullName,
            username: data?.username,
            email: data?.email,
            role: data?.role,
        }
        const token = generateJwtToken(payload,process.env.ACCESS_TOKEN_SECRET,process.env.ACCESS_TOKEN_EXPIRY)
        return token
        
    } catch (error) {
        throw new CustomError(500,error.message)
        
    }
}
export const generateRefreshToken = (data)=>{
    try {
        const payload = {
            _id: data?._id
        }
        const token = generateJwtToken(payload,process.env.REFRESH_TOKEN_SECRET,process.env.REFRESH_TOKEN_EXPIRY)
        return token
        
    } catch (error) {
        throw new CustomError(500,error.message)
        
    }
}
