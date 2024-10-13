import {app} from './app.js'
import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path:"./.env"
})


let port =process.env.port || 8001

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)


})
})
.catch((err) => {
    console.log(err)


})