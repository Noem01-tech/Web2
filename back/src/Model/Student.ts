export interface CreateStudentDTO{
    email: string;
    name: string;
    phone?:string;
    dateOfBirth:Date;
}

export interface Student{
    id:number;
    email:string;
    name:string;
    phone?:string;
    dateOfBirth:Date;
}

export interface UpdateStudentDTO{
    email?:string;
    phone?:string;
}