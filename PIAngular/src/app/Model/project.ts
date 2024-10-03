import { User } from "../models/user";

export class Project {
    "projectId": number;
    "project_name": string;
    "project_startdate": Date;
    "projectEnddate": Date;
    "project_description": string;
    "project_manager": string;
    "projectStatus": ProjectStatus;
    //"team": User[]; // Ajoutez une propriété 'team' qui contient un tableau d'utilisateurs

}
export enum ProjectStatus {
    STATUS_1 = 'QUEUED',
    STATUS_2 = 'COMPLETED',
    STATUS_3 = 'CURRENT',
    STATUS_4 = 'LATE',
    STATUS_5 = 'CANCELLED'

}