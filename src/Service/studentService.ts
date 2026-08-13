import {Student, CreateStudent} from "../Model/Student";
import {findAll,
        findById,
        create,
        update,
        remove
} from "../Repository/studentRepository";

export async function getStudents(): Promise<Student[]>{
    return findAll();
}

export async function getStudentById(id:number):Promise<Student | null>{
    return findById(id);
}

export async function createStudent(student: CreateStudent): Promise<Student>{
    return create(student);
}

export async function updateStudent(id:number,student:CreateStudent):Promise<Student| null>{
    return update(id,student);
}

export async function deleteStudent(id:number):Promise<Student|null>{
    return remove(id);
}