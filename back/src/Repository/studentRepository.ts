import{Student,CreateStudentDTO, UpdateStudentDTO}from '../Model/Student';
import pool from "../db/database"
import { User } from '../Model/User';

export const findAll=async(): Promise<Student[]>=> {
    const result= await pool.query("SELECT * FROM students");
    return result.rows //permet de recuperer les donnees sinon on recoit plein d'autres metadonnees
}

export const findUserByEmail=async(email: string):Promise <User| null> =>{
    const result= await pool.query("SELECT * FROM \"users\" WHERE email = $1",[email]);

    if(result.rows.length===0) return null;

    return result.rows[0]; //premier user
}

export const findById=async(id : number):Promise <Student| null> =>{
    const result= await pool.query("SELECT * FROM students WHERE id = $1",[id]);

    if(result.rows.length===0) return null;

    return result.rows[0]; //premier etudiant
}

export const create=async(user:CreateStudentDTO): Promise<Student>=>{
    const result= await pool.query("INSERT INTO students (email,name,phone,date_of_birth) VALUES ($1, $2,$3,$4) RETURNING *", // returning permet de renvoyer la ligne qui vient d'etre creee + (choisir les colonnes a afficher)
                [user.email,user.name,user.phone,user.dateOfBirth]
    )
    return result.rows[0];
}

export const update=async(id: number,student: UpdateStudentDTO ): Promise<Student | null>=>{
    const result= await pool.query("UPDATE students SET email= $1, phone= $2 where RETURNING *",[student.email, student.phone]);
    return result.rows.length===0?null:result.rows[0];
}

export const remove=async(id: number): Promise<Student | null>=>{
    const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *",[id]);
    return result.rows.length===0? null : result.rows[0];
}