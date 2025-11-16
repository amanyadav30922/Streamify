import jwt from 'jsonwebtoken';
import User from '../models/User.js';



export const protectRoute = async (req, res, next) => {
    try {
           // Log the request method and URL
    console.log("protectRoute — Incoming request:", req.method, req.originalUrl);

    // Log all cookies parsed by cookie-parser
    console.log("protectRoute — req.cookies:", req.cookies);

       const token = req.cookies.jwt;
       console.log("protectRoute — JWT token from cookie:", token); 
         if (!token) {
                console.log("protectRoute — No token found in cookies");
              return res.status(401).json({ message: "Unauthorized access" });}

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log("protectRoute — Decoded JWT:", decoded);
        if(!decoded){
            
      console.log("protectRoute — Token decoded is falsy / invalid");
  
            return res.status(401).json({ message: "Unauthorized access-Invalid Token" });
        }
        const user= await User.findById(decoded.userId).select("-password")
        if(!user){
              console.log("protectRoute — No user found for decoded ID");
            return res.status(401).json({ message: "Unauthorized access-User not found" });
        }
        req.user = user;
         console.log("protectRoute — Setting req.user and calling next()");
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}