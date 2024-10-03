import { Recruitment } from "./recruitment";
import { Role } from "./role";

export interface Leav {
    leaveId: number;
    leaveStartdate: string|null;
    leaveEnddate: string|null;
    leaveType: LeaveType;
    leaveStatus: LeaveStatus;
    reason: string;
    leaveApproved: boolean;
    requestDate: string;
    leaveApproverName: string;
    comments: string;
    leaveDaysLeft: number;
    user: User; // Add the 'user' property of type 'User'

  }
  export enum LeaveType {
    VACATION_LEAVE='VACATION_LEAVE',
    SICK_LEAVE='SICK_LEAVE',
    FMLA='FMLA',
    UNPAID_LEAVE='UNPAID_LEAVE'
  }
  
  export enum LeaveStatus {
    APPROVED='APPROVED',
    PENDING='PENDING',
    REFUSED='REFUSED'
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