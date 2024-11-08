import { skill } from "./skill.interface";

export interface workExp {
    id?: number;
    company?: string;
    title?: string;
    workedTime?: string;
    Dscription?: string;
    skills?: skill[];
}