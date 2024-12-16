import mongoose from "mongoose";
import { Schema } from "mongoose";


const orderSchema = new Schema({
    product_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
    },
    vendor_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vendor",
    },
    quantity:{
        type:Number,
        required : true,
        min:0,
    },

    status:{
        type: String,
        enum: ["pending", "shipped"],
        default:"pending"
    },
    createdAt:{
        type:Date,
        default : Date.now
    }
})
const Order = mongoose.model("Order",orderSchema);
export default Order;