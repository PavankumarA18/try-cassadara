import { Question } from './question';
import { User } from './user';

export class Test {
    testId: number;
    testName: string;
    testDescription: string;
    testType: string;
    testInstructions: string[];
    eduSystem: string;
    grade: string;
    subject: string;
    chapters:string[];
    startDateTime: number;
    endDateTime: number;
    creator: string;
    allStudents: boolean;
    students: User[];
    randomQuestions: boolean;
    questions: Question[];
    canList: boolean;


};