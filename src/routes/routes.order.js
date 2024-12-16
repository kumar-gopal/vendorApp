import express from "express";
const router = express.Router();
import { validateToken } from "../middleware/validateTocken.js";
import { 
            AllShippedOrder,
            OrderShipment
       } from "../controllers/order.controllers.js";
import Order from "../models/models.order.js";


/*
    Order Management:
    7. GET /api/orders - List all orders for the vendor’s products
    8. PUT /api/orders/:id - Mark an order as shipped
*/

router.get("/",validateToken,AllShippedOrder);
router.put("/:id",validateToken,OrderShipment);

export default router;