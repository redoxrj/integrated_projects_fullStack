import express from 'express'
import { addBook, approveBooksForAdmin, searchBooksForAdmin, searchMyBooks, updateBookDetails, updateBookFile, viewLibraryBooksPublic } from './Library.controller.js'
import { authentication } from '../../middlewares/authentication.js'
import { upload } from '../../middlewares/multer.js'
import bodyValidator, { queryValidator } from '../../middlewares/bodyValidator.js'
import { addBookSchema, approveBooksAdminSchema, queryMyBookSchema, updateBookSchema } from './Library.validation.js'
import { authorization } from '../../middlewares/authorization.js'

const libraryRouter = express.Router()

libraryRouter.post('/addBook',authentication,upload.single('book'),bodyValidator(addBookSchema),addBook)
libraryRouter.put('/updateBookFile/:bookId',authentication,upload.single('book'),updateBookFile)
libraryRouter.put('/updateBookDetails/:bookId',authentication,bodyValidator(updateBookSchema),updateBookDetails)
libraryRouter.get('/searchMyBooks',authentication,queryValidator(queryMyBookSchema),searchMyBooks)
// libraryRouter.get('/searchBooksForAdmin',authentication,authorization,queryValidator(queryMyBookSchema),searchBooksForAdmin) // will not work  as authorization is not executed so it nerver return actual middlware,so request hangs
libraryRouter.get('/searchBooksForAdmin',authentication,authorization('admin','superAdmin'),queryValidator(queryMyBookSchema),searchBooksForAdmin)
libraryRouter.get('/viewLibraryBooksPublic',authentication,queryValidator(queryMyBookSchema),viewLibraryBooksPublic)
libraryRouter.put('/approveBooksForAdmin/:bookId',authentication,authorization('admin','superAdmin'),bodyValidator(approveBooksAdminSchema),approveBooksForAdmin)

export default libraryRouter