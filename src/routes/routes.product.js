import express from "express";
const router = express.Router();
import {productSchemaValidate} from "../middleware/productSchemaValidate.js";
import {productValidate} from "../joiSchema/schemaValidationWithJoi.js"
import { getProduct, CreateProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";
import {validateToken} from "../middleware/validateTocken.js"


// /api/products List all products (pagination required: ?page=1&limit=10)
router.get("/",validateToken,getProduct);

// /api/products Add a new product
router.post("/",validateToken,productSchemaValidate(productValidate),CreateProduct);


// PUT /api/products/:id - Update product details
router.put("/:id",validateToken,productSchemaValidate(productValidate),updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete("/:id",validateToken,deleteProduct);

export default router;