import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Budget } from '../Model/budget';
import { Observable } from 'rxjs';
import { Project } from '../Model/project';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8089/Budget';

  constructor(private http: HttpClient) { }


  addBudget(newBudget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.baseUrl}/addBudget`, newBudget);
  }

  updateBudget(updatedBudget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/updateBudget`, updatedBudget);
  }

  getBudget(budgetId: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.baseUrl}/getBudget/${budgetId}`);
  }

  getAll(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.baseUrl}/retrieve-all-budget`);
  }

  assignBudgetToProject(budgetId: number, projectId: number): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/assignBudgetToProject/${budgetId}/${projectId}`, {});
  }
  calculateProjectBudget(projectId: number): Observable<number> {
    const url = `${this.baseUrl}/${projectId}/budget`;
    return this.http.get<number>(url);
  }


  getBudgetVarianceHistogram(): Observable<Map<string, number>> {
    const url = `${this.baseUrl}/variance-histogram`;
    return this.http.get<Map<string, number>>(url);
  }
  getBudgetsWithout(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/withoutBudgets`);
  }

  getBudgetByAmountGreaterThan(amount: number): Observable<Budget[]> {
    const url = `${this.baseUrl}/amountGreaterThan/${amount}`;
    return this.http.get<Budget[]>(url);
  }
  getAssociatedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/associated-projects`);
  }
  deleteBudget(budget_id: number): Observable<void> {
    const url = `${this.baseUrl}/remove-budget/${budget_id}`;
    return this.http.delete<void>(url);
  }
}
