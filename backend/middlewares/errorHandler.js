export const errorHandler= (err,req,res,next)=>{ //error-handling middleware must always have 4 parameters:

    // console.log(11111111111111);
    console.log(err.message);
    console.log(err.stack);

    return res.status(err.statusCode || 500).json({flag:0,flag_message:err.message || "something went wrong"})

}