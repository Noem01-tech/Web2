import  pool  from "../db/database";
import { UserDto} from "../Model/User";

export const creatingUser=async(user:UserDto): Promise<UserDto>=>{
    const result= await pool.query("INSERT INTO users (email,password,role) VALUES ($1, $2,$3) RETURNING *", // returning permet de renvoyer la ligne qui vient d'etre creee + (choisir les colonnes a afficher)
                [user.email,user.password,user.role]
    )
    return result.rows[0];
}