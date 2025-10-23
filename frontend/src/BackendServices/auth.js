import axios from "axios"

class AuthService {
    constructor(){
        this.baseUrl = import.meta.env.VITE_BACKEND_BASE_URL // properties set auotmaice wherennver this class ka koi object bnagea usi time pe
    }
    //axios.post(url, data?, config?)
   /* 1st param → URL

2nd param → data (payload) (if none then {})

3rd param → config (headers, credentials, etc.)

axios.get(url, config?)
1st param → URL
2nd param → config only
There’s no payload/data in a GET request by HTTP spec, so Axios doesn’t expect a data argument.
*/

    async createUser(formdata){ //  methods now all async in nature
        try {
            const payload=formdata
            const response = await axios.post(`${this.baseUrl}/users/create`,payload,
            {
                headers:{
                    'Content-Type':"multipart/form-data"
                }
            }    

            )
            return response?.data
            
        } catch (error) {
            // console.log(error);
            
            throw error
            
        }
    }
    async loginUser(payload){
        try {
            const response = await axios.post(`${this.baseUrl}/users/login`,payload,
                {
                    headers :{
                        'Content-Type' : 'application/json'
                    }
                }
            )
            return response?.data
            
        } catch (error) {
            throw error
        }

    }
    async logoutUser(){
        try {
            const response = await axios.post(`${this.baseUrl}/users/logout`,{},
                {
                    headers :{
                        'Content-Type' : 'application/json'
                    },
                    withCredentials:true,  //user's cookies sent automatically
                    headers : {
                        'Authorization' : localStorage.getItem('accessToken')
                    }
                }
            )
            return response?.data

            
        } catch (error) {
            throw error

            
        }

    }
    async restartSessionUser(){
        try {
            const response = await axios.post(`${this.baseUrl}/users/restartSession`,{},
                {
                    headers :{
                        'Content-Type' : 'application/json'
                    },
                    withCredentials:true  //user's cookies sent automatically
                }
            )
            return response?.data

            
        } catch (error) {
            throw error

            
        }

    }
    async getCurrentUser(){
        try {
            const response = await axios.get(`${this.baseUrl}/users/getCurrentUser`,
                {
                    withCredentials:true,  //user's cookies sent automatically //telling the browser:// “Please include cookies / session / JWT tokens in this request.”,
                    headers : {
                        'Authorization' : localStorage.getItem('accessToken')
                    }

                }
            )
            return response?.data

            
        } catch (error) {
            throw error

            
        }

    }

}

const authService= new AuthService()

export default authService // exporting object made from this class/service intead of whole class so that no need to write new keyword while making a object fromv this class evyetime