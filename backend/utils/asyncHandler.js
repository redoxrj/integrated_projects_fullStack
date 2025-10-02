const asyncHandler = (func)=>{ //HOF

    return async (req,res,next)=>{   // return krega ke func/callback/handler expres ke router ke liye handler jismien uper passed func execuete ho rha hoga but rrteuneed func kuch paramters le rha hoga or use paramtes ke ssath passed on func execuete ho rha hoga
        try {
             await func(req,res,next)
        } catch (error) {
            next(error)
            
        }

    }


}

export {asyncHandler}