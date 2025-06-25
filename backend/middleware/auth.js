const jwt = require('jsonwebtoken')

require('dotenv').config();
exports.auth = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ","").trim();
        if(!token){
            return res.status(404).json({
                success:false,
                msg:"token not found"
            })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            
        } catch (error) {
            console.error("Error verifying token:", error.message); 
            return res.status(401).json({
                success: false, 
                msg: "Token is invalid"
            });
        }

        next();
    } catch (error) {
        console.error("Error in auth middleware:", error.message); 
        return res.status(401).json({
            success: false,
            msg: "Unauthorized. Token processing failed"
        });
    }
}