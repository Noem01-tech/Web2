import { Request,Response} from "express";
import { generateToken } from "../Security/jwt";
import bcrypt from"bcrypt";

import { getStudents,
        getUserByEmail,
        getStudentById,
        createStudent,
        updateStudent,
        deleteStudent,
        createUser
 } from "../Service/studentService";

import { Student } from "../Model/Student";

//partie login

export const login=async(req:Request,res:Response)=>{
    try{
        const {email}=req.body;
        const {password}=req.body;
        if(!email && !password){
            return res.status(400).json({
                message:"authentification refusee"
            });
        }
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({
                message: "Aucun utilisateur avec cet email"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Mot de passe incorrect"
            });
        }

        const token=generateToken({
            id:user.id,role:user.role
        });

        return res.status(200).json({
            message:"connexion reussie",
            token:token,
        });
    }catch(error){
        console.error("erreur du serveur",error);
        return res.status(500).json({
            message:"Erreur du serveur"
        })
    }
}

//partie pour avoir les resultats des requetes

export const getAllStudents=async(req:Request,res:Response)=>{
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

export const getStudent=async(req:Request,res:Response)=>{
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

    export const createNewStudent= async(req:Request,res:Response)=> {
        try{
            const {email,name,phone,dateOfBirth}=req.body;

            if(!email || !name || !dateOfBirth){
                res.status(400).json({
                    message:"email name et date de naissance sont obligatoires"
                });
                return;
            }
            const student =await createStudent({email,name,phone,dateOfBirth});

            res.status(201).json(student);
        }catch(error){
            console.error(error);

            res.status(500).json({
                message:"Erreur du serveur"
            });
        }
    }

    export const createNewUser= async(req:Request,res:Response)=> {
        try{
            const {email,password,role}=req.body;

            if(!email || !password || !role){
                res.status(400).json({
                    message:"email ,password et role sont obligatoires"
                });
                return;
            }
            const user =await createUser({email,password,role});

            res.status(201).json(user);
        }catch(error){
            console.error(error);

            res.status(500).json({
                message:"Erreur du serveur"
            });
        }
    }

    export const updateAStudent=async(req:Request,res:Response)=>{
        try{
            const id=Number(req.params.id);

            if(Number.isNaN(id)){
                res.status(400).json({
                    message:"Id invalide"
                });
                return;
            }
            const {email,phone}=req.body;

            if(!email && !phone){
                res.status(400).json({
                    message:"au moins un changement obligatoire"
                });
                return;
            }

            const student= await updateStudent(id,{email,phone});
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

    export const removeStudent=async(req:Request,res:Response)=>{
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



 