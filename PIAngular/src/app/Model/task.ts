import { User } from "./user";

export interface Task {
    "task_id": number;
    "task_name": string;
    "task_startdate": Date;
    "task_enddate": Date;
    "task_description": string;
    "taskStatus": TaskStatus;
   
  }
  
  export enum TaskStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    ON_HOLD = 'ON_HOLD',
    CANCELLED = 'CANCELLED'
  }