import Joi from "joi"

// Product Validation Schema
const productValidate = Joi.object({
    Product: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(1).required(), 
        stock: Joi.number().min(1).required(), 
    }).required(),
});

// Vendor Validation Schema
const vendorValidation = Joi.object({
    Vendor: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(), 
        password: Joi.string().required(),
    }).required(),
});

// Order Validation Schema
const orderValidation = Joi.object({
    Order: Joi.object({
        quantity: Joi.number().min(1).required(),
    }).required(),
});

export {
    vendorValidation,
    orderValidation,
    productValidate
};
