import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, callback) {
    const authHeader = req.headers.authorization;
    console.log("authHeader", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request


        // ✅ Execute the callback function after authentication
        return callback();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ error: "Unauthorized - Invalid token" });
    }
}
