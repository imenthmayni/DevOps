import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Budget } from 'src/app/Model/budget';
import { Project } from 'src/app/Model/project';
import { BudgetService } from 'src/app/Services/budget.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent {
  newBudget: Budget = {
    budget_id: 0,
    budget_amount: 0,
    budgetReel: 0,
    budget_variance: 0,
    dependencies: '',
    project: {} as Project // Assurez-vous d'initialiser correctement la propriété project
  };
  projectId: number | null = null; // Variable pour stocker l'ID du projet sélectionné
  formSubmitted = false;
  budgetAssigned: boolean = false;

  constructor(
    private budgetService: BudgetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id']; // Convertir l'ID du projet en nombre
      console.log('Project ID from URL:', this.projectId); // Vérifiez l'ID du projet
      if (this.projectId) {
        this.newBudget.project.projectId = this.projectId;
      }
    });
  }

  addBudget(budgetForm: NgForm) {
    this.formSubmitted = true;

    if (budgetForm.invalid) {
      console.log('Le formulaire est invalide');
      return;
    }

    // Assurez-vous qu'un projet est sélectionné avant d'ajouter le budget
    if (!this.projectId) {
      console.log('Veuillez sélectionner un projet.');
      return;
    }

    // Affectez l'ID du projet au budget
    this.newBudget.project.projectId = this.projectId;

    // Ajoutez le budget avec l'ID du projet affecté
    this.budgetService.addBudget(this.newBudget).subscribe(
      (response) => {
        console.log('Budget ajouté avec succès :', response);
        this.budgetAssigned = true; // Déplacez cette ligne ici
        this.resetForm(budgetForm);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du budget :', error);
      }
    );
  }


  resetForm(form: NgForm) {
    form.resetForm();

    this.newBudget = {
      budget_id: 0,
      budget_amount: 0,
      budgetReel: 0,
      budget_variance: 0,
      dependencies: '',
      project: {} as Project // Réinitialisez correctement la propriété project ici
    };
    this.projectId = null; // Réinitialisez l'ID du projet sélectionné
    this.formSubmitted = false;
  }
}
