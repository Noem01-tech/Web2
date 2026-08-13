import { type Request,type Response } from "express";
import {StudentService} from "../Service/studentService";

export class UserController {
    constructor(private userService:UserService){}

    getAllusers= async(req:Request, res: Response)=>{
        const users= await UserService.getAllUsers();
        res.json(users); 
    }
}