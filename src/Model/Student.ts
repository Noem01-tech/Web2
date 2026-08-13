export interface CreateStudent{
    name: String;
    lastName: String;
}

export class Student{
    constructor(
        public id: number,
        public name: string,
        public lastName: string
    ){}
}