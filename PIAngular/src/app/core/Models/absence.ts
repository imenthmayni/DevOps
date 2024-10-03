export interface Absence {
  idAbsence: number;
  dateAbsence: Date;
  startTime: Date;
  endTime: Date;
  absenceType: AbsenceType;
  totalAbsenceDays: number;
  absenceDaysLeft: number;
  halfDay: boolean;
  absenceCategory: string;
  attachmentUrl: string
}

export enum AbsenceType {
  SICKNESS = 'SICKNESS',
  FAMILY_EMERGENCY = 'FAMILY_EMERGENCY',
  OTHER = 'OTHER'
}
