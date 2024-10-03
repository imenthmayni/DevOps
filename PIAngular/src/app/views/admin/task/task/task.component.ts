import { Component, Input, OnInit } from '@angular/core';
import { Resources } from 'src/app/Model/resources';
import { Task } from 'src/app/Model/task';
import { User } from 'src/app/Model/user';
import { ProjectService } from 'src/app/Services/project.service';
import { ResourceService } from 'src/app/Services/resource.service';
import { TaskService } from 'src/app/Services/task.service';
import { UserService } from 'src/app/Services/userservice';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task?: Task;
  //selectedUserId?: number; 
  users: User[] = []; // Déclaration de la propriété users
  taskId!: number;
  projects: any[] = [];
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchQuery: string = '';
  selectedUserId: number[] = [];
  showSuccessAlert: boolean = false;
  resources: Resources[] = [];
  resourceId: number = 0; // Initialisez resourceId
  errorMessage: string | null = null;
  selectedResourceId: number = 0;  // Ajout de la propriété selectedResourceId
  selectedProjectIds: { [key: number]: number } = {};
  selectedUserIds: { [key: number]: number } = {};
  selectedResourceIds: { [key: number]: number } = {};
  dataLoaded: boolean = false;
  resourcesLoaded: boolean = false;
  statsLoaded: boolean = false;
  selectedProjectId: number = 0;
  constructor(private taskService: TaskService, private projectService: ProjectService, private resourceService: ResourceService, private userervice: UserService) { }
  ngOnInit(): void {
    this.loadTasks();
    this.loadProjects();
    this.loadUsers();
    this.loadResources();
  }
  loadTasks(): void {
    this.taskService.getAll().subscribe(
      data => {
        this.tasks = data;
        this.filteredTasks = [...data];
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        console.log('Task deleted successfully!');
        this.loadTasks();
      },
      error => {
        console.error('Error deleting task:', error);
        if (error.error && error.error.message) {
          alert('Error deleting task: ' + error.error.message);
        } else {
          alert('An error occurred while deleting the task.');
        }
      }
    );
  }
  loadResources(): void {
    this.resourceService.getAllResources().subscribe(
      data => {
        this.resources = data;
      },
      error => {
        console.error('Error loading resources:', error);
      }
    );
  }
  checkDataAndRender(): void {
    if (this.resourcesLoaded && this.statsLoaded) {
      this.dataLoaded = true;
    }
  }
  loadUsers(): void {
    this.userervice.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe(
      data => {
        this.projects = data;

      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }
  assignTaskToProject(taskId: number): void {
    const projectId = this.selectedProjectIds[taskId];
    if (projectId) {
      this.taskService.assignTaskToProject(projectId, taskId).subscribe(
        (task: Task) => {
          console.log('Task assigned to project:', task);
          this.showSuccessAlert = true; // Afficher une alerte de succès
          this.loadTasks(); // Recharger la liste des tâches
        },
        (error) => {
          console.error('Error assigning task to project:', error);
          this.errorMessage = 'Erreur lors de l\'affectation du projet à la tâche: ' + error.message;
        }
      );
    } else {
      console.log('Please select a project.');
      this.errorMessage = 'Veuillez sélectionner un projet.';
    }
  }

  // // assignTaskToUsers(taskId: number): void {
  // //   if (!Array.isArray(this.selectedUserId)) {
  // //     console.error('selectedUserId is not an array:', this.selectedUserId);
  // //     return;
  // //   }

  //   const userIds = Array.isArray(this.selectedUserId) ? this.selectedUserId : [this.selectedUserId];

  //   if (userIds.length === 0) {
  //     console.log('Please select at least one user.');
  //     return;
  //   }

  //   userIds.forEach(userId => {
  //     this.taskService.assignTaskToUser(userId, taskId).subscribe(
  //       (task) => {
  //         console.log('Task assigned to user:', task);
  //       },
  //       (error: any) => {
  //         console.error('Error assigning task to user:', error);
  //       }
  //     );
  //   });
  // }



  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task =>
      task.task_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  assignTaskToUsers(taskId: number): void {
    const userId = this.selectedUserIds[taskId];
    if (userId) {
      this.taskService.assignTaskToUser(userId, taskId).subscribe(
        (task) => {
          console.log('Task assigned to user:', task);
        },
        (error: any) => {
          console.error('Error assigning task to user:', error);
        }
      );
    } else {
      console.log('Please select a user.');
    }
  }

  // Dans task.component.ts
  assignResourceToTask(taskId: number): void {
    const resourceId = this.selectedResourceIds[taskId];
    if (resourceId) {
      this.resourceService.assignResourceToTask(resourceId, taskId).subscribe(
        data => {
          this.errorMessage = null;
          console.log('Ressource assignée à la tâche avec succès:', data);
        },
        error => {
          this.errorMessage = 'Erreur lors de l\'affectation de la ressource: ' + error.message;
        }
      );
    } else {
      console.log('Veuillez sélectionner une ressource.');
    }
  }

}
