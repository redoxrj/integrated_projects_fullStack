import app from './app.js'
import dotenv from 'dotenv'
dotenv.config({path :'./.env'})

import {connectDb} from './Database/db.js'

const dbPromise=connectDb()
dbPromise.then((value)=>{ // or, connectDb().then()
    // console.log(value);
    console.log('DB CONNECTED SUCESSFULLY!');
    const port = process.env.PORT || 5000
    app.listen(port,()=>{
        console.log(`App lisenting on port: ${port}`);
    })
    
}).catch((error)=>{
    console.log("DB CONNECT ERROR : " ,error.message);

})

