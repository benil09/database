import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"




const connectDB = async () =>{
    
    try{
     const connectionInstance =   await mongoose.connect(`${process.env.mongoDB_URL}/${DB_NAME}`)
     console.log(`\nmongoDB connected ! db Host : ${connectionInstance.connection.host}`);
     

    }catch(error){
     console.log("mongoDB connection  error : ",error)
     process.exit(1)
    }
 
 
}



export default connectDB;