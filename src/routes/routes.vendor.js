import express from "express";
const router = express.Router();
import {vendorSchemaValidate} from "../middleware/vendorSchemaValidate.js";
import {vendorValidation} from "../joiSchema/schemaValidationWithJoi.js"
import {vendorRegister , vendorLogin} from "../controllers/vendor.controllers.js";



// 1. POST /api/vendors/register - Vendor registration
  router.post("/register",vendorSchemaValidate(vendorValidation),vendorRegister);
 
// 2. POST /api/vendors/login - Vendor login
router.post("/login",vendorLogin);

export default router;