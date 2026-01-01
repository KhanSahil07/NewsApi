import jwt from "jsonwebtoken";


const authMiddleWare=(req,res,next) =>{
    const authHeader=req.headers.authorization;
    if(authHeader===null || authHeader===undefined){
        return res.status(401).json({status:401,message:"unAuthorized"});
    }
    const token=authHeader.split(" ")[1];

    //*verify the Jwt token 
    jwt.verify(token,process.env.JWT_SECRET,(err,user) =>{
        if(err) return res.status(401).json({status:401,message:"unAuthorized"});

            req.user=user;
            next();
    });

}
export default authMiddleWare;



