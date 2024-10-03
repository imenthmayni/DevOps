import { Project } from "./project";

export interface Budget {
    budget_id: number;
    budget_amount: number;
    budgetReel: number;
    budget_variance: number;
    dependencies: string;
    project: Project;
}
