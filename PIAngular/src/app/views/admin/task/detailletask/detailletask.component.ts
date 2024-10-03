import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-detailletask',
  templateUrl: './detailletask.component.html',
  styleUrls: ['./detailletask.component.css']
})
export class DetailletaskComponent implements OnInit {
  taskId?: number;
  taskBudget: number | undefined;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtenir l'ID de la tâche à partir des paramètres de l'URL
    this.route.params.subscribe(params => {
      this.taskId = +params['id']; // Convertir en nombre
      this.calculateTaskBudget(this.taskId);
    });
  }
  calculateTaskBudget(taskId: number): void {
    this.taskService.calculateTaskBudget(taskId).subscribe(
      budget => {
        console.log('Task budget:', budget);
        this.taskBudget = budget; // Mettre à jour la propriété taskBudget
      },
      error => {
        console.error('Error calculating task budget:', error);
        // Traitez l'erreur
      }
    );
  }
}
