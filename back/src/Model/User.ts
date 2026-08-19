export type Role='ADMIN' | 'STUDENT';

export interface User{
    id:number;
    email:string;
    password:string;
    role: Role;
}


//omit sert a la creation d'un nouveau type (AuthUser) en supprimant des proprietes d'un type existant(User) 
export type AuthedUser=Omit<User,'password'>; 

//DTO utiliser pour authentifier un user   :)
export interface NeedToAuthUser{
    email: string;
    password: string
}

export interface UserDto{
    email:string;
    password:string;
    role: Role;
}