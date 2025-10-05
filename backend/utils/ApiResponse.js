class ApiResponse{

    constructor(statusCode=200,flag=1,flag_message='success',data=null,count=null){
        this.statusCode=statusCode
        this.flag=flag
        this.flag_message=flag_message
        this.count=count
        this.data=data

    }

}

export default ApiResponse