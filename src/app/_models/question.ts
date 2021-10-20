import { DatatableRowDetailTemplateDirective } from '@swimlane/ngx-datatable';

export class Question {
    email: string;
    questionId: number;
    questionType: string;
    edusystem: string;
    grade: string;
    subject: string;
    chapter: string;
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
    correct: string;
    mark: number;
    created: Date;
    hasImg:boolean;
    image: string;
}