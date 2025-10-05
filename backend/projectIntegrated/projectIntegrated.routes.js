import express from 'express'
import usersRouter from './Users/Users.routes.js'
import libraryRouter from './Library/Library.routes.js'


const projectIntegratedRouter = express.Router()

projectIntegratedRouter.use('/users',usersRouter)
projectIntegratedRouter.use('/library',libraryRouter)

export default projectIntegratedRouter