export interface RecruitmentRequest {
    requestId: number;
    firstName: string;
    lastName: string;
    postTitle: string;
    jobLocation: string;
    numberOfOpenings: number;
    description: string;
    requirements: string;
    hiringManager: string;
    recruiter: string;
    cv: Uint8Array | number[] | null; // Property for storing CV

    
  }
  