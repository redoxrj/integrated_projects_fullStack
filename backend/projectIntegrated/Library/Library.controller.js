import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { cloudinaryUpload } from "../../utils/Cloudinary.js";
import CustomError from "../../utils/CustomError.js";
import {Library} from '../../Models/Library.model.js'
import mongoose from "mongoose";


export const addBook =asyncHandler(async(req,res)=>{

    // console.log(req?.file);
    const localBookPath= req?.file?.path
    if(!localBookPath) throw new CustomError(400,'Please Upload book pdf!')
    
    const {_id: userId} = req?.user
    const {bookName,bookDescription} = req?.body
    // expeecting the user to be exists in our db
    let cloudinaryBookUrl;
    const result = await cloudinaryUpload(localBookPath)
    // console.log(result);
    // also expexting result?.url is true
    cloudinaryBookUrl=result?.url

   await Library.create({
    userId,
    bookName,
    bookDescription,
    bookUrl:cloudinaryBookUrl
   })

    res.status(201).json(new ApiResponse(201,1,'Book uploaded Success!'))

})
export const updateBookFile =asyncHandler(async(req,res)=>{
  //check only he can update update books uploaded by him not kisi or ka kar dein
   const {_id:userId} = req?.user

    // console.log(req?.file);
    const localBookPath= req?.file?.path
    if(!localBookPath) throw new CustomError(400,'Please Upload book pdf!')
        // console.log(req?.params);
     const {bookId} = req?.params       
    if(!bookId) throw new CustomError(400,'Invalid req params')
     
    if(!mongoose.Types.ObjectId.isValid(bookId)) throw new CustomError(400,'Invalid bookId')  

    const book = await Library.findById(bookId)
    if(!book) throw new CustomError(400,'Book not found')

    if(book?.userId!=userId) throw new CustomError(403,'Forbidden')     
    if(book?.status=='approved') throw new CustomError(400,'Cannot update Approved books')     

    let cloudinaryBookUrl;
    const result = await cloudinaryUpload(localBookPath)
    cloudinaryBookUrl=result?.url

   await Library.findByIdAndUpdate(book?._id,{
    $set :{
        bookUrl : cloudinaryBookUrl
    }
   })

    res.status(201).json(new ApiResponse(201,1,'Book File updated Success!'))

})
export const updateBookDetails =asyncHandler(async(req,res)=>{
  //check only he can update update books uploaded by him not kisi or ka kar dein
   const {_id:userId} = req?.user
   const {bookName,bookDescription} = req?.body
     const {bookId} = req?.params       
    if(!bookId) throw new CustomError(400,'Invalid req params')
     
    if(!mongoose.Types.ObjectId.isValid(bookId)) throw new CustomError(400,'Invalid bookId')  

    const book = await Library.findById(bookId)
    if(!book) throw new CustomError(400,'Book not found')

    if(book?.userId!=userId) throw new CustomError(403,'Forbidden')     
    if(book?.status=='approved') throw new CustomError(400,'Cannot update Approved books')     

   await Library.findByIdAndUpdate(book?._id,{
    $set :{
        bookName : bookName,
        bookDescription
    }
   })

    res.status(201).json(new ApiResponse(201,1,'Book Details updated Success!'))

})
export const searchMyBooks = asyncHandler(async(req,res)=>{
   
    const {_id:userId} = req?.user
    // console.log(req.query);
    const {status,bookName} = req.query
    let filter= {
        userId : userId
    }
    if(bookName) filter.bookName={ $regex: bookName, $options: 'i' } //like in sql
    if(status) {
        const statusArray =status.split(',').map(e=>e.trim())
        // console.log(statusArray);
        filter.status= {
        $in: statusArray  // in keyword in sql
    }
    }
    const result = await Library.find(filter)
    // console.log(result);
    const resultCount = result?.length || 0

    res.status(200).json(new ApiResponse(200,1,'success',result,resultCount))

})
export const searchBooksForAdmin = asyncHandler(async(req,res)=>{
   
    const {_id:userId} = req?.user
    // console.log(req.query);
    const {status,bookName} = req.query
    let filter= {
        // userId : userId // since this is an admin serch rest remains same
    }
    if(bookName) filter.bookName={ $regex: bookName, $options: 'i' } //like in sql
    if(status) {
        const statusArray =status.split(',').map(e=>e.trim())
        // console.log(statusArray);
        filter.status= {
        $in: statusArray  // in keyword in sql
    }
    }
    const result = await Library.find(filter)
    // console.log(result);
    const resultCount = result?.length || 0

    res.status(200).json(new ApiResponse(200,1,'success',result,resultCount))

})
export const viewLibraryBooksPublic = asyncHandler(async(req,res)=>{
   
    const {_id:userId} = req?.user
    // console.log(req.query);
    const {bookName} = req.query
    let filter= {
        status:'approved'
    }
    if(bookName) filter.bookName={ $regex: bookName, $options: 'i' } //like in sql

    const result = await Library.find(filter)
    // console.log(result);
    const resultCount = result?.length || 0

    res.status(200).json(new ApiResponse(200,1,'success',result,resultCount))

})
export const approveBooksForAdmin = asyncHandler(async(req,res)=>{
   
    const {_id:userId} = req?.user
    const {decisionParameter} = req?.body
    // console.log(req?.params)
    const {bookId} =req?.params
    if(!bookId) throw new CustomError(400,'Invalid req params')
    if(!mongoose.Types.ObjectId.isValid(bookId)) throw new CustomError(400,'Invalid BookId') 
     const book = await Library.findById(bookId)
    if(!book)  throw new CustomError(400,'Book Not found!')   
    if(book?.status!='pending')  throw new CustomError(400,'Book already recjeted/approved')

        await Library.findByIdAndUpdate(bookId,{
            $set :{
                status: decisionParameter
            }
        })

    res.status(200).json(new ApiResponse(200,1,`Book ${decisionParameter} suceessfully`))

})