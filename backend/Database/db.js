import mongoose from "mongoose"

const connectDb=async()=>{
// console.log(process.env.DB_URI);

    try {
        const connectionString= `${process.env.DB_URI}/${process.env.DB_NAME}`
        const result  = await mongoose.connect(connectionString)
        return result // if return keyword is not there is async function for a supposed return value then the promise will be resolved(if it dont go in cacth bloack) with undefined as resolved value
        
        
    } catch (error) {
        // console.log(error);
        throw error
        
        
    }

}

export {connectDb}