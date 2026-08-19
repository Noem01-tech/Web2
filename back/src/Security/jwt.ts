import jwt from"jsonwebtoken";
import { Request,Response,NextFunction, RequestHandler } from "express";
import dotenv from "dotenv";
import { Role } from '../Model/User';

interface TokenPayload{
    id: number;
    role:Role;
}

dotenv.config();

const JWT_SECRET=process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET manquant");
}

export const generateToken=(payload: TokenPayload)=>{
    if(!payload || payload.id==undefined){
        throw new Error("ID requis ");
    }
    return jwt.sign(payload,JWT_SECRET,{
        expiresIn:"1h"
    });

};


interface authentificationRequest extends Request{
    user?: any;
}

export const authentificationToken=(
    req: authentificationRequest,
    res: Response,
    next: NextFunction
)=>{
    const authorization=req.headers["authorization"];

    const token=authorization && authorization.split(" ")[1]; //si authHeader existe alors token = bearer dqljchljdjqhjnd sans le bearer

    if(!token){
        return res.status(401).json({message:"non authentifie"});
    }

    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({
                message:"Token invalide ou expire"
            })
        }
        req.user=decoded;
        next();
    })
}


// ... operateur de rest => passer un nmbre variable d'arguments sous forme de tableau
export const authorized=(...roles:Role[]):RequestHandler=>(
        req:authentificationRequest,
        res:Response,
        next:NextFunction)=>{
            const userRole=req.user?.role;

        if(!roles.includes(userRole)){
            return res.status(403).json({message:"Acces refuse"})
        }
        next()
    }
