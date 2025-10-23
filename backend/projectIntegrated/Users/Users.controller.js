import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import {User} from '../../Models/User.model.js'
import { cloudinaryUpload } from "../../utils/Cloudinary.js";
import { generateAccessToken, generateRefreshToken, hashPlainText, verifyPlainText } from "../../utils/commonFunctions.js";
import jwt from 'jsonwebtoken'

export const createUser = asyncHandler(async(req,res,next)=>{ // issesy/itney se ek callback/func/handler milega
    const files =req.files
    // console.log(files);
    const avatarLocalPath = files?.avatar?.[0]?.path
    // if(!avatarLocalPath) throw new CustomError(400,'avatar is required')

    const {fullName,username,email,password} = req?.body

    // const isUserExists= await User.findOne({'username': username})
    const isUserExists= await User.findOne({
        $or: [{username},{'email':email}]
    })

    if(isUserExists) throw new CustomError(409,'User already exists with username/email!')
    let avatarCloudinaryUrl=null
    if(avatarLocalPath){
        const uploadResult = await cloudinaryUpload(avatarLocalPath)
        // console.log(uploadResult);
        // console.log(uploadResult?.url);
        avatarCloudinaryUrl=uploadResult?.url
        
    }
    const hashedPassword = await hashPlainText(password)
    const result  = await User.create({
        'fullName':fullName,
        username,
        email,
        'password': hashedPassword ,
        'avatar': avatarCloudinaryUrl ,
    })
    const userId=result?._id
    const user =  await User.findById(userId).select('-password -__v -updatedAt')
    // console.log(user);
    if(!user) throw new CustomError(500,'Something went wrong creating user')

    // throw new CustomError(400,'invalid req body')
    return res.status(201).json(new ApiResponse(201,1,'user created Successfully!'))
    
})

export const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req?.body

    const user= await User.findOne({email})
    // console.log(user);
    if(!(user || user?._id)) throw new CustomError(404,'User not found!')
    const storedHashedPassword = user?.password 
    const isPasswordMatched = await verifyPlainText(storedHashedPassword,password)
    if(!isPasswordMatched) throw new CustomError(400,'Invalid Credentials')
    
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    await User.findByIdAndUpdate(user?._id,{
        $set:{
            'refreshToken': refreshToken
        }
    })
    let updatedUser = await User.findById(user?._id).select('-password')
    // console.log(updatedUser);
//    updatedUser.accessToken= accessToken // won't work because the object you get from Mongoose queries like .findById().select(...) is a Mongoose Document, not a plain JavaScript object.
updatedUser=updatedUser.toObject() // convert mongoose doc → plain js object
updatedUser.accessToken= accessToken
const cookieOptions ={
    httpOnly:true,
    secure:true
}    
    res.status(200).cookie('accessToken',accessToken,cookieOptions).cookie('refreshToken',refreshToken,cookieOptions).json(new ApiResponse(200,1,'Login Success',updatedUser))

})
export const logoutUser = asyncHandler(async(req,res)=>{
    const {_id : userId} =req?.user
    // console.log(userId);
//    console.log(req?.cookies);
   await User.findByIdAndUpdate(userId,{
    $set:{
        'refreshToken' :null
    }
   })
   const cookieOptions ={
    httpOnly:true,
    secure:true
}   
   
    res.status(200).clearCookie('accessToken',cookieOptions).clearCookie('refreshToken',cookieOptions).json(new ApiResponse(200,1,'Logout Success'))

})
export const restartSession = asyncHandler(async(req,res)=>{

    const refreshToken = req?.cookies?.refreshToken || req?.headers?.['authorization']?.replace('bearer ','')
    if(!refreshToken) throw new CustomError(400,'Invalid request!')
    
      let decoded;
    try {
        decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        
    } catch (error) {
        throw new CustomError(401,error?.message)
        
    }
    // console.log(decoded);
    const {_id: userId} = decoded

    const user = await User.findById(userId)
    if(!user) throw new CustomError(404,'User not found!')
    if(!user?.refreshToken) throw new CustomError(404,'User Refresh Token not exists,please login')
    const storedUserRefreshToken = user?.refreshToken
   if(refreshToken!==storedUserRefreshToken) throw new CustomError(401,'Refresh token not valid!')

     const accessTokenNew = generateAccessToken(user)
    const refreshTokenNew = generateRefreshToken(user)
    await User.findByIdAndUpdate(user?._id,{
        $set:{
            'refreshToken': refreshTokenNew
        }
    })

    
   const cookieOptions ={
    httpOnly:true,
    secure:true
}   
   
    res.status(200).cookie('accessToken',accessTokenNew,cookieOptions).cookie('refreshToken',refreshTokenNew,cookieOptions).json(new ApiResponse(200,1,'Session Restarted!',{accessTokenNew,refreshTokenNew}))

})
export const getCurrentUser = asyncHandler(async(req,res)=>{
    const user =req?.user
    res.status(200).json(new ApiResponse(200,1,'Success',user))

})
