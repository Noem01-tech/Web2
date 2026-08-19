import {Student, CreateStudentDTO,UpdateStudentDTO} from "../Model/Student";
import { User } from "../Model/User";
import { UserDto } from "../Model/User";
import {findAll,
        findUserByEmail,
        findById,
        create,
        update,
        remove
} from "../Repository/studentRepository";
import { creatingUser } from "../Repository/userRepository";

export const getStudents=async(): Promise<Student[]>=>{
    return findAll();
}

export const getUserByEmail=async(email:string):Promise<User | null>=>{
    return findUserByEmail(email);
}

export const getStudentById=async(id:number):Promise<Student | null>=>{
    return findById(id);
}

export const createStudent=async(student: CreateStudentDTO): Promise<Student>=>{
    return create(student);
}

export const createUser=async(user: UserDto):Promise<UserDto>=>{
    return creatingUser(user);
}

export const updateStudent=async(id:number,student:UpdateStudentDTO):Promise<Student| null>=>{
    return update(id,student);
}

export const deleteStudent=async(id:number):Promise<Student|null>=>{
    return remove(id);
}