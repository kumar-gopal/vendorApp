import Product from "../models/models.product.js"; 

// Get Products with Pagination
const getProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 5; // Default to 10 items per page
        const skip = (page - 1) * limit; // Calculate how many documents to skip

        // Fetch products with pagination
        console.log("req.vendor_id -> ",req.vendor.id);
        
        if (!req.vendor.id) {
            return res.status(400).json({
                success: false,
                message: "Vendor ID is missing or invalid.",
            });
        }
        
        const products = await Product.find({vendor_id:req.vendor.id})
            .skip(skip)
            .limit(limit);

        // Count total documents
        const total = await Product.countDocuments({vendor_id:req.vendor.id});

        // Send paginated response
        res.status(200).json({
            success: true,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error:error.message
        });
    }
};

// Create a New Product
const CreateProduct = async (req, res) => {
    try {
        let { name, price, stock } = req.body;

        // Create a new product instance
        const newCreatedProduct = new Product({
            name,
            price,
            stock,
            vendor_id : req.vendor.id
        });

        // Save the product to the database
        const savedProduct = await newCreatedProduct.save();

        // Send success response
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: savedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Error while creating product",
            error,
        });
    }
};

// Update a Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;

        // Update the product by ID
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, stock },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Error while updating product",
            error,
        });
    }
};

// Delete a Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the product by ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};


export { 
    getProduct, 
    CreateProduct, 
    updateProduct, 
    deleteProduct 
};
