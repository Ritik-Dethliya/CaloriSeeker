import jwt from "jsonwebtoken"

export function isAuth(req,res,next){
    try {
        //console.log(req.headers)
        const {authorization}=req.headers ;
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).send({ msg: "Unauthorized. Token missing or malformed." });
        }
        
        let token=authorization.split(" ")[1] ;
        const decoded=jwt.verify(token,"ritik");
        console.log(decoded)
        if(decoded?.userId){
            req.userId=decoded.userId ;
            next();
        }
        else{
            res.status(400).send({msg:"token is Expired Please Login in Again"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Something Went wrong"});
    }
}
// "Authorization": `Bearer ${token}`,