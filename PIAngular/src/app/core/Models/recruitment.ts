import { Leav } from "./leav";
import { Role } from "./role";

export interface Recruitment {
    offerId: number;
    postTitle: string;
    description: string;
    requirements: string;
    hiringManager: string;
    requestDate: Date;
    recruiter: string;
    jobLocation: string;
    salaryRangeMin: number;
    salaryRangeMax: number;
    numberOfOpenings: number;
    urgent: boolean;
    ExperienceRequired: string;
    recruitmentDate: Date;
    recruitmentStatus: RecruitmentStatus;
    user?: User | null; // Make user property optional and nullable
    firstName: string; // Add firstName property
    lastName: string; // Add lastName property

  }
  
  export enum RecruitmentStatus {

    CLOSED = 'CLOSED',
    OPEN = 'OPEN'
  }
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone: number;
    roles: Role[];
    connected: boolean;
    deleted: boolean;
    recruitments: Recruitment[];
    leaves: Leav[];
    notifications: Notification[];
}
  