import CustomError from "../utils/CustomError.js";


const bodyValidator = (bodySchema) => { // this is also HOF
    return async (req, res, next) => {
      try {
        // console.log(req.body);
        
        // console.log(req.body);
        if(!req.body) throw new CustomError(400,'Invalid Request Body')

        const result = bodySchema.validate(req.body);
        //  console.log("result",result);
  
        if (result.error) {
          let ErrorArr = result?.error?.details[0]?.message.split('"');
          // console.log('ErrorArr',ErrorArr);
          throw new CustomError(400,`${ErrorArr[1]}${ErrorArr[2]}`)
  
        }
        // console.log("done");
        
        next();
      } catch (error) {
        next(error)
        
      }
    };
};
export const queryValidator = (querySchema) => { // this is also HOF
    return async (req, res, next) => {
      try {
        const result = querySchema.validate(req.query);
        //  console.log("result",result);

        if (result.error) {
          let ErrorArr = result?.error?.details[0]?.message.split('"');
          // console.log('ErrorArr',ErrorArr);
          throw new CustomError(400,`${ErrorArr[1]}${ErrorArr[2]}`)
  
        }
        // console.log("done");
        
        next();
      } catch (error) {
        next(error)
        
      }
    };
};

export default bodyValidator