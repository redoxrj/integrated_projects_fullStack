class CustomError extends Error {

    constructor(statusCode=500,message='something went wrong'){
        super(message)  // parent class custontror call is mandatoty
        this.statusCode=statusCode // added extra property of statusCode
        // this.message=message // no need due to parent class custontror call

    }

}

export default CustomError