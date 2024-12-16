

import mongoose from "mongoose";
import { Schema } from "mongoose";


const vendorSchema = new Schema({
    name:{ 
        type: String, 
        required: true, 
        trim: true
    },
    email:{
        type : String,
        required : true,
    },
    password:{
        type:String,
    },
    createdAt:{
        type: Date, 
        default: Date.now,
    },
});

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
