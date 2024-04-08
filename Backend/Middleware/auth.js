const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            console.log('Authorization header is missing');
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            console.log('Token is missing');
            return res.status(401).json({ message: "Token is missing" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                console.error('Token verification failed:', err);
                return res.status(401).json({ message: "Token verification failed" });
            }
            req.user = user;
            console.log('User authenticated:', user);
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = auth;
