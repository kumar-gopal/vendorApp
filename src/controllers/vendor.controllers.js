import bcrypt from "bcrypt";
import Vendor from "../models/models.vendor.js";
import jwt from "jsonwebtoken";

/*
    desc -> register for vendor
    route Post
    access public
 */
const vendorRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if vendor already exists
        const alreadyExistsVendor = await Vendor.findOne({
            $or: [{ name }, { email }]
        });

        if (alreadyExistsVendor) {
            return res.status(400).json({
                success: false,
                message: "Vendor already exists"
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create a new vendor
        const vendor = new Vendor({
            name,
            email,
            password: hashPassword
        });

        // Save the vendor to the database
        await vendor.save();

        res.status(201).json({
            success: true,
            message: "Vendor successfully registered",
            vendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering vendor",
            error: error.message
        });
    }
};

/*
    desc -> Login for vendor
    route Post
    access public
 */

const vendorLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        const vendor = await Vendor.findOne({email});
        if(!vendor){
            res.status(400);
            throw new Error("Vendor does not exists !");
        }
        // compare password with hashpassword
        if(vendor && (bcrypt.compare(password, vendor.password))){
                // sending Token
                const accessToken = jwt.sign({
                    // payload
                    vendor:{
                        name:vendor.name,
                        email:vendor.email,
                        id:vendor._id
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn:"50m"
                }
            );
           return  res.json({accessToken});
        }else{
            res.status(401);
            throw new Error("email or password is not valid");
        }
    } catch (error) {
        console.error("Error in Login:", error.message); 
        res.status(500).send("Internal Server Error"); 
    }
    
}


export {
    vendorRegister,
    vendorLogin,
}