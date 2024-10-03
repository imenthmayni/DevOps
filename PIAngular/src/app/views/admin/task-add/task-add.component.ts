import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task, TaskStatus } from 'src/app/Model/task';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent {
  newTask: Task = {
    task_id: 0,
    task_name: '',
    task_startdate: new Date(),
    task_enddate: new Date(),
    task_description: '',
    taskStatus: TaskStatus.NOT_STARTED
  };
  formSubmitted = false;

  constructor(private taskService: TaskService) { }

  addTask(taskForm: NgForm) {
    this.formSubmitted = true;

    if (taskForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.taskService.addTask(this.newTask).subscribe(
      (response) => {
        console.log('Task added successfully:', response);
        this.resetForm(taskForm);
      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newTask = {
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
