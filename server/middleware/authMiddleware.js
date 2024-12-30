import StatusCode from "http-status-codes"
import JWT from "jsonwebtoken";

export const AuthMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(StatusCode.FORBIDDEN).json({message: "Invalid Authentication"})
    }
    const token = authHeader.split(" ")[1];
    try{
        const payload = JWT.verify(token, process.env.JWT_TOKEN)
        req.user = {userId: payload.userID, username: payload.username}
        next();
    }catch(err){
        res.status(StatusCode.FORBIDDEN).json({message: "Invalid Authentication", error: err.message})
    }
}