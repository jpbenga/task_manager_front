import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/Task';
import { TasksService } from '../services/tasks.service';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TasksService, private dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(
      tasks => this.tasks = tasks,
      error => console.error('Erreur lors de la récupération des tâches', error)
    );
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      (error) => {
        console.error('Error deleting task', error);
      }
    );
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {task: {}, isNew: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe(
          (newTask) => {
            this.tasks.push(newTask);
          },
          (error) => {
            console.error('Error creating task', error);
          }
        );
      }
    });
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {task: {...task}, isNew: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(task.id, result).subscribe(
          (updatedTask) => {
            const index = this.tasks.findIndex(t => t.id === updatedTask.id);
            this.tasks[index] = updatedTask;
          },
          (error) => {
            console.error('Error updating task', error);
          }
        );
      }
    });
  }
}
