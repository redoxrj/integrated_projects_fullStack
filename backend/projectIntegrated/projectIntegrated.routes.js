import express from 'express'
import usersRouter from './Users/Users.routes.js'


const projectIntegratedRouter = express.Router()

projectIntegratedRouter.use('/users',usersRouter)

export default projectIntegratedRouter