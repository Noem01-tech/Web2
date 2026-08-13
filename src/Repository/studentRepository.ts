import{Student,CreateStudent}from '../Model/Student';
import pool from "../db/database"

export async function findAll(): Promise<Student[]> {
    const result= await pool.query("SELECT * FROM students");
    return result.rows //permet de recuperer les donnees sinon on recoit plein d'autres metadonnees
}

export async function findById(id : number):Promise <Student| null> {
    const result= await pool.query("SELECT * FROM students WHERE id = $1",[id]);

    if(result.rows.length===0) return null;

    return result.rows[0]; //premier etudiant
}

export async function create(user:CreateStudent): Promise<Student>{
    const result= await pool.query("INSERT INTO students (name,last_name) VALUES ($1, $2) RETURNING *", // returning permet de renvoyer la ligne qui vient d'etre creee+ (choisir les colonnes a afficher)
                [user.name,user.lastName]
    )
    return result.rows[0];
}

export async function update(id: number,student: CreateStudent ): Promise<Student | null>{
    const result= await pool.query("UPDATE students SET name= $1, email= $2 where id= $3 RETURNING *",[student.name, student.lastName,id]);
    return result.rows.length===0?null:result.rows[0];
}

export async function remove(id: number): Promise<Student | null>{
    const result = await pool.query("DELETE FROM students WHERE id = $1 RETURNING *",[id]);
    return result.rows.length===0? null : result.rows[0];
}