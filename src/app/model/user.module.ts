import { Role } from "./role";

export class User {
    id!: number;
    firstName!: string;
    lastName: string | any;
    email: string | any;
    password: string | any;
    role: Role | any;
}

export class Data {
    id: number| any;
    firstName: string| any;
    lastName: string | any;
    email: string | any;
    role: number | any;
    phoneNumber: string | any;
}

export class dataTable{
    data !: Data
}
