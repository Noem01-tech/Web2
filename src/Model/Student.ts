export interface CreateStudent{
    name: string;
    lastName: string;
}

export class Student{
    constructor(
        public id: number,
        public name: string,
        public lastName: string
    ){}
}