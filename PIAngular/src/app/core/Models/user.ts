import { Leav } from "./leav";
import { Recruitment } from "./recruitment";
import { Role } from "./role";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone: number;
    roles: Role[]; // Assuming Role is another Angular class representing roles
    connected: boolean;
    deleted: boolean;
    recruitments: Recruitment[]; // Assuming Recruitment is another Angular class
    leaves: Leav[]; // Assuming Leav is another Angular class
    notifications: Notification[]; // Assuming Notification is another Angular class
  }
  