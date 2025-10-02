import express from 'express'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'
import projectIntegratedRouter from './projectIntegrated/projectIntegrated.routes.js'

const app = express()
app.use(express.json({limit:'100kb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/ping',(req,res)=>{
    
    res.status(200).json({flag:1,flag_message:"working"})

})
app.get('/error',(req,res,next)=>{
    
    // throw new Error("errror agaya h") // sync error so app never hard crash ,express khud manage kar leta
    setTimeout(()=>{
        try {
            throw new Error("errror agaya h") // async error se app hard crash ho jata h jisesy other working resourses/api bhi ni chalati poori app hi band ho jaati h very bad that's why a gloval error catcher is important // express is not able to auto-manange async error thta'why alwasy use try-cath
        res.status(200).json({flag:1,flag_message:"working"})
        } catch (error) {
            // throw error // by just this will crash the entire app
            next(error)  // send the error to Express error middleware ,if there’s no custom error middleware, Express has a built-in default error handler.
            
        }

    },4000)

})

app.use('/api/v1/projectIntegrated',projectIntegratedRouter)
app.use(errorHandler) // cannot call here like app.use(errorCatcher()) since it is a function we created else it will run by hard codingly we have to just pass refrence // this errorHandler middlware works well for sync error too


export default app