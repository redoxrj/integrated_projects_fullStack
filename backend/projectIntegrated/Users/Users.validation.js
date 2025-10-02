import Joi from "joi";

export const createUserSchema= Joi.object({
    fullName : Joi.string().required().strict(),
    username : Joi.string().required().strict(),
    email : Joi.string().email().required().strict(),
    password : Joi.string().required().strict().min(8),
})
export const loginUserSchema= Joi.object({
    email : Joi.string().email().required().strict(),
    password : Joi.string().required().strict().min(8),
})