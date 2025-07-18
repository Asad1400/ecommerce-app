import mongoose from "mongoose";
const mongoURL = "mongodb+srv://221400077:d00H5PO22IXtV8Sz@cluster0.ynpnhgu.mongodb.net/Click2Eat"
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected" , ()=>{
    console.log("Mongo Connected Successfully");
    
} )

db.on("error" , ()=>{
    console.log("Error in Connection");
    
} )

export default mongoose;


