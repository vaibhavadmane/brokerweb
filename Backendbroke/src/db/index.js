import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB= async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n mongodb connected !!DB host : ` );
    }
    catch (err){
      console.log("mongodb connection error ",err)
      process.exit(1)
    }
}
export default connectDB