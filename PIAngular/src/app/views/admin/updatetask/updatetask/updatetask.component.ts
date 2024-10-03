import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskStatus } from 'src/app/Model/task';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styleUrls: ['./updatetask.component.css']
})
export class UpdatetaskComponent {
  updateSuccess: boolean = false;

  updatedTask: Task = {
    task_id: 0,
    task_name: '',
    task_startdate: new Date(),
    task_enddate: new Date(),
    task_description: '',
    taskStatus: TaskStatus.NOT_STARTED
  };
  formSubmitted = false;
  successMessage: string = ''; // Message de succès
  errorMessage: string = ''; // Message d'erreur

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de la tâche à partir des paramètres de l'URL
    this.route.params.subscribe(params => {
      const taskId = params['id'];
      // Utiliser l'ID de la tâche pour récupérer les détails de la tâche depuis le service ou une source de données
      // Ici, nous supposons que vous avez une méthode dans le service pour récupérer les détails de la tâche par ID
      // Vous devrez adapter cela en fonction de votre implémentation réelle
      this.taskService.getTask(taskId).subscribe(
        (task: Task) => {
          this.updatedTask = task;
        },
        (error) => {
          console.error('Error retrieving task details:', error);
        }
      );
    });
  }

  updateTask(taskForm: NgForm) {
    this.formSubmitted = true;
    if (taskForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.taskService.updateTask(this.updatedTask).subscribe(
      (response) => {
        console.log('Task updated successfully:', response);
        this.successMessage = 'Tâche mise à jour avec succès.';
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.resetForm(taskForm);
        setTimeout(() => {
          this.router.navigate(['/admin/tasks']);
        }, 10000); // Rediriger vers la liste des tâches après 10 secondes
      },
      (error) => {
        console.error('Error updating task:', error);
        this.errorMessage = 'Une erreur s\'est produite lors de la mise à jour de la tâche.';
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.updatedTask = {
      task_id: 0,
      task_name: '',
      task_startdate: new Date(),
      task_enddate: new Date(),
      task_description: '',
      taskStatus: TaskStatus.NOT_STARTED
    };
    this.formSubmitted = false;
  }
}