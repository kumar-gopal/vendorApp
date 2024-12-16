import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
    name:{ 
        type: String, 
        required: true, 
        trim: true,
    },
    price:{ 
        type: Number, 
        required: true, 
        min: 0,
    },
    stock:{ 
        type: Number, 
        required: true, 
        min: 0,
    },
    vendor_id:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Vendor", 
     },
    createdAt:{ 
        type: Date, 
        default: Date.now,
    }
});


const Product = mongoose.model("Product",productSchema);
export default Product;