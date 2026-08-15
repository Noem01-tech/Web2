import jwt from"jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import dotenv from "dotenv";

interface TokenPayload{
    id: number;
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
    student?: any;
}

export const authentificationToken=(
    req: authentificationRequest,
    res: Response,
    next: NextFunction
)=>{
    const authHeader=req.headers["authorization"];

    const token=authHeader && authHeader.split(" ")[1]; //si authHeader existe alors token = bearer dqljchljdjqhjnd sans le bearer

    if(!token){
        return res.status(401).json({message:"non authentifie"});
    }

    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({
                message:"Token invalide ou expire"
            })
        }
        req.student=decoded;
        next();
    })
}
