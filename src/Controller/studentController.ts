import{StudentService}from"../Service/studentService";
import { Request,Response, Express } from "express";

const studentService=new Studentservice();

export const getAllUsers= async(req:Request,res:Response)=>{
    try{
        const students=await studentService.getAll();
        res.status(200).json(students);
    }catch(error){
        res.status(500).json
    }
}


 