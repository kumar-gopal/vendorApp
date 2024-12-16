const productSchemaValidate = (schema) => {
    return (req, res, next) => {
        const {name,price ,stock}=req.body;
        console.log(`${req.body.Product}`);
        
        const { error } = schema.validate(req.body.Product); // Validate the request body
        if (error) {
            return res.status(400).json({
                error: error.details[0].message,
            });
        }
        next();
    };
};

export  {productSchemaValidate};
