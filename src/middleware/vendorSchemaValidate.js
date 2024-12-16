const vendorSchemaValidate = (vendorValidation) => {
    return (req, res, next) => {
        const { error } = vendorValidation.validate(req.body.Vendor); // Validate the nested "Vendor" object in the request body
        if (error) {
            return res.status(400).json({
                error: error.details[0].message,
            });
        }
        next();
    };
};

export {
    vendorSchemaValidate
}