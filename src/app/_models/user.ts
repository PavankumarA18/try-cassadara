import {UserSetting} from './UserSetting'

export class User {
    userId: number;
    displayName: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    teacher:string[];
    modTeacher: string;
    userSettings:UserSetting[];
    token?: string;
    firstLogin:boolean;
}