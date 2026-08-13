import { Request,Response} from "express";

import { getStudents,
        getStudentById,
        createStudent,
        updateStudent,
        deleteStudent
 } from "../Service/studentService";
import { read } from "node:fs";
import { Student } from "../Model/Student";

export async function getAllStudents(req:Request,res:Response){
    try{
        const students= await getStudents();
        res.status(200).json(students);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Erreur du serveur"
        });
    }
}

export async function getStudent(req:Request,res:Response){
    try{
        const id= Number(req.params.id)

        if(Number.isNaN(id)){
            res.status(400).json({
                message: "ID invalide"
            });
            return;
        }
        const student= await getStudentById(id);

        if(!student){
            res.status(404).json({
                message:"eleve non trouve"
            });
            return;
        }
        res.status(200).json(student);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Erreur du serveur"
        });
    }
}

    export async function createNewStudent(req:Request,res:Response) {
        try{
            const {name, lastName}=req.body;

            if(!name || !lastName){
                res.status(400).json({
                    message:"name et lastName sont obligatoires"
                });
                return;
            }
            const student =await createStudent({name, lastName});

            res.status(201).json(student);
        }catch(error){
            console.error(error);

            res.status(500).json({
                message:"Erreur du serveur"
            });
        }
    }

    export async function updateAStudent(req:Request,res:Response){
        try{
            const id=Number(req.params.id);

            if(Number.isNaN(id)){
                res.status(400).json({
                    message:"Id invalide"
                });
                return;
            }
            const {name,lastName}=req.body;

            if(!name || !lastName){
                res.status(400).json({
                    message:"name et lastName sont obligatoires"
                });
                return;
            }

            const user= await updateStudent(id,{name,lastName});
            if(!user){
                res.status(404).json({
                    message:"eleve non trouve"
                });
                return;
            }
            res.status(200).json(Student);
        }catch(error){
            console.error(error);

            res.status(500).json({
                message:"Erreur du serveur"
            });
        }
    }

    export async function removeStudent(req:Request,res:Response){
            try{
                const id=Number(req.params.id);

                if(Number.isNaN(id)){
                    res.status(400).json({
                        message:"Id invalide"
                    });
                    return;
                }

                const student= await deleteStudent(id);

                if(!student){
                    res.status(404).json({
                        message:"eleve introuvable"
                    });
                    return;
                }
                res.status(200).json({
                    message:"eleve supprime",student
                });
            }catch(error){
                console.error(error);
                res.status(500).json({
                    message:"Erreur du serveur"
                });
            }
        }



 