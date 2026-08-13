import {Student,type CreateStundent} from "../Model/Student";
import {findAll,
        findById,
        create,
        update,
        remove
} from "../Repository/studentRepository";

export class StudentService{
    async getAllStudents(): Promise<Student>{
        return await findAll();
    }
}
