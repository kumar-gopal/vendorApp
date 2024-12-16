import express from "express";
const app = express();
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
dotenv.config();

import dbConnect from "./config/connectionDb.js";
import productRoutes from "./routes/routes.product.js";
import vendorRoutes from "./routes/routes.vendor.js";
import orderRoutes from "./routes/routes.order.js";


// Define a rate-limiting rule
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after a minute.",
});

// Apply to all routes
app.use("/api",limiter);

// Connect to the database
dbConnect();

const PORT = process.env.PORT || 5001;
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


// routes
app.use("/api/products",productRoutes);
app.use("/api/vendors",vendorRoutes);
app.use("/api/orders",orderRoutes);

app.get("/",(req,res)=>{
    res.send("working");
})
app.listen(PORT, (req, res) => {
    console.log(`App is running on port ${PORT}`);
});
