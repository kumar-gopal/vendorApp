import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // Check if the authorization header exists and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]; // Extract the token from the header

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized" });
            }
            console.log(decoded); 
            req.vendor = decoded.vendor; // Add decoded data to the request object
            next(); 
        });
    } else {
        return res.status(401).json({ message: "Vendor is not authorized to perform the operation!" });
    }
};

export {
    validateToken
};
