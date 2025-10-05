import Joi from "joi";

export const addBookSchema =Joi.object({
    bookName:Joi.string().required().strict().max(100),
    bookDescription:Joi.string().required().strict(),
})
export const updateBookFileSchema =Joi.object({
    bookId:Joi.string().required().strict().max(100),
})
export const updateBookSchema =Joi.object({
    bookName:Joi.string().required().strict().max(100),
    bookDescription:Joi.string().required().strict(),
})
export const queryMyBookSchema =Joi.object({
    status:Joi.string().optional().allow(null,''),
    bookName:Joi.string().optional().allow(null,''),
})
export const approveBooksAdminSchema =Joi.object({
    decisionParameter:Joi.string().required().strict().valid('approved','rejected'),
})