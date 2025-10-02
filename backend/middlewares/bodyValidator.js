import CustomError from "../utils/CustomError.js";


const bodyValidator = (bodySchema) => { // this is also HOF
    return async (req, res, next) => {
      try {
        // console.log(req.body);
        if(!req.body) throw new CustomError(400,'Invalid Request Body')
  
        const result = bodySchema.validate(req.body);
        //  console.log("result",result);
  
        if (result.error) {
          let ErrorArr = result?.error?.details[0]?.message.split('"');
          // console.log('ErrorArr',ErrorArr);
  
          // return res.status(400).json({flag_message :`${ErrorArr[1]}${ErrorArr[2]}` ,flag:0})
          throw new CustomError(400,`${ErrorArr[1]}${ErrorArr[2]}`)
  
        }
        if (!req.value) {
          req.value = {};
        }
        req.value["body"] = result.value;
        // console.log("done");
        
        next();
      } catch (error) {
        next(error)
        
      }
    };
  };

export default bodyValidator