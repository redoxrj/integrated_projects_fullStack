import multer from "multer"
import fs from 'fs'
import CustomError from "../utils/CustomError.js"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './tmp/my-uploads' //considers from root folder . use krey se else current parent drive(D:// in this case)
   try {
     if (!fs.existsSync(dir)){
         fs.mkdirSync(dir,{recursive:true})
     }
    cb(null, dir)

   } catch (error) {
    // next(error) // ,1. multer dont have access of next() of express ,so
    cb(error,null) // 2. only way for error cacthing ,from this express ka error handler catch kar lega(custom errorHandler bnarkhai hai toh thik wrna experss ka khudka default errorHandler )
    // throw new CustomError(500,'something went wrong while saving file!') //3. app will hard crash ,gloval error handling won't be done coz throwing an error inside Multer’s callback does not get caught by Express’s next() system, because Multer manages its own async flow.  Since multer.diskStorage runs before Express routing, Express’s global error handler never sees it ,hence Result: Node process crashes.
    
   }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-'  + file.originalname  )
  }
})

export const upload = multer({ storage: storage })