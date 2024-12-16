import Order from "../models/models.order.js";
import Product from "../models/models.product.js";

const AllShippedOrder = async (req, res) => {
    try {
        const { vendor_id } = req.query; 
        const orders = await Order.find({
            $and: [
                { status: "shipped" },
                { vendor_id: req.vendor.id } 
            ]
        });
        res.status(200).json(orders); 
    } catch (error) {
        console.error("Error fetching shipped orders:", error); 
        res.status(500).json({ message: "Failed to fetch shipped orders" }); 
    }
};



const OrderShipment = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body; 
        
        // Check if the product exists and has sufficient quantity
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient product quantity" });
        }
        // checking 
        // Create a new order
        const createdOrder = new Order({
            quantity,
            status: "shipped",
            product_id: id,
            vendor_id: req.vendor.id
        });

        await createdOrder.save();

        // Deduct the ordered quantity from the product's stock
        product.stock -= quantity;
        await product.save();

        res.status(201).json({ message: "Order placed successfully", order: createdOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ error: "Order has not been placed yet!" });
    }
};


export {
    AllShippedOrder,
    OrderShipment
}