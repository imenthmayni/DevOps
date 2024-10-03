import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from 'src/app/Model/budget';
import { Project } from 'src/app/Model/project';
import { BudgetService } from 'src/app/Services/budget.service';
import { ProjectService } from 'src/app/Services/project.service';
import { ProfileService } from 'src/app/authentication/service/profile.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-budgett',
  templateUrl: './budgett.component.html',
  styleUrls: ['./budgett.component.css']
})
export class BudgettComponent {
  budgets: Budget[] = [];
  projectsWithoutBudgets!: Project[];
  budgetsGreaterThanAmount!: Budget[];
  thresholdAmount: number = 0; // Définissez le seuil de montant ici
  associatedProjects!: Project[];
  projectTeams: { [projectId: number]: Observable<User[]> } = {};
  projectTeam: any[] = [];

  user: any;


  constructor(private budgetService: BudgetService,private projectService: ProjectService,private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadBudgetsGreaterThanAmount(this.thresholdAmount);
    this.getAssociatedProjects();
    //this.getProjectTeam();
    this. loadBudgetsWithout();
    this.budgetService.getAll().subscribe(
      data => this.budgets = data,
      error => console.error('Error loading budgets:', error)
    );
    this.profileService.getUserProfile().subscribe(
      data => {
        this.user = data;
        console.log("This is the response", data);
      }
    );
  }

  loadBudgetsWithout(): void {
    this.budgetService.getBudgetsWithout().subscribe(
      (data: Project[]) => {
        this.projectsWithoutBudgets = data;
      },
      (error) => {
        console.log('Error fetching budgets without: ', error);
      }
    );
  }

  loadBudgetsGreaterThanAmount(amount: number): void {
    this.budgetService.getBudgetByAmountGreaterThan(amount).subscribe(
      budgets => {
        this.budgetsGreaterThanAmount = budgets;
      },
      error => {
        console.error('Error loading budgets greater than amount:', error);
      }
    );
  }

  getAssociatedProjects(): void {
    console.log('Fetching associated projects...');
    this.budgetService.getAssociatedProjects()
      .subscribe(
        projects => {
          this.associatedProjects = projects;
          console.log('Associated projects retrieved successfully:');
          console.log(projects); // Affiche les projets dans les logs
          // Pour chaque projet, récupérez l'équipe
        projects.forEach(project => {
          this.getProjectTeam(project.projectId);
        });
      },
        error => {
          console.error('Error fetching associated projects:', error);
        }
      );
  }
  getProjectTeam(projectId: number): void {
    console.log(`Fetching team for project ${projectId}...`);
  
    this.projectService.getProjectTeam(projectId).subscribe(
      (data: any[]) => {
        this.projectTeam = data; // Affectez les données récupérées à la variable projectTeam
        console.log(`Team for project ${projectId} retrieved successfully:`);
        console.log(this.projectTeams); // Affichez les données récupérées dans la console (à des fins de débogage)
      },
      error => {
        console.error(`Error fetching team for project ${projectId}:`, error); // Affichez les erreurs éventuelles dans la console
      }
    );
  }
  
  
  onDeleteBudget(budgetId: number) {
    this.budgetService.deleteBudget(budgetId).subscribe(
      () => {
        console.log(`Budget avec l'ID ${budgetId} supprimé avec succès.`);
        // Rafraîchir la liste des budgets une fois la suppression terminée avec succès
        this.refreshBudgets();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression du budget : ', error);
        // Gérez l'erreur ici, affichez un message à l'utilisateur ou effectuez une action appropriée.
      }
    );
  }
  
  refreshBudgets() {
    this.budgetService.getAll().subscribe(
      data => this.budgets = data,
      error => console.error('Error loading budgets:', error)
    );
}
}
