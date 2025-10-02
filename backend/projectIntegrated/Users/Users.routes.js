import express from 'express'
import { createUser, getCurrentUser, loginUser, logoutUser, restartSession } from './Users.controller.js'
import bodyValidator from '../../middlewares/bodyValidator.js'
import { createUserSchema, loginUserSchema } from './Users.validation.js'
import {upload} from '../../middlewares/multer.js'
import { authentication } from '../../middlewares/authentication.js'

const usersRouter = express.Router()

usersRouter.post('/create',
// bodyValidator(createUserSchema), // multer shoould run first (extracts files and text fields from the multipart/form-data request → puts them into req.files and req.body) before bodyValidator else undefined hoga req.body
upload.fields([
    {
        name:'avatar',
        maxCount:1,
        
    }
]),
bodyValidator(createUserSchema),
createUser)

usersRouter.post('/login',bodyValidator(loginUserSchema),loginUser)
usersRouter.post('/logout',authentication,logoutUser)
usersRouter.post('/restartSession',restartSession)
usersRouter.get('/getCurrentUser',authentication,getCurrentUser)

export default usersRouter